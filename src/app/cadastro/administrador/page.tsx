import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";

export default function Administrador(){
    return(
        <Section title="Cadastre um Administrador" bottom>
            <DefaultForm>
                <Input type="text" label="Nome"></Input>
                <Input type="text" label="Telefone"></Input>
                <Input type="text" label="E-mail"></Input>
                <Input type="text" label="Data de Contratação"></Input>
                <Input type="text" label="CEP"></Input>
                <Input type="text" label="Estado"></Input>
                <Input type="text" label="Cidade"></Input>
                <Input type="text" label="Rua"></Input>
                <Input type="text" label="N°"></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}