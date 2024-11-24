import dynamic from "next/dynamic";
import { LoaderFormReview } from "@/components/LoaderForm";

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

async function getDataAula() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
    'cache': 'no-cache'
  });
  return await response.json();
}