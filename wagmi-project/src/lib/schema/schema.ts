import { z } from "zod";

import { uint256Schema, addressArraySchema } from "./common";

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

export type initializeSchemaType = z.infer<typeof initializeSchema>;
export type proposalSchemaType = z.infer<typeof proposalSchema>;
