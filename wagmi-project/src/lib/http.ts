import { QueryClient } from "@tanstack/react-query";

import { getPinataFormat } from "./helper";
import { type proposalSchemaType } from "./schema/schema";

export const queryClient = new QueryClient();

export async function createNewProposal(proposalData: proposalSchemaType) {
  const data = getPinataFormat(proposalData);
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Oh my god");
  }

  const { IpfsHash } = await response.json();

  return IpfsHash;
}
