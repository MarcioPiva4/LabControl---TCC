import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Matérias",
    description: "Cadastro de matérias",
};

const MateriaForm = dynamic(() => import("@/components/Forms/MateriaForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={1} textArea></LoaderForm>
    }
);

export default function Materias(){
    return(
        <Section title="Cadastre uma matéria">
            <MateriaForm></MateriaForm>
        </Section>
    )
}