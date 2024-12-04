import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

interface PropPageEquipamentos {
    params: {
        id: string;
        vidrariaId: string;
    }
}

const VidrariasID  = dynamic(() => import("@/components/AulaVidraria/ID"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>,
    }
);

export default async function Page({params}: PropPageEquipamentos){
    const { id, vidrariaId } = params;
    const dataVidrarias = await getDataVidrarias();
    return(
        <VidrariasID vidrarias={dataVidrarias} id={vidrariaId} idAula={id} manutencao></VidrariasID>
    )
}

async function getDataVidrarias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
        'cache': 'no-store'
      });
    return await response.json();
  }