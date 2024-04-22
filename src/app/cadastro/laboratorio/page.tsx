import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";

export default function Equipamentos(){
    return(
        <Section title="Cadastre um Laboratorio" bottom>
            <DefaultForm>
                <Input type="text" label="Nome do Laboratório"></Input>
                <Input type="text" label="Prédio"></Input>
                <Input type="text" label="Andar"></Input>
                <Input type="text" label="Bloco"></Input>
                <Input type="text" label="Sala"></Input>
                <Input type="text" label="Responsável"></Input>
                <TextArea labelText="Descrição"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}