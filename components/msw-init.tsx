"use client";

import { useEffect } from "react";

export function MSWInit() {
  useEffect(() => {
    async function enableMocking() {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        // Use dynamic import for the worker
        const { setupWorker } = await import("msw/browser");
        const { handlers } = await import("@/mocks/handlers");
        
        const worker = setupWorker(...handlers);
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      }
    }

    enableMocking();
  }, []);

  return null;
}
