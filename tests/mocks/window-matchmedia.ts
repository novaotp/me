import { vi } from 'vitest';

const matchMediaMock = vi.fn(() => ({
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: Math.random() < 0.5,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
}));

vi.stubGlobal('matchMedia', matchMediaMock);
