import VidrariasAulaEditar from "@/components/Forms/EditarAulaForm/Vidrarias";

async function getDataVidrarias() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/vidrarias', {
    cache: 'no-cache',
});
  return await response.json();
}

async function getDataAulas() {
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app//api/aula', {
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