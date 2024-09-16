
import VidrariasID from "@/components/Forms/AulaForm/Vidrarias/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

async function getDataVidrarias() {
    const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/vidrarias');
    return await response.json();
  }
  

export default async function Page({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataVidrarias = await getDataVidrarias();
    return(
        <VidrariasID id={id} vidrarias={dataVidrarias}></VidrariasID>
    )
}
