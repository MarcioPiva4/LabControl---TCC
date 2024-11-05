import EquipamentosAulaEditar from "@/components/Forms/EditarAulaForm/Equipamentos";

async function getDataEquipamentos() {
  const response = await fetch('http://localhost:3000/api/equipamento', {
    cache: 'no-cache',
});
  return await response.json();
}

async function getDataAulas() {
  const response = await fetch('http://localhost:3000/api/aula', {
    cache: 'no-cache',
});
  return await response.json();
}


export default async function Page({params}: {params: any}){
  const { id } = params;
  const dataEquipamentos = await getDataEquipamentos();
  const dataAulas = await getDataAulas();
  return(
    <EquipamentosAulaEditar  equipamentos={dataEquipamentos} id={id} aulas={dataAulas}></EquipamentosAulaEditar>
  )
}
