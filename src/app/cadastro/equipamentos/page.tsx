import EquipamentosForm from "@/components/Forms/EquipamentosForm";
import Section from "@/components/Section";

async function getData() {
    const response = await fetch('http://localhost:3000/api/fornecedor');
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