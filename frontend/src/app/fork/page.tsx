"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import { tallySchema, type tallySchemaType } from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";
import { toHex } from "viem";

const DEFAULT_VALUES = {
  pid: 0,
};

export default function ForkPage() {
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

  const form = useForm<tallySchemaType>({
    resolver: zodResolver(tallySchema),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: tallySchemaType) {
    const args = {
      id: BigInt(data.pid),
      _p: {
        header: {
          id: BigInt(0),
          currentScore: BigInt(0),
          metadataURI: toHex("ddddd", { size: 32 }),
          tagIds: [],
        },
        cmd: {
          id: BigInt(0),
          actions: [],
          currentScore: BigInt(0),
        },
        proposalMeta: {
          currentScore: BigInt(0),
          headerRank: [],
          cmdRank: [],
          nextHeaderTallyFrom: BigInt(0),
          nextCmdTallyFrom: BigInt(0),
          reps: [],
          nextRepId: BigInt(0),
          createdAt: BigInt(0),
        },
      },
    };

    writeContract(
      {
        ...TextDAOFacade,
        functionName: "fork",
        args: [args.id, args._p],
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Transaction confirmed",
            description: `Transaction Hash: ${data}`,
          });
        },
        onError: (error) => {
          console.log(error.message);
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
      <h1 className="text-xl font-bold py-10">Fork Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormInput
            _form={form}
            name="pid"
            label="Tally"
            placeholder="0"
            _type="number"
            description="締め切る提案のIDを入力してください。"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
