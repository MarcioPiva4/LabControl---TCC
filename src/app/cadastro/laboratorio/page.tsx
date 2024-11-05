import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

const LaboratorioForm = dynamic(() => import("@/components/Forms/LaboratorioForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={6} textArea></LoaderForm>
    }
);


export default function Laboratorio(){
    return(
        <Section title="Cadastre um Laboratorio" bottom>
            <LaboratorioForm></LaboratorioForm>
        </Section>
    )
}