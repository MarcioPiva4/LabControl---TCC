import { LoaderHeader } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/Header'), { ssr: false, loading: () => <LoaderHeader></LoaderHeader> });

export const metadata: Metadata = {
  title: "LabControl | Baixa de Aula",
  description: "Finalização de aulas",
};

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Header></Header>
            <main>{children}</main>
        </>
    );
  }