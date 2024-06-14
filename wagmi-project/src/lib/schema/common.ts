import { z } from "zod";
import { isAddress, size, toHex } from "viem";

export const uint256Schema = z.coerce
  .number()
  .int({ message: "Number must be an integer" })
  .nonnegative({ message: "Number must be non-negative" })
  .lt(2 ** 256, { message: "Number must be less than 2^256 - 1" });

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

export const addressSchema = z
  .string()
  .min(1, { message: "Address not provided" })
  .refine(
    (val) => {
      return isAddress(val);
    },
    (val) => {
      return {
        message: `Invalid address: ${val}`,
      };
    }
  );

export const addressArraySchema = z
  .string()
  .min(1, { message: "Address not provided" })
  .refine(
    (val) => {
      const addresses = val.replace(/\s/g, "").split(",");
      return addresses.every((address) => isAddress(address));
    },
    (val) => {
      const addresses = val.replace(/\s/g, "").split(",");
      const invalidAddresses = addresses.filter(
        (address) => !isAddress(address)
      );
      return {
        message: `Invalid address: ${invalidAddresses.join(", ")}`,
      };
    }
  );
