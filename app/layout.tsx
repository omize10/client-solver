import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Client Solver | Premium Real Estate Lead Generation System",
  description: "Scale your real estate business with 20-30 qualified seller appointments monthly. Zero ad spend. Exclusive methodology for top-tier agents and brokers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
