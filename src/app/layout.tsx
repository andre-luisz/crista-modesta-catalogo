import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";
import "./premium.css";
import "./product-page-premium.css";
import "./catalog-v2.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Cristã Modesta | Moda Evangélica", template: "%s | Cristã Modesta" },
  description: "Vitrine da Cristã Modesta. Moda feminina evangélica com elegância, conforto e propósito.",
  icons: { icon: "/brand/icon-crista-modesta.png", apple: "/brand/icon-crista-modesta.png" },
  openGraph: {
    title: "Cristã Modesta | Moda Evangélica",
    description: "Peças femininas escolhidas com elegância, conforto e propósito.",
    images: ["/brand/logo-crista-modesta.png"],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{ duration: 2800 }}
        />
      </body>
    </html>
  );
}
