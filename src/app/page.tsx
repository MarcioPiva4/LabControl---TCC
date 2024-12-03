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
  return (
    <>
      <Header></Header>
      <main>  
        <Home aulas={dataAulas} fornecedores={dataFornecedores} professores={dataProfessores} materias={dataMaterias}></Home>
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