import { LoaderFormReview } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "LabControl | Cadastro Aula",
  description: "Cadastro de aulas, página de confirmação de agente/reajente",
};

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
    'cache': 'no-cache'
  });
  return await response.json();
}