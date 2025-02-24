import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ReduxProvider from "@/components/Redux/ReduxProvider";
import PromotionModal from "@/components/Modal/PromotionModal";
import { ToastContainer } from "react-toastify";
import LoginModal from "@/components/Modal/Auth/LoginModal";
import RegisterModal from "@/components/Modal/Auth/RegisterModal";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/request";
import WalletModal from "@/components/Modal/Wallet/WalletModal";
import MessageModal from "@/components/Modal/MessageModal";
import SupportModal from "@/components/Modal/SupportModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "Metadata.RootLayout",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body
        className={`${poppins.variable} h-full font-[family-name:var(--font-poppins)] antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <div className="flex h-full">
              <aside>
                <Sidebar />
              </aside>

              <main className="flex h-full w-full flex-col">
                <Header />
                <div className="flex flex-1 flex-col overflow-y-auto pb-14 md:pb-0">
                  <div className="flex-1">{children}</div>
                  <Footer />
                </div>
              </main>

              <PromotionModal />
              <MessageModal />
              <SupportModal />
              <WalletModal />
              <LoginModal />
              <RegisterModal />
            </div>
            <ToastContainer
              autoClose={2000}
              draggable={true}
              position="top-right"
            />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
