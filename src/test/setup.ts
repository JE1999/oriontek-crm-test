import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock hooks or globals if needed
// Example: Mock useT if it's used globally
vi.mock("@/hooks/useT", () => ({
  useT: () => ({
    t: (key: string) => key,
  }),
}));
