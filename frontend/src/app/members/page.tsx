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
import DisplayResultMembers from "@/components/display-results-members";

import {
  contractCallPidSchema,
  contractCallMemberIdSchema,
  type contractCallPidSchemaType,
  type contractCallMemberIdSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

export default function ContractCallPage() {
  const [memberID, setMemberID] = useState<number>(0);

  const memberIdForm = useForm<contractCallMemberIdSchemaType>({
    resolver: zodResolver(contractCallMemberIdSchema),
    defaultValues: { memberID },
  });

  // Note: Only works with MultiCall contract (aggregator3)

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
      }
    ],
  });


  const [memberInfo] = memberData || [];


  function getMemberData(data: contractCallMemberIdSchemaType) {
    setMemberID(data.memberID);
    memberRefetch();
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Contract Call Page</h1>

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
            <div className="mt-3">
              <strong>Member Information</strong>
              <DisplayResultMembers {...memberInfo} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
