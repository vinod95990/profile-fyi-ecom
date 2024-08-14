import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/Providers.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sails",
  description: "profile fyi",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer
            hideProgressBar={false}
            position="top-center"
            autoClose={3000}
          />

          {children}
        </body>
      </html>
    </Providers>
  );
}
