import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";


import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Toaster } from "@/components/ui/sonner"


import { WagmiProvider, deserialize, serialize } from 'wagmi'
import { config } from './lib/wagmi'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        },
    },
});

const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <WagmiProvider config={config}>
          <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister }}
          >
              <ThemeProvider>
                  <AppWrapper>
                      <App />
                      <Toaster />
                  </AppWrapper>
              </ThemeProvider>
          </PersistQueryClientProvider>
      </WagmiProvider>
  </StrictMode>
);
