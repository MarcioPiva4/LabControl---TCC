import { Header } from "@/components/Header";
import { authOptions } from "@/utils/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "LabControl | Edição Aula",
  description: "Edição de aula",
};

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions);
    return (
        <>
            <Header session={session}></Header>
            <main>{children}</main>
        </>
    );
  }