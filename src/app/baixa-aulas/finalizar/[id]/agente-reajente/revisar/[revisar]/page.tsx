import { LoaderFormReview } from "@/components/LoaderForm";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
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

async function getDataAula(){
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