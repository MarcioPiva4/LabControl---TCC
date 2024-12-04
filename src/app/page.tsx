import { LoaderHeader } from "@/components/LoaderForm";
import { AulaReq } from "@/types/aula";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
  loading: () => <LoaderHeader />,
});
const Home = dynamic(() => import("@/components/LayoutPages/Home"), {
  ssr: false,
});
const ResetPassword = dynamic(() => import("@/components/ResetPassword"), {
  ssr: false,
});

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.isFirstLogin) {
    const id = session?.user?.id ?? "";
    const role = session?.user?.role ?? "";
    return <ResetPassword id={id} role={role} />;
  }

  const dataAulas = await getDataAulas(session);
  const dataFornecedores = await getDataFornecedores();
  const dataProfessores = await getDataProfessores();
  const dataMaterias = await getDataMaterias();
  const dataAulasFinishes = await getDataAulasFinishies(session);
  const dataAulasProgress = await getDataAulasProgress(session);
  const dataLaboratorios = await getDataLaboratorios();
  const dataEquipamentos = await getDataEquipamentos();
  const dataAgentesReajentes = await getDataAgenteReajente();
  const dataVidrarias = await getDataVidrarias();
  const dataAdministradores = await getDataAdministradores();

  return (
    <>
      <Header />
      <main>
        <Home
          aulasFinishLength={dataAulasFinishes.data.length}
          aulasProgressLength={dataAulasProgress.data.length}
          aulas={dataAulas}
          fornecedores={dataFornecedores}
          materias={dataMaterias}
          agentesReajentes={dataAgentesReajentes}
          equipamentos={dataEquipamentos}
          laboratorios={dataLaboratorios}
          vidrarias={dataVidrarias}
          administradores={dataAdministradores}
          professores={dataProfessores}
        />
      </main>
    </>
  );
}

async function getDataAulas(session: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "X-User-Email": session?.user.email as string,
      "X-User-Role": session?.user.role as string,
    },
  });
  return await response.json();
}

async function getDataAdministradores() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/administrador`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataAulasFinishies(session: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aula/filter?status=finalizada`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "X-User-Email": session?.user.email as string,
        "X-User-Role": session?.user.role as string,
      },
    }
  );
  return await response.json();
}

async function getDataAulasProgress(session: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aula/filter?status=progresso`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "X-User-Email": session?.user.email as string,
        "X-User-Role": session?.user.role as string,
      },
    }
  );
  return await response.json();
}

async function getDataLaboratorios() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataVidrarias() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataEquipamentos() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataAgenteReajente() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataFornecedores() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedor`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataProfessores() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}

async function getDataMaterias() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/materia`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
