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
    const session = await getServerSession(authOptions);
    const dataAulasFiltered = dataAulas.data.filter((e) => e.professores[0].email == session?.user.email);
    return(
        <Section title="Edite suas aulas" bottom>
            <Manutencao aulas={session?.user.role === 'prof' ? dataAulasFiltered : dataAulas}></Manutencao>
        </Section>
    )
}

async function getDataAulas(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
        cache: "no-store",
    });
    return await response.json();
}