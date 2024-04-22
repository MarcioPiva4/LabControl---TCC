import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";

export default function Professor(){
    return(
        <Section title="Cadastre um professor (a)">
            <DefaultForm>
                <Input type="text" label="Nome"></Input>
                <Input type="text" label="CPF"></Input>
                <Input type="text" label="Telefone"></Input>
                <Input type="text" label="E-mail"></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}