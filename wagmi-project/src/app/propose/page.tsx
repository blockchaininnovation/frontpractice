"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";
import { toHex } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import {
  proposalSchemaNoIPFS,
  type proposalSchemaNoIPFSType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const INPUTS = [
  {
    name: "id",
    label: "Header ID",
    placeholder: "1",
    _type: "number",
    description: "ヘッダーに付与したい ID を入力してください。",
  },
  {
    name: "title",
    label: "Title",
    placeholder: "Proposal Title",
    _type: "text",
    description: "提案のタイトルを入力してください。",
  },
];

const DEFAULT_VALUES = {
  id: 0,
  title: "",
};

export default function ProposePage() {
  const [isHandling, setIsHandling] = useState(false);
  const { toast } = useToast();
  const { writeContract } = useWriteContract({
    mutation: {
      retry: 3,
      onMutate: () =>
        toast({
          title: "Sending transaction...",
          description: "This may take a while. Please wait...",
        }),
    },
  });

  const form = useForm<proposalSchemaNoIPFSType>({
    resolver: zodResolver(proposalSchemaNoIPFS),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: proposalSchemaNoIPFSType) {
    const args = {
      header: {
        id: BigInt(data.id),
        currentScore: BigInt(0),
        metadataURI: toHex(data.title, { size: 32 }),
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
    };

    writeContract(
      {
        ...TextDAOFacade,
        functionName: "propose",
        args: [args],
      },
      {
        onSuccess: (data) => {
          setIsHandling(false);
          toast({
            title: "Transaction confirmed",
            description: `Transaction Hash: ${data}`,
          });
        },
        onError: (error) => {
          setIsHandling(false);
          toast({
            variant: "destructive",
            title: error.name,
            description: (
              <>
                {(error as BaseError).shortMessage} <br />
                Please try again.
              </>
            ),
          });
        },
      }
    );
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Propose Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {INPUTS.map((input) => (
            <FormInput<proposalSchemaNoIPFSType>
              key={input.name}
              _form={form}
              name={input.name as keyof proposalSchemaNoIPFSType}
              label={input.label}
              placeholder={input.placeholder}
              _type={input._type}
              description={input.description}
            />
          ))}
          <Button type="submit" disabled={isHandling}>
            {isHandling ? "Creating..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
