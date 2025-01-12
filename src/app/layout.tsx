import type { Metadata } from "next";
import Providers from "./components/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Roboto } from "next/font/google";

import "./globals.css";
import NavBar from "./components/ui/NavBar";

export const metadata: Metadata = {
  title: "Next.js + Nest + Mercado Pago",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased  ${roboto.className}`}>
        <Providers>
          {/* <NavBar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
