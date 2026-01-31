import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { App } from './App.tsx';
import { queryPersister } from './config/queryPersister';
import { PERSIST_MAX_AGE, STALE_TIME } from './constants/query.ts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: STALE_TIME,
            gcTime: PERSIST_MAX_AGE,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: queryPersister,
                maxAge: PERSIST_MAX_AGE,
                buster: undefined,
            }}
        >
            <App />
        </PersistQueryClientProvider>
    </StrictMode>,
);
