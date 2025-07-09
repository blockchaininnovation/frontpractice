"use client";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TextDAOFacade } from "@/wagmi";
import { useWriteContract } from "wagmi";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function ContractCallPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ url?: string; signature?: string; error?: string } | null>(null);


  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await axios.post(`${apiBaseUrl}/api/upload`, formData);
      const data = res.data;

      if (res.status !== 200 || data.error) {
        setUploadResult({ error: data.error || "アップロードに失敗しました。" });
      } else {
        setUploadResult({
          url: data.url,
          signature: data.signature,
        });
      }
    } catch (error) {
      console.error("アップロードエラー:", error);
      setUploadResult({ error: "サーバーとの通信に失敗しました。" });
    } finally {
      setUploading(false);
    }
  };

  const { writeContractAsync } = useWriteContract();

  const handleRegisterIcon = async () => {
    if (!uploadResult?.url || !uploadResult?.signature) {
      alert("画像または署名が見つかりません。先にアップロードを完了してください。");
      return;
    }

    try {
      const ipfsUrl = `${apiBaseUrl}${uploadResult.url}`;
      const signatureBytes = uploadResult.signature;

      console.log("送信するIPFS URL:", ipfsUrl);
      console.log("送信する署名:", signatureBytes);

      const tx = await writeContractAsync({
        ...TextDAOFacade,
        functionName: "onboardImage",
        args: [ipfsUrl, signatureBytes],
      });

      console.log("Tx sent:", tx);
      alert("アイコン登録トランザクションが送信されました。");
    } catch (error: any) {
      console.error("コントラクト呼び出しエラー:", error);
      alert(`登録に失敗しました: ${error.message || "不明なエラー"}`);
    }
  };

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Contract Call Page</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">アイコン登録</CardTitle>
          <CardDescription>自身のアイコンを登録します</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 画像アップロードフォーム */}
          <div className="space-y-2">
            <Label htmlFor="upload">画像アップロード</Label>
            <Input
              id="upload"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>

            {uploadResult && (
              <div className="mt-4 space-y-2">
                {uploadResult.error ? (
                  <p className="text-red-500">{uploadResult.error}</p>
                ) : (
                  <>
                    <Label>アップロードされた画像:</Label>
                    <img
                      src={`${apiBaseUrl}${uploadResult.url}`}
                      alt="Uploaded"
                      className="w-48 border rounded"
                    />
                    <Label>署名:</Label>
                    <p className="break-all font-mono text-sm bg-gray-100 p-2 rounded text-green-700">
                      {uploadResult.signature}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 実行ボタン（アップロード成功時のみ有効） */}
          <div className="pt-4">
            <Button onClick={handleRegisterIcon} 
              disabled={!(uploadResult?.url && uploadResult?.signature)}>
              画像と署名を使って登録する
            </Button>
          </div>
        </CardContent>


        <CardFooter>
          <span className="text-sm text-muted-foreground">
            実験用のAPIエンドポイントを叩いて画像と署名を取得します。
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
