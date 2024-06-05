"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useWriteContract } from "wagmi";
import { Address, getAddress } from "viem";

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
import { initializeSchema } from "@/lib/schema";
import { account } from "@/lib/account";

export default function InitializePage() {
  const { isPending, writeContract } = useWriteContract();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof initializeSchema>>({
    resolver: zodResolver(initializeSchema),
    defaultValues: {
      initialMembers: "",
      pConfigSchema: {
        expiryDuration: 0,
        tallyInterval: 0,
        repsNum: 0,
        quorumScore: 0,
      },
    },
  });

  function handleSubmit(data: z.infer<typeof initializeSchema>) {
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
            description: error.message,
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
          <FormField
            control={form.control}
            name="initialMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Members</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0xf39F...2266, 0x88F6F...27279c, ..."
                    {...field}
                    className="w-1/3"
                    type="text"
                  />
                </FormControl>
                <FormDescription>
                  初期メンバーのアドレスを入力してください。カンマ区切りで複数のアドレスを指定できます。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pConfigSchema.expiryDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    className="w-1/3"
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  投票の有効期限を入力してください。単位はブロック秒です。( 1 ==
                  1 second )
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pConfigSchema.tallyInterval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tally Interval</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    className="w-1/3"
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  投票の集計間隔を入力してください。単位はブロック秒です。( 1 ==
                  1 second )
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pConfigSchema.repsNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps Num</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    className="w-1/3"
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  Reps はある proposal に fork, vote 可能な DAO
                  参加者のサブセットです。人数を指定してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pConfigSchema.quorumScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quorum Score</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    className="w-1/3"
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  Quorum Score は proposal
                  の可決に必要な最低限の得票数です。スコアを指定してください。
                </FormDescription>
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
