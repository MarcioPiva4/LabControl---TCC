
import EquipamentoID from "@/components/Forms/AulaForm/Equipamento/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

async function getDataEquipamentos() {
    const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/equipamento');
    return await response.json();
  }
  

export default async function Equipamentos({params}: PropPageEquipamentos ) {
    const { id } = params;
    const dataEquipamentos = await getDataEquipamentos();
    return(
        <EquipamentoID id={id} equipamentos={dataEquipamentos}></EquipamentoID>
    )
}
