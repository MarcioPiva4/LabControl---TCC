import VidrariasAula from "@/components/Forms/AulaForm/Vidrarias";

async function getDataVidrarias() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/vidrarias');
  return await response.json();
}

export default async function Page(){
  const dataVidrarias = await getDataVidrarias();
  return(
    <VidrariasAula  vidrarias={dataVidrarias}></VidrariasAula>
  )
}