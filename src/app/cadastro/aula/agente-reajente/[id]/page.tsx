
import { LoaderFormSearch } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Cadastro Aula",
    description: "Cadastro de aulas, página de escolha de agente/reajente",
};

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
        'cache': 'no-cache'
      });
    return await response.json();
}