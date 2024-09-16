import EquipamentosAula from "@/components/Forms/AulaForm/Equipamento";

async function getDataEquipamentos() {
  const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/equipamento');
  return await response.json();
}

export default async function Page(){
  const dataEquipamentos = await getDataEquipamentos();
  return(
    <EquipamentosAula  equipamentos={dataEquipamentos}></EquipamentosAula>
  )
}