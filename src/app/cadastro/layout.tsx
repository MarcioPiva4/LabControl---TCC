import { LoaderHeader } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

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