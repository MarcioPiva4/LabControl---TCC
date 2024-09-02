
import EquipamentoID from "@/components/Forms/AulaForm/Equipamento/ID";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

export default function Equipamentos({params}: PropPageEquipamentos ) {
    const { id } = params;
    <EquipamentoID id={id}></EquipamentoID>
}
