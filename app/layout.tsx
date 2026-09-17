import type { Metadata } from "next";
import { Alfa_Slab_One, Archivo } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A slab pesada faz a manchete e os títulos: é a letra da placa da
   logo, a placa de madeira da entrada da loja. A Archivo, reta, faz o
   corpo, os botões e os campos; a itálica dela é a voz. */
const display = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--fonte-corpo",
  display: "swap",
});

const TITULO = "Rust Country: calças country femininas bordadas, envio para todo o Brasil";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: "%s · Rust Country",
  },
  description: "Moda country de respeito: calças femininas bordadas Ariat, Texas Farm, Big Country e Bill Way, com caveira longhorn, penas, asteca e pespontos no bolso. Você escolhe no site e fala com um atendente pelo WhatsApp. Envio para todo o Brasil.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rust Country",
    url: site.url,
    title: TITULO,
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Rust Country" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.posicionamento,
    images: ["/og/site.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
