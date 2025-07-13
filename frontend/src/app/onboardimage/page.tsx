"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWriteContract, useWatchContractEvent, type BaseError } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TextDAOFacade } from "@/wagmi";
import { generateCIDFromImageUrl } from "@/lib/helper";
import {
  onboardImageSchema,
  type onboardImageSchemaType,
} from "@/lib/schema/schema";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function OnboardImagePage() {
  const { toast } = useToast();

  const [uploadResult, setUploadResult] = useState<{ url?: string; signature?: string; error?: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const { isPending, writeContractAsync } = useWriteContract();

  const form = useForm<onboardImageSchemaType>({
    resolver: zodResolver(onboardImageSchema),
  });

  // Contract Event Listener
  useWatchContractEvent({
    ...TextDAOFacade,
    eventName: "MemberIconRegistered",
    listener(log) {
      const { memberId, account, ipfsUrl } = log[0].args;
      toast({
        title: "登録完了！",
        description: `ID: ${memberId} / IPFS: ${ipfsUrl}`,
      });
    },
  });

  // Upload Handler
  async function handleUploadImage(data: onboardImageSchemaType) {
    const imageFile = data.image;
    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(`${apiBaseUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        setUploadResult({ error: result.error || "アップロードに失敗しました。" });
        toast({ variant: "destructive", title: "Upload Error", description: result.error });
        return;
      }

      setUploadResult({ url: result.url, signature: result.signature });
      toast({ title: "アップロード完了", description: "画像と署名を取得しました。" });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ variant: "destructive", title: "通信エラー", description: "サーバーとの通信に失敗しました。" });
    } finally {
      setUploading(false);
    }
  }

  async function handleRegisterIcon() {
    if (!uploadResult?.url || !uploadResult?.signature) {
      toast({ variant: "destructive", title: "エラー", description: "先に画像をアップロードしてください。" });
      return;
    }

    try {
      const imageUrl = `${apiBaseUrl}${uploadResult.url}`;
      const pseudoCID = await generateCIDFromImageUrl(imageUrl) + " (dummy)";
      const ipfsUrl = `https://ipfs.io/ipfs/${pseudoCID}`;

      await writeContractAsync({
        ...TextDAOFacade,
        functionName: "onboardImage",
        args: [ipfsUrl, uploadResult.signature],
      });

      toast({ title: "トランザクション送信完了", description: "ブロックチェーンへ反映されます。" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.name,
        description: (error as BaseError).shortMessage || "登録に失敗しました",
      });
    }
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">アイコン登録ページ</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUploadImage)} className="space-y-6">
          <div>
            <Label>画像を選択</Label>
            <Input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              form.setValue("image", file as File);
            }} />
          </div>

          <Button type="submit" disabled={uploading}>
            {uploading ? "アップロード中..." : "画像をサーバーにアップロードして署名を取得"}
          </Button>
        </form>
      </Form>

      {uploadResult?.url && (
        <div className="mt-6 space-y-3">
          <img src={`${apiBaseUrl}${uploadResult.url}`} alt="uploaded" className="w-48 border rounded" />
          <Label>署名:</Label>
          <p className="font-mono text-sm break-all bg-gray-100 p-2 rounded">
            {uploadResult.signature}
          </p>
          <Button onClick={handleRegisterIcon}>ブロックチェーンに登録</Button>
        </div>
      )}
    </div>
  );
}
