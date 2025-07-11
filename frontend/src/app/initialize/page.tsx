"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWriteContract, type BaseError } from "wagmi";
import { getAddress } from "viem";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form-input";

import {
  initializeSchema,
  type initializeSchemaType,
} from "@/lib/schema/schema";

import { TextDAOFacade } from "@/wagmi";

const INPUTS = [
  {
    name: "initialMembers",
    label: "Initial Members",
    placeholder: "0xf39F...2266, 0x88F6F...27279c, ...",
    _type: "text",
    description:
      "初期メンバーのアドレスを入力してください。カンマ区切りで複数のアドレスを指定できます。",
  },
];

const DEFAULT_VALUES = {
  initialMembers: "",
};

export default function InitializePage() {
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

  const form = useForm<initializeSchemaType>({
    resolver: zodResolver(initializeSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function handleSubmit(data: initializeSchemaType) {
    const args = {
      initialMembers: data.initialMembers
        .replace(/\s/g, "")
        .split(",")
        .map((address) => getAddress(address)),
    };

    writeContract(
      {
        ...TextDAOFacade,
        functionName: "initializeSimple",
        args: [args.initialMembers],
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
      <h1 className="text-xl font-bold py-10">Initialize Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {INPUTS.map((input) => (
            <FormInput<initializeSchemaType>
              key={input.name}
              _form={form}
              name={input.name as keyof initializeSchemaType}
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
