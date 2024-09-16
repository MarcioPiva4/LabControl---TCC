import AgenteReajenteRevisar from "@/components/Forms/AulaForm/AgenteReajente/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataAgenteReajente() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/agente-reajente');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataAgentesReajentes = await getDataAgenteReajente();
  return(
    <AgenteReajenteRevisar id={id} agentesReajentes={dataAgentesReajentes}></AgenteReajenteRevisar>
  )
}