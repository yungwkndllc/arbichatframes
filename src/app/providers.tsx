"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import merge from "lodash.merge";

const { wallets } = getDefaultWallets();

coinbaseWallet.preference = "all";

const myTheme = merge(darkTheme(), {
  colors: {
    connectButtonBackground: "#b62a3c",
    connectButtonInnerBackground: "#b62a3c",
    closeButtonBackground: "#b62a3c",
    modalBackground: "#b62a3c",
    accentColor: "#b62a3c",
  },
} as Theme);

const config = getDefaultConfig({
  appName: "arbichat",
  projectId: "07b6f4d24e08eaa614a4407c6a7ab974",
  wallets: [
    ...wallets,
    {
      groupName: "Popular",
      wallets: [coinbaseWallet],
    },
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [arbitrum],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
