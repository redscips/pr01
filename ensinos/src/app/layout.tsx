import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { EstilosGlobais } from "./estilos_globais";
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
      <EstilosGlobais />
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
