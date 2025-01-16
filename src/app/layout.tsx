import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${poppins.variable} h-full font-[family-name:var(--font-poppins)] antialiased`}
      >
        <div className="flex h-full">
          <div>
            <Sidebar />
          </div>

          <div className="flex h-full w-full flex-col">
            <Header />
            <div className="flex flex-1 flex-col overflow-y-auto pb-14 md:pb-0">
              <div className="mt-5 flex-1">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
