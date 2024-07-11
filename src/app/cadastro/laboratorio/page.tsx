import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea/index";

export default function Equipamentos(){
    return(
        <Section title="Cadastre um Laboratorio" bottom>
            <DefaultForm>
                <Input type="text" label="Nome do Laboratório" idInput="nome"></Input>
                <Input type="text" label="Prédio" idInput="predio"></Input>
                <Input type="text" label="Andar" idInput="andar"></Input>
                <Input type="text" label="Bloco" idInput="bloco"></Input>
                <Input type="text" label="Sala"  idInput="sala"></Input>
                <Input type="text" label="Responsável" idInput="responsavel"></Input>
                <TextArea labelText="Descrição" id="descricao"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}