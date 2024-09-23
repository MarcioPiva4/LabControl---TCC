import EquipamentoRevisar from "@/components/Forms/AulaForm/Equipamento/Revisar";
import EquipamentoRevisarEditar from "@/components/Forms/EditarAulaForm/Equipamentos/Revisar";

interface PropPageRevisar {
  params: {
    revisarId: string;
    id: string;
  }
}

async function getDataEquipamentos() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/equipamento');
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app/api/aula');
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
