import FinalizarAulaForm from "@/components/Forms/FinalizarAulaForm";
import Section from "@/components/Section";

async function getDataAulas(){
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app/api/aula');
    return response.json();
}

export default async function Page({ params }: {params: any}){
    const dataAulas = await getDataAulas();
    const { id } = params;
    return(
        <Section title="Finalizar aula" bottom>
            <FinalizarAulaForm aulas={dataAulas} id={id}></FinalizarAulaForm>
        </Section>
    )
}