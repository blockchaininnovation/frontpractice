import { CID } from "multiformats";
import { base32 } from "multiformats/bases/base32";
import { create } from "multiformats/hashes/digest";

import { toHex, fromHex, Hex } from "viem";

import { type proposalSchemaType } from "./schema/schema";

export function getPinataFormat(data: proposalSchemaType) {
  return {
    pinataOptions: { cidVersion: 1 },
    pinataMetadata: { name: data.id.toString() },
    pinataContent: { title: data.title, description: data.description },
  };
}

export function getDigest(cidV1: string) {
  const cid = CID.parse(cidV1, base32);
  const hexDigest = toHex(cid.multihash.digest, { size: 32 });

  return hexDigest;
}

export function getCID(hexDigest: Hex) {
  const byteDigest = fromHex(hexDigest, "bytes");
  const multihash = create(0x12, byteDigest); // SHA-256 (code 0x12)

  const cid = CID.create(1, 0x55, multihash); // dag-pb (code 0x55)

  return cid.toString(base32);
}
