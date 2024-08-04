import AdministradorForm from "@/components/Forms/AdministradorForm";
import Section from "@/components/Section";

export default function Administrador(){
    return(
        <Section title="Cadastre um Administrador" bottom>
            <AdministradorForm></AdministradorForm>
        </Section>
    )
}