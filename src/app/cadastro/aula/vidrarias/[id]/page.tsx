import { LoaderFormSearch } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Aula",
    description: "Cadastro de aulas, página de escolha da vidraria",
  };

const VidrariasID  = dynamic(() => import("@/components/AulaVidraria/ID"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>,
    }
);

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

export default async function Page({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataVidrarias = await getDataVidrarias();
    return(
        <VidrariasID id={id} vidrarias={dataVidrarias}></VidrariasID>
    )
}

async function getDataVidrarias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
        'cache': 'no-cache'
      });
    return await response.json();
  }