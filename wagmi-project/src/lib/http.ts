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

export async function getCIDsFromIPFS() {
  const response = await fetch(
    `https://api.pinata.cloud/data/pinList?status=pinned`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch CIDs from Pinata");
  }

  const data = await response.json();

  const cids = data.rows.map((row: any) => row.ipfs_pin_hash);

  return cids;
}

export async function getProposalData(cid: string) {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch proposal data from IPFS");
  }

  const data = await response.json();

  return data;
}

export async function getAllProposals() {
  const cids = await getCIDsFromIPFS();

  const data = cids.map(async (cid: string) => {
    await getProposalData(cid);
  });

  return data;
}
