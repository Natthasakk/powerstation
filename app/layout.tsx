import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoltCore Pro 2000 — Portable Power Station",
  description:
    "2,048 Wh LiFePO₄ portable power station. 2,000W AC output, full charge in 1.8 hrs, 3,500+ cycle life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
