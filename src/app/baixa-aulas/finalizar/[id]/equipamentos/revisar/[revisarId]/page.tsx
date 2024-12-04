import dynamic from "next/dynamic";
import { LoaderFormReview } from "@/components/LoaderForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const EquipamentoRevisar  = dynamic(() => import("@/components/AulaEquipamento/Revisar"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormReview quantity={1}></LoaderFormReview>
    }
);

interface PropPageRevisar {
  params: {
    id: string;
    revisarId: string
  }
}

export default async function Page({ params }: PropPageRevisar){
  const { id, revisarId } = params;
  const dataEquipamentos = await getDataEquipamentos();
  const dataAulas = await getDataAula();
  return(
    <EquipamentoRevisar id={revisarId} equipamentos={dataEquipamentos} baixa idAula={id} aulas={dataAulas}></EquipamentoRevisar>
  )
}

async function getDataEquipamentos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
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