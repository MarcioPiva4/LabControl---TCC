import dynamic from "next/dynamic";
import Section from "@/components/Section";
import { LoaderForm } from "@/components/LoaderForm";

const AulaForm  = dynamic(() => import("@/components/Forms/AulaForm"), 
    { 
        ssr: false, 
        loading: () => <LoaderForm quantity={10} textArea></LoaderForm>
    }
);

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

async function getDataMateria() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materia`, {
        cache: 'no-cache',
    });
    return await response.json();
}

async function getDataLaboratorio() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`, {
        cache: 'no-cache',
    });
    return await response.json();
}

async function getDataProfessor() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professor`, {
        cache: 'no-cache',
    });
    return await response.json();
}
