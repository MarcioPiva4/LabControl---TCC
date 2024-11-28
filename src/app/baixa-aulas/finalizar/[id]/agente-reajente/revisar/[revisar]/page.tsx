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
  const dataAulas = await getDataAula();
  return(
    <AgenteReajenteRevisar id={revisar} agentesReajentes={dataAgentesReajentes} baixa idAula={id} aulas={dataAulas}></AgenteReajenteRevisar>
  )
}

async function getDataAgenteReajente() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
    'cache': 'no-cache'
  });
  return await response.json();
}

async function getDataAula() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
    'cache': 'no-cache'
  });
  return await response.json();
}