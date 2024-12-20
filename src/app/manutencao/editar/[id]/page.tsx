import { LoaderForm } from "@/components/LoaderForm";
import Section from "@/components/Section";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const EditarAulaForm = dynamic(() => import("@/components/Forms/EditarAulaForm"), {
  ssr: false,
  loading: () => <LoaderForm quantity={7} textArea></LoaderForm>
});

const BoxMessage = dynamic(() => import("@/components/BoxMessage"), {
  ssr: false,
});

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
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aula`,
    { cache: "no-store",        headers: {
      "Authorization": `Bearer ${session?.token}`,
      "X-User-Email": session?.user.email as string,
      "X-User-Role": session?.user.role as string
  },  }
  );
  return response.json();
}

async function getDataMateria() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/materia`,
    { cache: "no-store",  }
  );
  return await response.json();
}

async function getDataLaboratorio() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`,
    { cache: "no-store",  }
  );
  return await response.json();
}

async function getDataProfessor() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor`,
    { cache: "no-store",  }
  );
  return await response.json();
}