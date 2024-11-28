import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Inter } from "next/font/google";
import { theme } from "@/styles/theme";
import ButtonBackTop from "@/components/ButtonBackTop";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import ResetPassword from "@/components/ResetPassword";

export const metadata: Metadata = {
  title: "LabControl",
  description: "Gerenciamento de estoque de laboratório",
  icons: {
    icon: "/favicon.png", 
  },
};

const fontFamily = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as Session;
  return (
    <html lang="pt-br" className={fontFamily.className}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle theme={theme} />
          {/* <ResetPassword id={session.user.id} role={session?.user?.role}></ResetPassword> */}
          {session?.user?.isFirstLogin ? (
            <ResetPassword id={session.user.id} role={session?.user?.role}></ResetPassword>
          ) : (
            <>
              <ButtonBackTop></ButtonBackTop>
              {children}
            </>
          )}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
