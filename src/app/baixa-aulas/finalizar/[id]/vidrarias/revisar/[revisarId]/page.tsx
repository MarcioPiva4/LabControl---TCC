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
  return(
    <VidrariasRevisar id={revisarId} vidrarias={dataVidrarias} idAula={id} baixa></VidrariasRevisar>
  )
}

async function getDataVidrarias() {
  const response = await fetch('http://localhost:3000/api/vidrarias', {
    'cache': 'no-cache'
  });
  return await response.json();
}
