"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useReadContracts, type BaseError } from "wagmi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DisplayResult from "@/components/display-results";

import {
  contractCallPidSchema,
  contractCallMemberIdSchema,
  type contractCallPidSchemaType,
  type contractCallMemberIdSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function ContractCallPage() {
  const [pid, setPid] = useState<number>(0);
  const [memberID, setMemberID] = useState<number>(0);

  const pidForm = useForm<contractCallPidSchemaType>({
    resolver: zodResolver(contractCallPidSchema),
    defaultValues: { pid },
  });

  const memberIdForm = useForm<contractCallMemberIdSchemaType>({
    resolver: zodResolver(contractCallMemberIdSchema),
    defaultValues: { memberID: 0 },
  });

  // Note: Only works with MultiCall contract (aggregator3)

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

  const [proposalInfo, proposalHeaders, nextProposalId, proposalConfig] =
    proposalData || [];

  const [memberInfo, nextMemberId] = memberData || [];

  function getProposalData(data: contractCallPidSchemaType) {
    setPid(data.pid);
    proposalRefetch();
  }

  function getMemberData(data: contractCallMemberIdSchemaType) {
    setMemberID(data.memberID);
    memberRefetch();
  }

  const [pingResult, setPingResult] = useState<any>(null);
  const [echoMessage, setEchoMessage] = useState("");
  const [echoResult, setEchoResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePing = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/api/ping`);
      const data = await res.json();
      console.log("Ping response:", data);
      setPingResult({
        status: "success",
        result: data,
      });
    } catch (err) {
      setPingResult({
        status: "failure",
        error: "Failed to fetch ping",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEcho = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/api/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: echoMessage }),
      });
      const data = await res.json();
      setEchoResult({
        status: "success",
        result: data,
      });
    } catch (err) {
      setEchoResult({ status: "failure", error: "Failed to fetch echo" });
    } finally {
      setLoading(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadResult(data);
    } catch (err) {
      setUploadResult({ error: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Contract Call Page</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Get Proposal Data</CardTitle>
          <CardDescription>
            指定されたIDのProposalデータをコントラクトから読み取ります。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...pidForm}>
            <form
              onSubmit={pidForm.handleSubmit(getProposalData)}
              className="space-y-8"
            >
              <FormInput<contractCallPidSchemaType>
                _form={pidForm}
                name="pid"
                label="Proposal ID"
                placeholder="0"
                _type="number"
                description="データを取得したいProposalのIDを入力してください。"
              />
              <Button type="submit" disabled={isProposalPending}>
                {isProposalPending ? "Fetching..." : "Call"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="mt-5">
            <Label className="font-semibold text-lg">Results</Label>
            <div className="mt-3">
              <strong>Proposal Information</strong>
              <DisplayResult {...proposalInfo} />
              <strong>Headers</strong>
              <DisplayResult {...proposalHeaders} />
              <strong>Next Proposal ID</strong>
              <DisplayResult {...nextProposalId} />
              <strong>Proposal Config</strong>
              <DisplayResult {...proposalConfig} />
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Get Member Data</CardTitle>
          <CardDescription>
            指定されたIDのMemberデータをコントラクトから読み取ります。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...memberIdForm}>
            <form
              onSubmit={memberIdForm.handleSubmit(getMemberData)}
              className="space-y-8"
            >
              <FormInput<contractCallMemberIdSchemaType>
                _form={memberIdForm}
                name="memberID"
                label="Member ID"
                placeholder="0"
                _type="number"
                description="データを取得したいMemberのIDを入力してください。"
              />
              <Button type="submit" disabled={isMemberPending}>
                {isMemberPending ? "Fetching..." : "Call"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="mt-5">
            <Label className="font-semibold text-lg">Results</Label>
            <div className="mt-3">
              <strong>Member Information</strong>
              <DisplayResult {...memberInfo} />
              <strong>Next Member ID</strong>
              <DisplayResult {...nextMemberId} />
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Access API Test</CardTitle>
          <CardDescription>APIアクセス用テスト</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* GETボタン */}
          <div className="space-y-2">
            <Button onClick={handlePing} disabled={loading}>
              {loading ? "Fetching..." : "Call GET /api/ping"}
            </Button>
            <DisplayResult {...pingResult} />
          </div>

          {/* POSTボタンとフォーム */}
          <div className="space-y-2">
            <Label htmlFor="echo">Echo Message</Label>
            <Input
              id="echo"
              placeholder="Hello from React"
              value={echoMessage}
              onChange={(e) => setEchoMessage(e.target.value)}
            />
            <Button onClick={handleEcho} disabled={loading || echoMessage.trim() === ""}>
              {loading ? "Posting..." : "Call POST /api/echo"}
            </Button>
            <DisplayResult {...echoResult} />
          </div>
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
                <Label>Upload Result:</Label>
                {uploadResult.error ? (
                  <p className="text-red-500">{uploadResult.error}</p>
                ) : (
                  <img
                    src={`http://localhost:4000${uploadResult.url}`}
                    alt="Uploaded"
                    className="w-48 border rounded"
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <span className="text-sm text-muted-foreground">実験用のAPIエンドポイントを叩いて結果を表示します。</span>
        </CardFooter>
      </Card>
    </div>
  );
}
