import type { Metadata } from "next";
import { Roboto, Playwrite_AU_NSW_Guides } from "next/font/google";
import "./globais.scss";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Ensinos"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
    >
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
