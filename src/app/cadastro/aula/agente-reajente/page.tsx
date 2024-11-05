import AgenteReajente from "@/components/AgenteReajente";
import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

const AgenteReajenteAula  = dynamic(() => import("@/components/AgenteReajente"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

export default async function Page(){
  const dataAgenteReajente = await getDataAgenteReajente();
  return(
    <AgenteReajente agentesReajentes={dataAgenteReajente}></AgenteReajente>
  )
}

async function getDataAgenteReajente() {
  const response = await fetch('http://localhost:3000/api/agente-reajente', {
    cache: 'no-cache',
});
  return await response.json();
}