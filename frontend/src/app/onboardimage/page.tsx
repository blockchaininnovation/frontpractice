"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReadContracts } from "wagmi";
import axios from "axios";

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

import {
  contractCallMemberIdSchema,
  contractCallPidSchema,
  type contractCallMemberIdSchemaType,
  type contractCallPidSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function ContractCallPage() {
  const [pid, setPid] = useState<number>(0);
  const [memberID, setMemberID] = useState<number>(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ url?: string; signature?: string; error?: string } | null>(null);

  const pidForm = useForm<contractCallPidSchemaType>({
    resolver: zodResolver(contractCallPidSchema),
    defaultValues: { pid },
  });

  const memberIdForm = useForm<contractCallMemberIdSchemaType>({
    resolver: zodResolver(contractCallMemberIdSchema),
    defaultValues: { memberID: 0 },
  });

  const {
    refetch: proposalRefetch,
    data: proposalData,
    isPending: isProposalPending,
  } = useReadContracts({
    contracts: [
      {
        ...TextDAOFacade,
        functionName: "getProposal",
        args: [BigInt(pid)],
      },
      {
        ...TextDAOFacade,
        functionName: "getProposalHeaders",
        args: [BigInt(pid)],
      },
      {
        ...TextDAOFacade,
        functionName: "getNextProposalId",
      },
      {
        ...TextDAOFacade,
        functionName: "getProposalsConfig",
      },
    ],
  });

  const {
    refetch: memberRefetch,
    data: memberData,
    isPending: isMemberPending,
  } = useReadContracts({
    contracts: [
      {
        ...TextDAOFacade,
        functionName: "getMember",
        args: [BigInt(memberID)],
      },
      {
        ...TextDAOFacade,
        functionName: "getNextMemberId",
      },
    ],
  });

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
