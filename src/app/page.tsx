import { LoaderHeader } from "@/components/LoaderForm";
import { AulaReq } from "@/types/aula";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/Header'), { ssr: false, loading: () => <LoaderHeader></LoaderHeader> });
const Home = dynamic(() => import('@/components/LayoutPages/Home'), { ssr: false, });

export default async function Page() {
  const session = await getServerSession(authOptions);
  const dataAulas = await getDataAulas() as AulaReq;
  const dataFornecedores = await getDataFornecedores();
  const dataProfessores = await getDataProfessores();
  const dataMaterias = await getDataMaterias();
  const dataAulasFinishes = await getDataAulasFinishies() as AulaReq;
  const dataAulasProgress = await getDataAulasProgress() as AulaReq;
  const dataLaboratorios = await getDataLaboratorios();
  const dataEquipamentos = await getDataEquipamentos();
  const dataAgentesReajentes = await getDataAgenteReajente();
  const dataVidrarias = await getDataVidrarias();
  const dataAdministradores = await getDataAdministradores();

  return (
    <>
      <Header></Header>
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
          ></Home>
      </main>
    </>
  );
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

async function getDataAdministradores(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/administrador`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataAulasFinishies(){
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula/filter?status=finalizada`, {
    cache: "no-store", 
    headers: {
      "Authorization": `Bearer ${session?.token}`,
      "X-User-Email": session?.user.email as string,
      "X-User-Role": session?.user.role as string
    },
  });
  return await response.json();
}

async function getDataAulasProgress(){
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula/filter?status=progresso`, {
    cache: "no-store", 
    headers: {
      "Authorization": `Bearer ${session?.token}`,
      "X-User-Email": session?.user.email as string,
      "X-User-Role": session?.user.role as string
    },
  });
  return await response.json();
}

async function getDataLaboratorios(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/laboratorio`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataVidrarias(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataEquipamentos(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataAgenteReajente(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataFornecedores(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedor`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataProfessores(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professor`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataMaterias(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materia`, {
    cache: "no-store", 
  });
  return await response.json();
}
