import Header from "@/components/Header";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions);
    return (
        <>
            <Header></Header>
            <main>{children}</main>
        </>
    );
  }