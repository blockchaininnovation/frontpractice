import { QueryClient } from "@tanstack/react-query";

import { type proposalSchemaType } from "./schema/schema";

export const queryClient = new QueryClient();

function format(data: proposalSchemaType) {
  return {
    pinataOptions: { cidVersion: 1 },
    pinataMetadata: { name: data.id.toString() },
    pinataContent: { title: data.title, description: data.description },
  };
}
// function format(data: proposalSchemaType) {
//   return {
//     pinataOptions: { cidVersion: 1 },
//     pinataMetadata: { name: data.id },
//     pinataContent: { title: data.title, description: data.description },
//   };
// }

export async function createNewProposal(proposalData: proposalSchemaType) {
  const data = format(proposalData);
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
