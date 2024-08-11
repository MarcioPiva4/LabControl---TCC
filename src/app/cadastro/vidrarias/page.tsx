import VidrariasForm from "@/components/Forms/VidrariasForm";
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

export default async function Equipamentos(){
    const data = await getData();
    return(
        <Section title="Cadastre uma Vidraria" bottom>
            <VidrariasForm data={data}></VidrariasForm>
        </Section>
    )
}