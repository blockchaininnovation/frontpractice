import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
// import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  // chains: [mainnet, sepolia],
  connectors: [],
  // connectors: [injected()],
  ssr: true,
  transports: {
    [mainnet.id]: http("http://localhost:8545"),
    // [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
