import { createConfig, http } from 'wagmi'
import { hardhat } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Adresse de déploiement local Hardhat (à adapter après déploiement)
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const config = createConfig({
  chains: [hardhat],
  connectors: [
    injected(),
  ],
  transports: {
    [hardhat.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}