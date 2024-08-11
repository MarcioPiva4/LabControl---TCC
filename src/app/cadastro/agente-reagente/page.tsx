import AgenteReajenteForm from "@/components/Forms/AgenteReajenteForm";
import Section from "@/components/Section";

async function getData() {
    try {
        const response = await fetch('https://lab-control-g8wb7u7w7-marciop457s-projects.vercel.app/api/fornecedor');
        const text = await response.text();

        if (response.ok) {
            try {
                return JSON.parse(text);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                return null;
            }
        } else {
            console.error('HTTP Error:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export default async function Agente_Reagente() {
    const data = await getData();
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <AgenteReajenteForm data={data}></AgenteReajenteForm>
        </Section>
    )
}