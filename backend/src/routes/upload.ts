
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import { log } from 'console';
import crypto from 'crypto';
import { ec as EC } from 'elliptic';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';

const ec = new EC('secp256k1');

const router = express.Router();


export function loadPrivateKeyFromEnv(): EC.KeyPair {
  const hexWithPrefix = process.env.PRIVATE_KEY_HEX;

  if (!hexWithPrefix || !hexWithPrefix.startsWith('0x')) {
    throw new Error('PRIVATE_KEY_HEX must start with "0x": ' + hexWithPrefix);
  }

  const hex = hexWithPrefix.slice(2);
  if (hex.length !== 64) {
    throw new Error('PRIVATE_KEY_HEX must be 32 bytes (64 hex chars): ' + hexWithPrefix);
  }

  return ec.keyFromPrivate(hex, 'hex');
}

const upload = multer({ storage: multer.memoryStorage() });

const knownImagesDir = path.join(__dirname, 'known');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// 画像をPNGに変換
const toPNGBuffer = async (buffer: Buffer) =>
  await sharp(buffer).resize(1024, 1024).png().toBuffer();

// 類似度計算（簡易）
const isSimilarToKnownImages = async (buffer: Buffer) => {
  const uploaded = PNG.sync.read(await toPNGBuffer(buffer));

  const files = fs.readdirSync(knownImagesDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const known = PNG.sync.read(fs.readFileSync(path.join(knownImagesDir, file)));
    const { width, height } = uploaded;
    const diff = new PNG({ width, height });
    const mismatch = pixelmatch(uploaded.data, known.data, diff.data, width, height);
    const ratio = mismatch / (width * height);
    log(`Comparing with ${file}: mismatch ratio = ${ratio}`);

    if (ratio < 0.1) return true; // 類似度高いと判断
  }

  return false;
};

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const isSimilar = await isSimilarToKnownImages(req.file.buffer);

    if (isSimilar) {
      return res.status(400).json({ error: 'Image is too similar to known samples' });
    }

    const keyPair = loadPrivateKeyFromEnv(); // <- あなたが定義した関数を呼ぶ

    // --- 署名処理 ---
    const hash = crypto.createHash('sha256').update(req.file.buffer).digest(); // ← ファイルバッファの SHA-256 を取る
    const signature = keyPair.sign(hash);
    const derSignature = signature.toDER('hex');

    const watermark = Buffer.from(
      `<svg width="400" height="50">
       <text x="0" y="20" font-size="16" fill="gray" opacity="0.5">Verified</text>
     </svg>`
    );

    const outputBuffer = await sharp(req.file.buffer)
      .composite([{ input: watermark, gravity: 'southeast' }])
      .png()
      .toBuffer();

    const fileName = `processed-${Date.now()}.png`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, outputBuffer);

    return res.json({
      url: `/uploads/${fileName}`,
      signature: `0x${derSignature}`
    });
  } catch (err) {
    console.error('Error during upload processing:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
