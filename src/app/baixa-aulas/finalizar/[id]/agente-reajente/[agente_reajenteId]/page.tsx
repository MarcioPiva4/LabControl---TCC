
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
        agente_reajenteId: string;
    }
}

export default async function Page({params}: PropPageEquipamentos ) {
    const { id , agente_reajenteId} = params;
    const dataEquipamentos = await getDataAgenteReajente();
    return(
        <AgenteReajenteID id={agente_reajenteId} agenteReajente={dataEquipamentos} baixa idAula={id}></AgenteReajenteID>
    )
}


async function getDataAgenteReajente() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
        'cache': 'no-cache'
      });
    return await response.json();
}