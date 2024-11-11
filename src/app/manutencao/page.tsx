import { LoaderAulas } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

const Manutencao = dynamic(() => import("@/components/LayoutPages/Manutencao"), {
    ssr: false,
    loading: () => <LoaderAulas quantity={4}></LoaderAulas>
})

export default async function Page(){
    const dataAulas = await getDataAulas();
    return(
        <Section title="Edite suas aulas" bottom>
            <Manutencao aulas={dataAulas}></Manutencao>
        </Section>
    )
}

async function getDataAulas(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
        cache: 'no-cache',
    });
    return await response.json();
}