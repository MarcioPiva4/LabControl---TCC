import FinalizarAulaForm from "@/components/Forms/FinalizarAulaForm";
import Section from "@/components/Section";

async function getDataAulas(){
    const response = await fetch('http://localhost:3000/api/aula',
        { cache: "no-cache" });
    return response.json();
}

async function getDataMateria() {
    const response = await fetch(
      "http://localhost:3000/api/materia",
      { cache: "no-cache" }
    );
    return await response.json();
  }
  
  async function getDataLaboratorio() {
    const response = await fetch(
      "http://localhost:3000//api/laboratorio",
      { cache: "no-cache" }
    );
    return await response.json();
  }
  
  async function getDataProfessor() {
    const response = await fetch(
      "http://localhost:3000//api/professor",
      { cache: "no-cache" }
    );
    return await response.json();
  }

export default async function Page({ params }: {params: any}){
    const dataAulas = await getDataAulas();
    const dataProfessores = await getDataProfessor();
    const dataLaboratorios = await getDataLaboratorio();
    const dataMaterias = await getDataMateria();
    const { id } = params;
    return(
        <Section title="Finalizar aula" bottom>
            <FinalizarAulaForm aulas={dataAulas} id={id} laboratorio={dataLaboratorios} materias={dataMaterias} professor={dataProfessores}></FinalizarAulaForm>
        </Section>
    )
}