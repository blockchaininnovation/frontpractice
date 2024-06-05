import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { mock } from "wagmi/connectors";
// import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  // chains: [mainnet, sepolia],
  connectors: [
    mock({ accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"] }),
  ],
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
