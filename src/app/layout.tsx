import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Inter } from 'next/font/google'
import { Header } from "@/Components/Header";
import { theme } from "@/styles/theme";

export const metadata: Metadata = {
  title: "LabControl",
  description: "Gerenciamento de estoque de laboratio",
};

const fontFamily = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={fontFamily.className}>
      <body>
        <StyledComponentsRegistry>
            <GlobalStyle theme={theme}/>
            <Header></Header>
            {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
