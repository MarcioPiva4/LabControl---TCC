import { LoaderFormReview } from "@/components/LoaderForm";
import dynamic from "next/dynamic";


const AgenteReajenteRevisar = dynamic(
  () => import("@/components/AgenteReajente/Revisar"),
  { 
    ssr: false, 
    loading: () => <LoaderFormReview quantity={1} />
  }
);
interface PropPageRevisar {
  params: {
    id: string;
    revisar: string
  }
}

export default async function Page({ params }: PropPageRevisar){
  const { id, revisar } = params;
  const dataAgentesReajentes = await getDataAgenteReajente();
  return(
    <AgenteReajenteRevisar id={revisar} agentesReajentes={dataAgentesReajentes} baixa idAula={id}></AgenteReajenteRevisar>
  )
}

async function getDataAgenteReajente() {
  const response = await fetch('http://localhost:3000/api/agente-reajente', {
    'cache': 'no-cache'
  });
  return await response.json();
}