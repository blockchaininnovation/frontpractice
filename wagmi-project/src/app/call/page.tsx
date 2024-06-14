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
import DisplayResult from "@/components/display-results";

import {
  contractCallPidSchema,
  contractCallMemberIdSchema,
  type contractCallPidSchemaType,
  type contractCallMemberIdSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

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
    error: proposalError,
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
    error: memberError,
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
    </div>
  );
}
