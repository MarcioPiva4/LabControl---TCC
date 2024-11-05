import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

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
    const response = await fetch('http://localhost:3000/api/fornecedor', {
        cache: 'no-cache'
    });
    return await response.json();
}
