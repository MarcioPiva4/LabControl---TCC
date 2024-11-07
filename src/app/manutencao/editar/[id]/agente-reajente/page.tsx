import AgenteReajenteAulaEditar from "@/components/Forms/EditarAulaForm/AgenteReajente";

async function getDataAgenteReajente() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agente-reajente`, {
    cache: 'no-cache',
});
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
    cache: 'no-cache',
});
  return await response.json();
}


export default async function Page({params}: {params: any}){
  const { id } = params;
  const dataAgenteReajentes = await getDataAgenteReajente();
  const dataAulas = await getDataAulas();
  return(
    <AgenteReajenteAulaEditar  agenteReajente={dataAgenteReajentes} id={id} aulas={dataAulas}></AgenteReajenteAulaEditar>
  )
}
