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
  return(
    <EquipamentoRevisar id={revisarId} equipamentos={dataEquipamentos} baixa idAula={id}></EquipamentoRevisar>
  )
}

async function getDataEquipamentos() {
  const response = await fetch('http://localhost:3000/api/equipamento', {
    'cache': 'no-cache'
  });
  return await response.json();
}
