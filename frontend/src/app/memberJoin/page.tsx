"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useWriteContract, useReadContract, type BaseError } from "wagmi";
import { getAddress } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import {
  memberJoinSchema,
  type memberJoinSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const INPUTS = [
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
    id: 0, // 実際には使わないが、スキーマと整合性のために保持
    addr: "",
  },
};

export default function MemberJoinPage() {
  const { toast } = useToast();

  const form = useForm<memberJoinSchemaType>({
    resolver: zodResolver(memberJoinSchema),
    defaultValues: DEFAULT_VALUES,
  });

  // 🔍 getNextMemberId 読み取り
  const {
    data: nextMemberId,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    ...TextDAOFacade,
    functionName: "getNextMemberId",
  });

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

  async function handleSubmit(data: memberJoinSchemaType) {
    const nextId = BigInt(nextMemberId ?? 0);

    const args = {
      _candidates: {
        id: nextId,
        addr: getAddress(data.candidates.addr),
        iconURI: "",
        iconVerifiedSignature: "",
      },
    };

    writeContract(
      {
        ...TextDAOFacade,
        functionName: "memberJoin",
        args: [[args._candidates]],
      },
      {
        onSuccess: (tx) => {
          toast({
            title: "Transaction confirmed",
            description: `Transaction Hash: ${tx}`,
          });
          refetch(); // 次のIDを更新
          form.reset(); // フォーム初期化
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
      <p className="mb-4">
        次のMember ID:{" "}
        <span className="font-mono font-semibold">{String(nextMemberId ?? "-")}</span>
      </p>
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
          <Button type="submit" disabled={isPending || isReading}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
