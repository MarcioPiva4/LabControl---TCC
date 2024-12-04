import { LoaderFormReview } from "@/components/LoaderForm";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
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
    <VidrariasRevisar id={revisarId} vidrarias={dataVidrarias} idAula={id} baixa aulas={dataAulas}></VidrariasRevisar>
  )
}

async function getDataVidrarias() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
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