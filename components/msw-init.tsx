"use client";

import { useEffect } from "react";

export function MSWInit() {
  useEffect(() => {
    async function enableMocking() {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      }
    }

    enableMocking();
  }, []);

  return null;
}
