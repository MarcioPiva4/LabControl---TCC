import EquipamentoRevisar from "@/components/Forms/AulaForm/Equipamento/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataEquipamentos() {
  const response = await fetch('http://localhost:3000/api/equipamento');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentoRevisar id={id} equipamentos={dataEquipamentos}></EquipamentoRevisar>
  )
}