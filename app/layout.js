import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/Providers.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sails",
  description: "profile fyi",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
