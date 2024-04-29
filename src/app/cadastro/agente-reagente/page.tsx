import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";

export default function Agente_Reagente(){
    return(
        <Section title="Cadastre um Agente/Reagente" bottom>
            <DefaultForm>
                <Input type="text" label="Nome do agente/reagente"></Input>
                <Input type="text" label="Fórmula química"></Input>
                <Input type="text" label="Peso molecular" selectAside="variant1"></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)"></Input>
                <Input type="text" label="Fornecedor"></Input>
                <Input type="text" label="Número de catálogo do fornecedor"></Input>
                <Input type="text" label="Data de compra"></Input>
                <Input type="text" label="Concentração" selectAside="variant2"></Input>
                <Input type="text" label="Quantidade"></Input>
                <Input type="text" label="Armazenamento recomendado"></Input>
                <TextArea labelText="Descrição"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}