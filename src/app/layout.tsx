import type { Metadata } from "next";
import Providers from "./components/providers";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js + Nest + Mercado Pago",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark container m-auto grid min-h-screen max-w-screen-sm grid-rows-[auto,1fr,auto] px-4 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
