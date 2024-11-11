import VidrariasID from "@/components/AulaVidraria/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
        vidrariaId: string;
    }
}

export default async function Page({params}: PropPageEquipamentos){
    const { id, vidrariaId } = params;
    const dataVidrarias = await getDataVidrarias();
    return(
        <VidrariasID vidrarias={dataVidrarias} id={vidrariaId} baixa idAula={id}></VidrariasID>
    )
}

async function getDataVidrarias() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vidrarias`, {
        'cache': 'no-cache'
      });
    return await response.json();
  }