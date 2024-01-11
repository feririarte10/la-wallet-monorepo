import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historial - LaWallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
