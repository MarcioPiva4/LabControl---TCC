import LaboratorioForm from "@/components/Forms/LaboratorioForm";
import Section from "@/components/Section";

export default function Laboratorio(){
    return(
        <Section title="Cadastre um Laboratorio" bottom>
            <LaboratorioForm></LaboratorioForm>
        </Section>
    )
}