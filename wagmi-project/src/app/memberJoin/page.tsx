"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";
import { Address, getAddress, toHex } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import { abi } from "@/lib/abi/TextDAOFacade";
import {
  memberJoinSchema,
  type memberJoinSchemaType,
} from "@/lib/schema/schema";
import { account } from "@/lib/account";

const INPUTS = [
  {
    name: "pid",
    label: "Proposal ID",
    placeholder: "0",
    _type: "number",
    description: "投票に参加したい提案のIDを入力してください。",
  },
  {
    name: "candidates.id",
    label: "Member ID",
    placeholder: "123",
    _type: "number",
    description: "希望のメンバーIDを入力してください。",
  },
  {
    name: "candidates.addr",
    label: "Member Address",
    placeholder: "0xf39F...2266",
    _type: "text",
    description: "投票に使用する自身のウォレットアドレスを入力してください。",
  },
];

const DEFAULT_VALUES = {
  pid: 0,
  candidates: {
    id: 0,
    addr: "",
  },
};

export default function MemberJoinPage() {
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

  const form = useForm<memberJoinSchemaType>({
    resolver: zodResolver(memberJoinSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: memberJoinSchemaType) {
    const args = {
      id: BigInt(data.pid),
      _candidates: {
        id: BigInt(data.candidates.id),
        addr: getAddress(data.candidates.addr),
        metadataURI: toHex("0", { size: 32 }),
      },
    };

    writeContract(
      {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
        abi,
        functionName: "memberJoin",
        args: [args.id, [args._candidates]],
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
      <h1 className="text-xl font-bold py-10">Member Join Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {INPUTS.map((input) => (
            <FormInput<memberJoinSchemaType>
              key={input.name}
              _form={form}
              name={input.name as keyof memberJoinSchemaType}
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
