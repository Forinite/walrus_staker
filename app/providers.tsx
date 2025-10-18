'use client';
import React from 'react';
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import config from '@/lib/config';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { networkConfig } = createNetworkConfig({
  testnet: { url: config.FULLNODE_URL || getFullnodeUrl('testnet') },
  devnet: { url: config.FULLNODE_URL || getFullnodeUrl('devnet') },
  mainnet: { url: config.FULLNODE_URL || getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={config.SUI_NETWORK}>
        <WalletProvider>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
