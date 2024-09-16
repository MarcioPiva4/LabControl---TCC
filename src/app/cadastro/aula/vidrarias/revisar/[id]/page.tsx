import VidrariasRevisar from "@/components/Forms/AulaForm/Vidrarias/Revisar";

interface PropPageRevisar {
  params: {
    id: string;
  }
}

async function getDataVidrarias() {
  const response = await fetch('http://localhost:3000/api/vidrarias');
  return await response.json();
}


export default async function Page({ params }: PropPageRevisar){
  const { id } = params;
  const dataVidrarias = await  getDataVidrarias();
  return(
    <VidrariasRevisar id={id} vidrarias={dataVidrarias}></VidrariasRevisar>
  )
}