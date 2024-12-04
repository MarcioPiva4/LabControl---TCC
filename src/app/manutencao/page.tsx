import { LoaderAulas } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { AulaReq } from "@/types/aula";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const Manutencao = dynamic(() => import("@/components/LayoutPages/Manutencao"), {
    ssr: false,
    loading: () => <LoaderAulas quantity={4}></LoaderAulas>
})

export default async function Page(){
    const dataAulas = await getDataAulas() as AulaReq;
    return(
        <Section title="Edite suas aulas" bottom>
            <Manutencao aulas={dataAulas}></Manutencao>
        </Section>
    )
}

async function getDataAulas(){
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
        cache: "no-store",
        headers: {
            "Authorization": `Bearer ${session?.token}`,
            "X-User-Email": session?.user.email as string,
            "X-User-Role": session?.user.role as string
        },
    });
    return await response.json();
}