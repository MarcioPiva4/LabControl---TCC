import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import EquipamentosForm from "@/components/Forms/EquipamentosForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea/index";

async function getData() {
    const response = await fetch('https://lab-control-tcc-git-devlopment-marciop457s-projects.vercel.app/api/fornecedor');
    if(response.ok){
        return await response.json();
    } else {
        return console.error("ocorreu um erro");
    }
}

export default async function Equipamentos(){
    const data = await getData();
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <EquipamentosForm data={data}></EquipamentosForm>
        </Section>
    )
}