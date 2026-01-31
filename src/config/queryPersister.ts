import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const queryPersister = createAsyncStoragePersister({
    storage: window.localStorage,
    key: 'blurlink-cache',
});
