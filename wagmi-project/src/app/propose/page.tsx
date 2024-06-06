"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";
import { Address, toHex } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import { abi } from "@/lib/abi/TextDAOFacade";
import { proposalSchema, type proposalSchemaType } from "@/lib/schema/schema";
import { account } from "@/lib/account";

const INPUTS = [
  {
    name: "header.id",
    label: "Header ID",
    placeholder: "1",
    _type: "number",
    description: "ヘッダーに付与したい ID を入力してください。",
  },
  {
    name: "header.metadataURI",
    label: "Metadata URI",
    placeholder: "123",
    _type: "text",
    description: "Test",
  },
];

export default function ProposePage() {
  const { isPending, writeContract } = useWriteContract();
  const { toast } = useToast();

  const form = useForm<proposalSchemaType>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      header: {
        id: 0,
        metadataURI: "",
      },
      proposalMeta: {
        createdAt: 0,
      },
    },
  });

  function handleSubmit(data: proposalSchemaType) {
    const args = {
      header: {
        id: BigInt(data.header.id),
        currentScore: BigInt(0),
        metadataURI: toHex(data.header.metadataURI, { size: 32 }),
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
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
        abi,
        functionName: "propose",
        args: [args],
        account,
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Transaction confirmed",
            description: (
              <div className="w-80 break-words">
                {`Transaction Hash: ${data}`}
              </div>
            ),
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: error.name,
            description: (
              <div className="w-80 break-words">
                {(error as BaseError).shortMessage}
              </div>
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
            <FormInput
              key={input.name}
              _form={form}
              name={input.name}
              label={input.label}
              placeholder={input.placeholder}
              _type={input._type}
              description={input.description}
            />
          ))}
          <Button type="submit">
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
