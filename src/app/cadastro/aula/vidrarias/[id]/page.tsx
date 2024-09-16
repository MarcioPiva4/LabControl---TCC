
import VidrariasID from "@/components/Forms/AulaForm/Vidrarias/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

async function getDataVidrarias() {
    const response = await fetch('http://localhost:3000/api/vidrarias');
    return await response.json();
  }
  

export default async function Page({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataVidrarias = await getDataVidrarias();
    return(
        <VidrariasID id={id} vidrarias={dataVidrarias}></VidrariasID>
    )
}
