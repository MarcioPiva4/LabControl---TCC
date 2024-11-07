import AgenteReajenteRevisarEditar from "@/components/Forms/EditarAulaForm/AgenteReajente/Revisar";
import EquipamentoRevisarEditar from "@/components/Forms/EditarAulaForm/Equipamentos/Revisar";

interface PropPageRevisar {
  params: {
    revisarId: string;
    id: string;
  }
}

async function getDataAgenteReajente() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`);
    return await response.json();
}
  
async function getDataAulas() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`);
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
