"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import { voteSchema, type voteSchemaType } from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const DEFAULT_VALUES = {
  pid: 0,
};

export default function VotePage() {
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

  const form = useForm<voteSchemaType>({
    resolver: zodResolver(voteSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: voteSchemaType) {
    const args = {
      proposalId: BigInt(data.pid),
      headerIds: [BigInt(0), BigInt(0), BigInt(0)] as const,
    };

    writeContract(
      {
        ...TextDAOFacade,
        functionName: "voteHeaders",
        args: [args.proposalId, args.headerIds],
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
      <h1 className="text-xl font-bold py-10">Vote Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormInput<voteSchemaType>
            _form={form}
            name="pid"
            label="Vote"
            placeholder="0"
            _type="number"
            description="投票する提案のIDを入力してください。"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
