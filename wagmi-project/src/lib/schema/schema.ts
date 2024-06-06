import { z } from "zod";

import { uint256Schema, bytes32Schema, addressArraySchema } from "./common";

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
export const headerSchema = z.object({
  id: uint256Schema,
  metadataURI: bytes32Schema,
});

export const proposalMetaSchema = z.object({
  createdAt: uint256Schema,
});

export const proposalSchema = z.object({
  header: headerSchema,
  proposalMeta: proposalMetaSchema,
});

export type initializeSchemaType = z.infer<typeof initializeSchema>;
export type proposalSchemaType = z.infer<typeof proposalSchema>;
