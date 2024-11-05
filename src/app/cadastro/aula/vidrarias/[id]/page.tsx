import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

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
    const response = await fetch('http://localhost:3000//api/vidrarias', {
        'cache': 'no-cache'
      });
    return await response.json();
  }