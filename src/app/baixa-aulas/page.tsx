import { LoaderAulas } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { AulaReq } from "@/types/aula";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const BaixaAulas = dynamic(() => import("@/components/LayoutPages/BaixaAulas"), {
    ssr: false,
    loading: () => <LoaderAulas quantity={4}></LoaderAulas>
});


export default async function Page() {
    const dataAulas = await getDataAulas() as AulaReq;

    return (
        <Section title="Finalizar aula" bottom>
            <BaixaAulas aulas={dataAulas}></BaixaAulas>
        </Section>
    );
}

async function getDataAulas() {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
        cache: 'no-cache',
        headers: {
            "Authorization": `Bearer ${session?.token}`,
            "X-User-Email": session?.user.email as string,
            "X-User-Role": session?.user.role as string
        },
    });
    return await response.json();
}