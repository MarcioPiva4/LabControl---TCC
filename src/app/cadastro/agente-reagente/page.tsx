import AgenteReajenteForm from "@/components/Forms/AgenteReajenteForm";
import Section from "@/components/Section";

async function getData() {
    const response = await fetch('https://lab-control-gblfdwzu6-marciop457s-projects.vercel.app/api/fornecedor');
    return await response.json();
}

export default async function Agente_Reagente() {
    const data = await getData();
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <AgenteReajenteForm data={data}></AgenteReajenteForm>
        </Section>
    )
}
