"use client";

import { useWriteContract, type BaseError } from "wagmi";
import { type Address } from "viem";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { abi } from "@/lib/abi/TextDAOFacade";
import { account } from "@/lib/account";

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

  function handleSubmit() {
    const args = {
      proposalId: BigInt(0),
      headerIds: [BigInt(0), BigInt(1), BigInt(2)] as const,
    };

    writeContract(
      {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
        abi,
        functionName: "voteHeaders",
        args: [args.proposalId, args.headerIds],
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
      <h1 className="text-xl font-bold py-10">Vote Page</h1>
      <div></div>
    </div>
  );
}
