"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { useWriteContract, type BaseError } from "wagmi";
import { Address, Hex } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";

import { abi } from "@/lib/abi/TextDAOFacade";
import { proposalSchema, type proposalSchemaType } from "@/lib/schema/schema";
import { createNewProposal, queryClient } from "@/lib/http";
import { getDigest } from "@/lib/helper";
import { account } from "@/lib/account";

//test
import { useWaitForTransactionReceipt } from "wagmi";
import { getStorageAt } from "@wagmi/core";
import { config } from "@/wagmi";

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
  description: "",
};

export default function ProposePage() {
  const [isHandling, setIsHandling] = useState(false);
  const { toast } = useToast();
  const {
    writeContract,
    isError,
    data: hash,
  } = useWriteContract({
    mutation: {
      retry: 3,
      onMutate: () =>
        toast({
          title: "Sending transaction...",
          description: "This may take a while. Please wait...",
        }),
    },
  });

  const { data, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createNewProposal,
    onMutate: () => {
      setIsHandling(true);
      toast({
        title: "Uploading to IPFS...",
        description: "This may take a while. Please wait...",
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("IPFS_CID", data);
      localStorage.setItem("IPFS_DIGEST", getDigest(data));
      toast({
        title: "Success to upload to IPFS",
        description: "Proposal data is uploaded.",
      });
    },
    onError: (error) => {
      setIsHandling(false);
      toast({
        variant: "destructive",
        title: error.name,
        description: error.message,
      });
    },

    // Note: Invalidate the cache when the mutation is successful
  });

  const form = useForm<proposalSchemaType>({
    resolver: zodResolver(proposalSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function sendTransaction(id: number, ipfs_cid: string) {
    const args = {
      header: {
        id: BigInt(id),
        currentScore: BigInt(0),
        metadataURI: ipfs_cid as Hex,
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

  async function handleSubmit(data: proposalSchemaType) {
    if (isError) {
      setIsHandling(true);
      const ipfs_cid = localStorage.getItem("IPFS_DIGEST");
      sendTransaction(data.id, ipfs_cid!);
      return;
    }
    await mutateAsync(data);
    const ipfs_cid = localStorage.getItem("IPFS_DIGEST");
    sendTransaction(data.id, ipfs_cid!);
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Propose Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {INPUTS.map((input) => (
            <FormInput<proposalSchemaType>
              key={input.name}
              _form={form}
              name={input.name as keyof proposalSchemaType}
              label={input.label}
              placeholder={input.placeholder}
              _type={input._type}
              description={input.description}
            />
          ))}
          <FormTextarea<proposalSchemaType>
            _form={form}
            name="description"
            label="Description"
            placeholder="Proposal Description"
            description="提案の詳細を入力してください。"
          />
          <Button type="submit" disabled={isHandling}>
            {isHandling ? "Creating..." : "Submit"}
          </Button>
        </form>
      </Form>
      {isSuccess && (
        <Button
          onClick={async () => {
            console.log(data);
            const a = await getStorageAt(config, {
              address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
              slot: "0x9a70c69f78b954ec2ace8c62308c5ea2ed35f782ee583f10b56d88886fa99300",
            });
            console.log(a);
          }}
        >
          check
        </Button>
      )}
    </div>
  );
}
