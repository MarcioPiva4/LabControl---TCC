import VidrariasForm from "@/components/Forms/VidrariasForm";
import Section from "@/components/Section";

async function getData() {
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app/api/fornecedor');
    if(response.ok){
        return await response.json();
    } else {
        return console.error("ocorreu um erro");
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