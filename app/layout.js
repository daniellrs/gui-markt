import { Header } from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feevale Markt",
  description: "Feevale Markt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex min-h-[calc(100vh_-_70px)] flex-col items-center justify-center p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
