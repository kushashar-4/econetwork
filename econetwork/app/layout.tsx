import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import "atropos/css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
