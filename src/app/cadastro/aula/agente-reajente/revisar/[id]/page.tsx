import AgenteReajenteRevisar from "@/components/Forms/AulaForm/AgenteReajente/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataAgenteReajente() {
  const response = await fetch('http://localhost:3000/api/agente-reajente');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataAgentesReajentes = await getDataAgenteReajente();
  return(
    <AgenteReajenteRevisar id={id} agentesReajentes={dataAgentesReajentes}></AgenteReajenteRevisar>
  )
}