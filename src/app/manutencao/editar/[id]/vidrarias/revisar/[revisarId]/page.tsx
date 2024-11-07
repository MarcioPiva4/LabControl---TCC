import EquipamentoRevisarEditar from "@/components/Forms/EditarAulaForm/Equipamentos/Revisar";
import VidrariasRevisarEditar from "@/components/Forms/EditarAulaForm/Vidrarias/Revisar";

interface PropPageRevisar {
  params: {
    revisarId: string;
    id: string;
  }
}

async function getDataVidrarias() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`);
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`);
  return await response.json();
}



export default async function Page({ params }: PropPageRevisar){
  const { revisarId, id } = params;
  const dataVidrarias = await getDataVidrarias();
  const dataAulas = await getDataAulas();
  return(
    <VidrariasRevisarEditar idVidrarias={revisarId} idAula={id} vidrarias={dataVidrarias} aulas={dataAulas}></VidrariasRevisarEditar>
  )
}
