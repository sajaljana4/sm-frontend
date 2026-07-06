import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/modules/layout/header";
import Footer from "@/modules/layout/footer";
import LoginModal from "@/modules/auth/login-modal";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Specify the weights you need
  variable: "--font-poppins", // (Optional) CSS variable name
});

export const metadata: Metadata = {
  title: "Santhali Matrimony",
  description: "Santhali Matrimony",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", poppins.className)}>
      <head />
      <body>
        <Header />
        <Toaster position="top-center" richColors />
        <LoginModal />
        <div className="mt-12 md:mt-18">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
