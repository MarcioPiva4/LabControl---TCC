import { LoaderAulas } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const FinalizarAulaForm = dynamic(() => import("@/components/Forms/FinalizarAulaForm"), {
  ssr: false,
  loading: () => <LoaderAulas quantity={4}></LoaderAulas>
})

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

async function getDataAulas(){
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
      cache: "no-store",
      headers: {
          "Authorization": `Bearer ${session?.token}`,
          "X-User-Email": session?.user.email as string,
          "X-User-Role": session?.user.role as string
      },
  });
  return await response.json();
}

async function getDataMateria() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/materia`,
    { cache: "no-cache" }
  );
  return await response.json();
}

async function getDataLaboratorio() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`,
    { cache: "no-cache" }
  );
  return await response.json();
}

async function getDataProfessor() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor`,
    { cache: "no-cache" }
  );
  return await response.json();
}