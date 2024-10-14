import AgenteReajenteAulaEditar from "@/components/Forms/EditarAulaForm/AgenteReajente";

async function getDataAgenteReajente() {
  const response = await fetch('lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app//api/agente-reajente', {
    cache: 'no-cache',
});
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch('lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app//api/aula', {
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
