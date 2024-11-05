import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

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