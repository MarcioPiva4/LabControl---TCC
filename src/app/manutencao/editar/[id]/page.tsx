import EditarAulaForm from "@/components/Forms/EditarAulaForm";
import FinalizarAulaForm from "@/components/Forms/FinalizarAulaForm";
import Section from "@/components/Section";

async function getDataAulas(){
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app//api/aula', { cache: 'no-cache'});
    return response.json();
}

async function getDataMateria() {
    const response = await fetch('https://lab-control-gblfdwzu6-marciop457s-projects.vercel.app/api/materia');
    return await response.json();
}

async function getDataLaboratorio() {
    const response = await fetch('https://lab-control-gblfdwzu6-marciop457s-projects.vercel.app//api/laboratorio');
    return await response.json();
}

async function getDataProfessor() {
    const response = await fetch('https://lab-control-gblfdwzu6-marciop457s-projects.vercel.app//api/professor');
    return await response.json();
}

export default async function Page({ params }: {params: any}){
    const dataAulas = await getDataAulas();
    const dataMateria = await getDataMateria();
    const dataLaboratorio = await getDataLaboratorio();
    const dataProfessor = await getDataProfessor();
    const { id } = params;
    return(
        <Section title="Algo de errado com a sua aula?" bottom>
            <EditarAulaForm aulas={dataAulas} id={id} materias={dataMateria} laboratorio={dataLaboratorio} professor={dataProfessor}></EditarAulaForm >
        </Section>
    )
}