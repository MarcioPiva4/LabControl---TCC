import VidrariasRevisar from "@/components/Forms/AulaForm/Vidrarias/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataVidrarias() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/vidrarias');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataVidrarias = await  getDataVidrarias();
  return(
    <VidrariasRevisar id={id} vidrarias={dataVidrarias}></VidrariasRevisar>
  )
}