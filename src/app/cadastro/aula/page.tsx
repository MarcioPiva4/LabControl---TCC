import AulaForm from "@/components/Forms/AulaForm";
import Section from "@/components/Section";


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

export default async function Aula(){
    const dataMateria = await getDataMateria();
    const dataLaboratorio = await getDataLaboratorio();
    const dataProfessor = await getDataProfessor();
    return(
        <Section title="Cadastre uma aula" bottom>
            <AulaForm materias={dataMateria.data} laboratorio={dataLaboratorio.data} professor={dataProfessor.data}></AulaForm>
        </Section>
    )
}
