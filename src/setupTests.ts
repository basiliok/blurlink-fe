import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Runs after each test: removes from the screen what that test drew with render.
afterEach(() => {
    cleanup();
});
