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
import DisplayResultProposals from "@/components/display-results-proposals";

import {
  contractCallPidSchema,
  contractCallMemberIdSchema,
  type contractCallPidSchemaType,
  type contractCallMemberIdSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

export default function ContractCallPage() {
  const [pid, setPid] = useState<number>(0);

  const pidForm = useForm<contractCallPidSchemaType>({
    resolver: zodResolver(contractCallPidSchema),
    defaultValues: { pid },
  });

  // Note: Only works with MultiCall contract (aggregator3)

  const {
    refetch: proposalRefetch,
    data: proposalData,
    isPending: isProposalPending,
  } = useReadContracts(
    {
    contracts: [
      {
        ...TextDAOFacade,
        functionName: "getProposalHeaders",
        args: [BigInt(pid)],
      },
      {
        ...TextDAOFacade,
        functionName: "getNextProposalId",
      },
    ],
  });


  const [proposalHeaders, nextProposalId] = proposalData || [];

  function getProposalData(data: contractCallPidSchemaType) {
    console.log("data.pid: %o", data.pid);
    setPid(data.pid);
    proposalRefetch();
  }


  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Proposals</h1>
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
            登録済みのIDは0から
            <DisplayResultProposals {...nextProposalId} />
            です．
            <div className="mt-3">
              <strong>Proposal detail:</strong>
              <DisplayResultProposals {...proposalHeaders} />
            </div>
          </div>
        </CardFooter>
      </Card>

    </div>
  );
}
