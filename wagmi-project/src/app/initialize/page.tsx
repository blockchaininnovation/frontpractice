"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";
import { getAddress, type Address } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import { abi } from "@/lib/abi/TextDAOFacade";
import {
  initializeSchema,
  type initializeSchemaType,
} from "@/lib/schema/schema";
import { account } from "@/lib/account";

const INPUTS = [
  {
    name: "initialMembers",
    label: "Initial Members",
    placeholder: "0xf39F...2266, 0x88F6F...27279c, ...",
    _type: "text",
    description:
      "初期メンバーのアドレスを入力してください。カンマ区切りで複数のアドレスを指定できます。",
  },
  {
    name: "pConfigSchema.expiryDuration",
    label: "Expiry Duration",
    placeholder: "123",
    _type: "number",
    description:
      "投票の有効期限を入力してください。単位はブロック秒です。( 1 == 1 second )",
  },
  {
    name: "pConfigSchema.tallyInterval",
    label: "Tally Interval",
    placeholder: "123",
    _type: "number",
    description:
      "投票の集計間隔を入力してください。単位はブロック秒です。( 1 == 1 second )",
  },
  {
    name: "pConfigSchema.repsNum",
    label: "Reps Num",
    placeholder: "123",
    _type: "number",
    description:
      "Reps はある proposal に fork, vote 可能な DAO 参加者のサブセットです。人数を指定してください。",
  },
  {
    name: "pConfigSchema.quorumScore",
    label: "Quorum Score",
    placeholder: "123",
    _type: "number",
    description:
      "Quorum Score は proposal の可決に必要な最低限の得票数です。スコアを指定してください。",
  },
];

const DEFAULT_VALUES = {
  initialMembers: "",
  pConfigSchema: {
    expiryDuration: 0,
    tallyInterval: 0,
    repsNum: 0,
    quorumScore: 0,
  },
};

export default function InitializePage() {
  const { toast } = useToast();
  const { isPending, writeContract } = useWriteContract({
    mutation: {
      retry: 3,
      onMutate: () =>
        toast({
          title: "Sending transaction...",
          description: "This may take a while. Please wait...",
        }),
    },
  });

  const form = useForm<initializeSchemaType>({
    resolver: zodResolver(initializeSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: initializeSchemaType) {
    const args = {
      initialMembers: data.initialMembers
        .replace(/\s/g, "")
        .split(",")
        .map((address) => getAddress(address)),
      pConfigSchema: {
        expiryDuration: BigInt(data.pConfigSchema.expiryDuration),
        tallyInterval: BigInt(data.pConfigSchema.tallyInterval),
        repsNum: BigInt(data.pConfigSchema.repsNum),
        quorumScore: BigInt(data.pConfigSchema.quorumScore),
      },
    };

    writeContract(
      {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
        abi,
        functionName: "initialize",
        args: [args.initialMembers, args.pConfigSchema],
        account,
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Transaction confirmed",
            description: `Transaction Hash: ${data}`,
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: error.name,
            description: (error as BaseError).shortMessage,
          });
        },
      }
    );
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Initialize Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {INPUTS.map((input) => (
            <FormInput<initializeSchemaType>
              key={input.name}
              _form={form}
              name={input.name as keyof initializeSchemaType}
              label={input.label}
              placeholder={input.placeholder}
              _type={input._type}
              description={input.description}
            />
          ))}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
