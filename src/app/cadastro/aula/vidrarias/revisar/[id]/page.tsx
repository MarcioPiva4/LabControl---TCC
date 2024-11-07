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
  }
}

export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataVidrarias = await  getDataVidrarias();
  return(
    <VidrariasRevisar id={id} vidrarias={dataVidrarias}></VidrariasRevisar>
  )
}

async function getDataVidrarias() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
    'cache': 'no-cache'
  });
  return await response.json();
}
