"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useWriteContract } from "wagmi";
import { Address, toHex } from "viem";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { abi } from "@/lib/abi/TextDAOFacade";
import { proposalSchema } from "@/lib/schema";
import { account } from "@/lib/account";

export default function ProposePage() {
  const { isPending, writeContract } = useWriteContract();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof proposalSchema>>({
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

  function handleSubmit(data: z.infer<typeof proposalSchema>) {
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
    console.log(data);
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
            description: `Transaction Hash: ${data}`,
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: error.name,
            description: error.message,
          });
          console.log(error.message);
        },
      }
    );
  }

  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Propose Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="header.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1"
                    {...field}
                    className="w-1/3"
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  ヘッダーに付与したい ID を入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="header.metadataURI"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metadata URI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    className="w-1/3"
                    type="text"
                  />
                </FormControl>
                <FormDescription>Test</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
