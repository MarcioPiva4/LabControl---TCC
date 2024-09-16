import AgenteReajenteAula from "@/components/Forms/AulaForm/AgenteReajente";

async function getDataAgenteReajente() {
  const response = await fetch('http://localhost:3000/api/agente-reajente');
  return await response.json();
}

export default async function Page(){
  const dataAgenteReajente = await getDataAgenteReajente();
  return(
    <AgenteReajenteAula  agentesReajentes={dataAgenteReajente}></AgenteReajenteAula>
  )
}