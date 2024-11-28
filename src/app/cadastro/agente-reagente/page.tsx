import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Agente-Reajente",
    description: "Cadastro de agentes-reajentes",
};

const AgenteReajenteForm  = dynamic(() => import("@/components/Forms/AgenteReajenteForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={11} textArea></LoaderForm>
    }
);

export default async function Agente_Reagente() {
    const data = await getData();
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <AgenteReajenteForm data={data}></AgenteReajenteForm>
        </Section>
    )
}

async function getData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedor`, {
        cache: 'no-cache'
    });
    return await response.json();
}
