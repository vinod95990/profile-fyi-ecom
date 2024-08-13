"use client";
import "../app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context";
const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}
