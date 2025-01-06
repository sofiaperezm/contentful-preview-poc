import "./globals.css";
import { Inter } from "next/font/google";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import { draftMode } from 'next/headers';
import React from 'react';
import { ContentfulPreviewProvider } from "../app/components/ContentfulPreviewProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen flex flex-col justify-between">
          <Header />
          <ContentfulPreviewProvider
            locale="en-US"
            enableInspectorMode={isEnabled}
            enableLiveUpdates={isEnabled}
            debugMode={true}
          >
            <main>{children}</main>
          </ContentfulPreviewProvider>         
          <Footer path={EXAMPLE_PATH} />
        </section>
      </body>
    </html>
  );
}
