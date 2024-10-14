import AgenteReajenteAula from "@/components/Forms/AulaForm/AgenteReajente";

async function getDataAgenteReajente() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/agente-reajente', {
    cache: 'no-cache',
});
  return await response.json();
}

export default async function Page(){
  const dataAgenteReajente = await getDataAgenteReajente();
  return(
    <AgenteReajenteAula  agentesReajentes={dataAgenteReajente}></AgenteReajenteAula>
  )
}