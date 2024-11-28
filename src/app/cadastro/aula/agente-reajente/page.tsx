import { LoaderFormSearch } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "LabControl | Cadastro Aula",
  description: "Cadastro de aulas, página de escolha de agente/reajente",
};

const AgenteReajenteAula  = dynamic(() => import("@/components/AgenteReajente"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

export default async function Page(){
  const dataAgenteReajente = await getDataAgenteReajente();
  return(
    <AgenteReajenteAula agentesReajentes={dataAgenteReajente}></AgenteReajenteAula>
  )
}

async function getDataAgenteReajente() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
    cache: 'no-cache',
});
  return await response.json();
}