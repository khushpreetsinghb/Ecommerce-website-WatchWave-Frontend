"use client";

import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/context/auth";
import { SearchProvider } from "@/context/search";
import { CartProvider } from "@/context/cart";
import { Toaster } from "react-hot-toast";

// Wraps the app in Ant Design's App Router registry (prevents CSS-in-JS
// mismatch flicker) plus the WatchWave auth/search/cart contexts.
export default function Providers({ children }) {
  return (
    <AntdRegistry>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <Toaster />
            {children}
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </AntdRegistry>
  );
}
