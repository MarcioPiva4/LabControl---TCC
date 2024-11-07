import VidrariasAulaEditar from "@/components/Forms/EditarAulaForm/Vidrarias";

async function getDataVidrarias() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
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
  const dataVidrarias = await getDataVidrarias();
  const dataAulas = await getDataAulas();
  return(
    <VidrariasAulaEditar vidrarias={dataVidrarias} id={id} aulas={dataAulas} ></VidrariasAulaEditar>
  )
}