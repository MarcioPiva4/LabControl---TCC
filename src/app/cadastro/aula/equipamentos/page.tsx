import EquipamentosAula from "@/components/Forms/AulaForm/Equipamento";

async function getDataEquipamentos() {
  const response = await fetch('http://localhost:3000/api/equipamento');
  return await response.json();
}

export default async function Page(){
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentosAula  equipamentos={dataEquipamentos}></EquipamentosAula>
  )
}