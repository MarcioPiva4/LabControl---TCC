import BoxMessage from "@/components/BoxMessage";
import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import dynamic from "next/dynamic";

const EditarAulaForm = dynamic(() => import("@/components/Forms/EditarAulaForm"), {
  ssr: false,
  loading: () => <LoaderForm quantity={7} textArea></LoaderForm>
})

export default async function Page({ params }: { params: any }) {
  const dataAulas = await getDataAulas();
  const dataMateria = await getDataMateria();
  const dataLaboratorio = await getDataLaboratorio();
  const dataProfessor = await getDataProfessor();
  const { id } = params;
  const aulasFiltered = dataAulas.data.filter((e: any) => e.id == id);
  return aulasFiltered.map((e: any) =>
    e.status == "in progress" ? (
      <Section key={e.id} title="Algo de errado com a sua aula?" bottom>
        <EditarAulaForm
          aulas={dataAulas}
          id={id}
          materias={dataMateria}
          laboratorio={dataLaboratorio}
          professor={dataProfessor}></EditarAulaForm>
      </Section>
    ) : (
      <BoxMessage
        key={e.id}
        message="Você não pode editar!"
        submessage="Esta aula já foi finalizada!"></BoxMessage>
    )
  );
}

async function getDataAulas() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aula`,
    { cache: "no-cache" }
  );
  return response.json();
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