
import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

const AgenteReajenteID  = dynamic(() => import("@/components/AgenteReajente/ID"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

export default async function Page({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataEquipamentos = await getDataAgenteReajente();
    return(
        <AgenteReajenteID id={id} agenteReajente={dataEquipamentos}></AgenteReajenteID>
    )
}


async function getDataAgenteReajente() {
    const response = await fetch('http://localhost:3000/api/agente-reajente', {
        'cache': 'no-cache'
      });
    return await response.json();
}