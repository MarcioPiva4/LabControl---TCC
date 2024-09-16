
import AgenteReajenteID from "@/components/Forms/AulaForm/AgenteReajente/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

async function getDataAgenteReajente() {
    const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/agente-reajente');
    return await response.json();
}
  

export default async function Page({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataEquipamentos = await getDataAgenteReajente();
    return(
        <AgenteReajenteID id={id} agenteReajente={dataEquipamentos}></AgenteReajenteID>
    )
}
