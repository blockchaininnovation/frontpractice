import { z } from "zod";

import { toHex, size } from "viem";

import { uint256Schema, addressSchema, addressArraySchema } from "./common";

// Initialize schema
export const pConfigSchema = z.object({
  expiryDuration: uint256Schema,
  tallyInterval: uint256Schema,
  repsNum: uint256Schema,
  quorumScore: uint256Schema,
});

export const initializeSchema = z.object({
  initialMembers: addressArraySchema,
  pConfigSchema,
});

// Proposal schema
export const proposalSchema = z.object({
  id: uint256Schema,
  title: z.string().min(1, "Title must be at least 1 character long"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long"),
});

export const proposalSchemaNoIPFS = z.object({
  id: uint256Schema,
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .refine(
      (val) => {
        const title = toHex(val);
        return size(title) <= 32;
      },
      {
        message: "Title must be less than 32 bytes",
      }
    ),
});

// Tally schema
export const tallySchema = z.object({
  pid: uint256Schema,
});

// MemberJoin schema
export const memberSchema = z.object({
  id: uint256Schema,
  addr: addressSchema,
});

export const memberJoinSchema = z.object({
  pid: uint256Schema,
  candidates: memberSchema,
});

// Vote schema
export const voteSchema = z.object({
  pid: uint256Schema,
});

// Contract Call schema
export const contractCallPidSchema = z.object({
  pid: uint256Schema,
});

export const contractCallMemberIdSchema = z.object({
  memberID: uint256Schema,
});

// Types
export type initializeSchemaType = z.infer<typeof initializeSchema>;
export type proposalSchemaType = z.infer<typeof proposalSchema>;
export type proposalSchemaNoIPFSType = z.infer<typeof proposalSchemaNoIPFS>;
export type tallySchemaType = z.infer<typeof tallySchema>;
export type voteSchemaType = z.infer<typeof voteSchema>;
export type memberJoinSchemaType = z.infer<typeof memberJoinSchema>;
export type contractCallPidSchemaType = z.infer<typeof contractCallPidSchema>;
export type contractCallMemberIdSchemaType = z.infer<
  typeof contractCallMemberIdSchema
>;
