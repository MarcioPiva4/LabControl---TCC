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
  }
}

export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataAgentesReajentes = await getDataAgenteReajente();
  return(
    <AgenteReajenteRevisar id={id} agentesReajentes={dataAgentesReajentes}></AgenteReajenteRevisar>
  )
}

async function getDataAgenteReajente() {
  const response = await fetch('http://localhost:3000/api/agente-reajente', {
    'cache': 'no-cache'
  });
  return await response.json();
}