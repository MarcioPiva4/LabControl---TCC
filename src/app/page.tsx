import { LoaderHeader } from "@/components/LoaderForm";
import { AulaReq } from "@/types/aula";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/Header'), { ssr: false, loading: () => <LoaderHeader></LoaderHeader> });
const Home = dynamic(() => import('@/components/LayoutPages/Home'), { ssr: false, });

export default async function Page() {
  const dataAulas = await getDataAulas() as AulaReq;
  const dataFornecedores = await getDataFornecedores();
  const dataProfessores = await getDataProfessores();
  const dataMaterias = await getDataMaterias();
  const dataAulasFinishes = await getDataAulasFinishies() as AulaReq;

  const dataLaboratorios = await getDataLaboratorios();
  const dataEquipamentos = await getDataEquipamentos();
  const dataAgentesReajentes = await getDataAgenteReajente();
  const dataVidrarias = await getDataVidrarias();

  return (
    <>
      <Header></Header>
      <main>
        <Home
          aulasLength={dataAulasFinishes.data.length}
          aulas={dataAulas}
          fornecedores={dataFornecedores}
          professores={dataProfessores}
          materias={dataMaterias}
          agentesReajentes={dataAgentesReajentes}
          equipamentos={dataEquipamentos}
          laboratorios={dataLaboratorios}
          vidrarias={dataVidrarias}
          ></Home>
      </main>
    </>
  );
}

async function getDataAulas(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
    cache: "no-store", 
  });
  return await response.json();
}

async function getDataAulasFinishies(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula/filter?status=finalizada`, {
    cache: "no-store", 
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