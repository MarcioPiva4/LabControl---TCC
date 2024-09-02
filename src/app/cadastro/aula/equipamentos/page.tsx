import EquipamentosAula from "@/components/Forms/AulaForm/Equipamento";

async function getDataEquipamentos() {
  const response = await fetch('https://lab-control-4j8ipswkd-marciop457s-projects.vercel.app/api/equipamento');
  return await response.json();
}

export default async function Page(){
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentosAula  equipamentos={dataEquipamentos}></EquipamentosAula>
  )
}