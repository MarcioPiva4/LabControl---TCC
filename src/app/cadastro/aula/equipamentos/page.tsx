import { LoaderFormSearch } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

const EquipamentosAula  = dynamic(() => import("@/components/AulaEquipamento"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

export default async function Page(){
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentosAula  equipamentos={dataEquipamentos}></EquipamentosAula>
  )
}

async function getDataEquipamentos() {
  const response = await fetch('http://localhost:3000/api/equipamento', {
    cache: 'no-cache',
});
  return await response.json();
}