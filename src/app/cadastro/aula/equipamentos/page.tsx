import { LoaderFormSearch } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "LabControl | Cadastro Aula",
  description: "Cadastro de aulas, página de escolha de equipamento",
};

const EquipamentosAula  = dynamic(() => import("@/components/AulaEquipamento"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

export default async function Page(){
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentosAula  equipamentos={dataEquipamentos}></EquipamentosAula>
  )
}

async function getDataEquipamentos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
    cache: 'no-cache',
});
  return await response.json();
}