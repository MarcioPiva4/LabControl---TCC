import { LoaderFormSearch } from "@/components/LoaderForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

export const metadata: Metadata = {
    title: "LabControl | Cadastro Aula",
    description: "Cadastro de aulas, página de escolha de equipamento",
  };

const EquipamentoID  = dynamic(() => import("@/components/AulaEquipamento/ID"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);
  
export default async function Equipamentos({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataEquipamentos = await getDataEquipamentos();
    return(
        <EquipamentoID id={id} equipamentos={dataEquipamentos}></EquipamentoID>
    )
}

async function getDataEquipamentos() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`, {
        'cache': 'no-cache'
      });
    return await response.json();
}