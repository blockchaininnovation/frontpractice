import { z } from "zod";
import { isAddress, size, toHex } from "viem";

export const uint256Schema = z.coerce
  .number()
  .int()
  .nonnegative()
  .lt(2 ** 256);

export const bytes32Schema = z.string().refine(
  (val) => {
    try {
      const data = toHex(val);
      return size(data) === 32;
    } catch (error) {
      return false;
    }
  },
  (val) => ({
    message: `Invalid data size: ${size(toHex(val))} bytes`,
  })
);

export const pConfigSchema = z.object({
  expiryDuration: uint256Schema,
  tallyInterval: uint256Schema,
  repsNum: uint256Schema,
  quorumScore: uint256Schema,
});

export const initializeSchema = z.object({
  initialMembers: z.string().refine(
    (val) => {
      const addresses = val.replace(/\s/g, "").split(",");
      return addresses.every((address) => isAddress(address));
    },
    {
      message: "Invalid address",
    }
  ),
  pConfigSchema,
});

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
