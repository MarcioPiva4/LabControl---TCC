import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

interface PropPageEquipamentos {
    params: {
        id: string;
        equipamentoId: string
    }
}

const EquipamentoID  = dynamic(() => import("@/components/AulaEquipamento/ID"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);
  
export default async function Page({params}: PropPageEquipamentos ) {
    const { id, equipamentoId } = params;
    const dataEquipamentos = await getDataEquipamentos();
    return(
        <EquipamentoID id={equipamentoId} equipamentos={dataEquipamentos} idAula={id} manutencao></EquipamentoID>
    )
}

async function getDataEquipamentos() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
        'cache': 'no-cache'
      });
    return await response.json();
}