import VidrariasAula from "@/components/Forms/AulaForm/Vidrarias";

async function getDataVidrarias() {
  const response = await fetch('http://localhost:3000/api/vidrarias');
  return await response.json();
}

export default async function Page(){
  const dataVidrarias = await getDataVidrarias();
  return(
    <VidrariasAula  vidrarias={dataVidrarias}></VidrariasAula>
  )
}