"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { MSWInit } from "@/components/msw-init";
import { TooltipProvider } from "@/components/ui/tooltip";

// Initialize MSW in development
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("@/mocks/browser");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Prevent automatic refetching
      gcTime: 60 * 60 * 1000, // Cache data for 1 hour
      retry: 2,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {process.env.NEXT_PUBLIC_API_MOCKING === "enabled" && <MSWInit />}
          <Toaster />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
