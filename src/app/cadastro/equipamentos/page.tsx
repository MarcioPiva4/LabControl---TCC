import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

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
    const response = await fetch('http://localhost:3000/api/fornecedor', {
        cache: 'no-cache'
    });
    return await response.json();
}