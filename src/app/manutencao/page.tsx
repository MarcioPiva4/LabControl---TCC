import { LoaderAulas } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

const Manutencao = dynamic(() => import("@/components/LayoutPages/Manutencao"), {
    ssr: false,
    loading: () => <LoaderAulas quantity={4}></LoaderAulas>
})

export default async function Page(){
    const dataAulas = await getDataAulas();
    const dataProfessores = await getDataProfessores();
    return(
        <Section title="Edite suas aulas" bottom>
            <Manutencao aulas={dataAulas} professores={dataProfessores}></Manutencao>
        </Section>
    )
}

async function getDataAulas(){
    const response = await fetch('http://localhost:3000/api/aula', {
        cache: 'no-cache',
    });
    return await response.json();
}

async function getDataProfessores(){
    const response = await fetch('http://localhost:3000/api/professor', {
        cache: 'no-cache',
    });
    return await response.json();
}