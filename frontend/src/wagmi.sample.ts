import { http, createConfig } from "wagmi";
import { mainnet, sepolia, localhost, anvil } from "wagmi/chains";
import { mock } from "wagmi/connectors";

import { type Address } from "viem";
import { account } from "@/lib/account";

import { abi } from "@/lib/abi/TextDAOFacade";

// export const config = createConfig({
//   chains: [sepolia],
//   connectors: [],
//   ssr: true,
//   transports: {
//     [sepolia.id]: http(),
//   },
// });

// export const config = createConfig({
//   chains: [sepolia],
//   connectors: [],
//   ssr: true,
//   transports: {
//     [sepolia.id]: http("http://localhost:8545"),
//   },
// });

export const config = createConfig({
  chains: [anvil],
  connectors: [],
  ssr: true,
  transports: {
    [anvil.id]: http("http://localhost:8545"),
  },
});


export const TextDAOFacade = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
  abi,
  // account,
} as const;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
