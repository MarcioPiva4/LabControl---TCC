import VidrariasForm from "@/components/Forms/VidrariasForm";
import Section from "@/components/Section";

async function getData() {
    const response = await fetch('https://lab-control-g8wb7u7w7-marciop457s-projects.vercel.app/api/fornecedor');
    return await response.json();
}

export default async function Vidrarias(){
    const data = await getData();
    return(
        <Section title="Cadastre uma Vidraria" bottom>
            <VidrariasForm data={data}></VidrariasForm>
        </Section>
    )
}