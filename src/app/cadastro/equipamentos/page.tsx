import EquipamentosForm from "@/components/Forms/EquipamentosForm";
import Section from "@/components/Section";

async function getData() {
    const response = await fetch('https://lab-control-h2e7x2ob3-marciop457s-projects.vercel.app/api/fornecedor');
    return await response.json();
}
export default async function Equipamentos(){
    const data = await getData();
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <EquipamentosForm data={data}></EquipamentosForm>
        </Section>
    )
}