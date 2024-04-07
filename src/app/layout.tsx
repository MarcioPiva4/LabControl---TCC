import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "./page";

export const metadata: Metadata = {
  title: "LabControl",
  description: "Gerenciamento de estoque de laboratio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
