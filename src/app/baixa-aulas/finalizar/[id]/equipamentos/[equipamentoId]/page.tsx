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
        <EquipamentoID id={equipamentoId} equipamentos={dataEquipamentos} baixa idAula={id}></EquipamentoID>
    )
}

async function getDataEquipamentos() {
    const response = await fetch('http://localhost:3000/api/equipamento', {
        'cache': 'no-cache'
      });
    return await response.json();
}