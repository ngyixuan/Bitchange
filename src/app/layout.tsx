import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "../style/globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Crpto price ticker",
  description: "Real time crypto ticker dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          <main className="h-full">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
