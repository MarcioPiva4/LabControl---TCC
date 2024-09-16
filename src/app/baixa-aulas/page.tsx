import BaixaAulas from "@/components/LayoutPages/BaixaAulas";
import Section from "@/components/Section";

async function getDataAulas(){
    const response = await fetch('http://localhost:3000/api/aula');
    return await response.json();
}

async function getDataProfessores(){
    const response = await fetch('http://localhost:3000/api/professor');
    return await response.json();
}

export default async function Page(){
    const dataAulas = await getDataAulas();
    const dataProfessores = await getDataProfessores();
    return(
        <Section title="Finalizar aula" bottom>
            <BaixaAulas aulas={dataAulas} professores={dataProfessores}></BaixaAulas>
        </Section>
    )
}