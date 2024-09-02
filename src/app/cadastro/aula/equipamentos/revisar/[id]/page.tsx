import EquipamentoRevisar from "@/components/Forms/AulaForm/Equipamento/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataEquipamentos() {
  const response = await fetch('https://lab-control-4j8ipswkd-marciop457s-projects.vercel.app/api/equipamento');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentoRevisar id={id} equipamentos={dataEquipamentos}></EquipamentoRevisar>
  )
}