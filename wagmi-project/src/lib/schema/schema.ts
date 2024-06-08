import { z } from "zod";

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

// Types
export type initializeSchemaType = z.infer<typeof initializeSchema>;
export type proposalSchemaType = z.infer<typeof proposalSchema>;
export type tallySchemaType = z.infer<typeof tallySchema>;
export type memberJoinSchemaType = z.infer<typeof memberJoinSchema>;
