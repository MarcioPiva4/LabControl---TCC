import { LoaderFormReview } from "@/components/LoaderForm";
import dynamic from "next/dynamic";


const VidrariasRevisar  = dynamic(() => import("@/components/AulaVidraria/Revisar"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormReview quantity={1}></LoaderFormReview>
    }
);
interface PropPageRevisar {
  params: {
    id: string;
    revisarId: string;
  }
}

export default async function Page({ params }: PropPageRevisar){
  const { id, revisarId } = params;
  const dataVidrarias = await  getDataVidrarias();
  const dataAulas = await getDataAula();
  return(
    <VidrariasRevisar id={revisarId} vidrarias={dataVidrarias} idAula={id} aulas={dataAulas} manutencao></VidrariasRevisar>
  )
}

async function getDataVidrarias() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
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