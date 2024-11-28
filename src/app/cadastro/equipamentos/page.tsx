import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Equipamento",
    description: "Cadastro de equipamentos",
};

const EquipamentosForm = dynamic(() => import("@/components/Forms/EquipamentosForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={8} textArea></LoaderForm>
    }
);

export default async function Equipamentos(){
    const data = await getData();
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <EquipamentosForm data={data}></EquipamentosForm>
        </Section>
    )
}

async function getData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedor`, {
        cache: 'no-cache'
    });
    return await response.json();
}