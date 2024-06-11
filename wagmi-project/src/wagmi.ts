import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { mock } from "wagmi/connectors";

import { type Address } from "viem";
import { abi } from "@/lib/abi/TextDAOFacade";
import { account } from "@/lib/account";
// import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});

// export const config = createConfig({
//   chains: [mainnet],
//   connectors: [
//     mock({ accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"] }),
//   ],
//   ssr: true,
//   transports: {
//     [mainnet.id]: http("http://localhost:8545"),
//   },
// });

export const TextDAOFacade = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
  abi,
  account,
} as const;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
