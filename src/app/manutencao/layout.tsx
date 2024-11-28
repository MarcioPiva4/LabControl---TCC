import { LoaderHeader } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "LabControl | Edição Aula",
  description: "Edição de aula",
};

const Header = dynamic(() => import('@/components/Header'), { ssr: false, loading: () => <LoaderHeader></LoaderHeader> });

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