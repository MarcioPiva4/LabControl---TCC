import VidrariasAulaEditar from "@/components/Forms/EditarAulaForm/Vidrarias";

async function getDataVidrarias() {
  const response = await fetch('http://localhost:3000/vidrarias', {
    cache: 'no-cache',
});
  return await response.json();
}

async function getDataAulas() {
    const response = await fetch('http://localhost:3000/aula', {
      cache: 'no-cache',
  });
    return await response.json();
  }
  

export default async function Page({params}: {params: any}){
    const { id } = params;
  const dataVidrarias = await getDataVidrarias();
  const dataAulas = await getDataAulas();
  return(
    <VidrariasAulaEditar vidrarias={dataVidrarias} id={id} aulas={dataAulas} ></VidrariasAulaEditar>
  )
}