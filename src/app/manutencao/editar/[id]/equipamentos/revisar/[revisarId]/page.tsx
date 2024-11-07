import EquipamentoRevisarEditar from "@/components/Forms/EditarAulaForm/Equipamentos/Revisar";

interface PropPageRevisar {
  params: {
    revisarId: string;
    id: string;
  }
}

async function getDataEquipamentos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamento`);
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`);
  return await response.json();
}



export default async function Page({ params }: PropPageRevisar){
  const { revisarId, id } = params;
  const dataEquipamentos = await getDataEquipamentos();
  const dataAulas = await getDataAulas();
  return(
    <EquipamentoRevisarEditar idEquipamentos={revisarId} idAula={id} equipamentos={dataEquipamentos} aulas={dataAulas}></EquipamentoRevisarEditar>
  )
}
