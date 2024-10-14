import EquipamentoRevisar from "@/components/Forms/AulaForm/Equipamento/Revisar";
import AgenteReajenteRevisarEditar from "@/components/Forms/EditarAulaForm/AgenteReajente/Revisar";
import EquipamentoRevisarEditar from "@/components/Forms/EditarAulaForm/Equipamentos/Revisar";

interface PropPageRevisar {
  params: {
    revisarId: string;
    id: string;
  }
}

async function getDataAgenteReajente() {
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app///api/agente-reajente');
    return await response.json();
}
  
async function getDataAulas() {
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app///api/aula');
    return await response.json();
}



export default async function Page({ params }: PropPageRevisar){
  const { revisarId, id } = params;
  const dataAgentesReajentes = await getDataAgenteReajente();
  const dataAulas = await getDataAulas();
  return(
    <AgenteReajenteRevisarEditar idAgenteReajente={revisarId} idAula={id} agentesReajentes={dataAgentesReajentes} aulas={dataAulas}></AgenteReajenteRevisarEditar>
  )
}
