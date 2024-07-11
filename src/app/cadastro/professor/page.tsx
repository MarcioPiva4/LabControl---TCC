import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";

export default function Professor(){
    return(
        <Section title="Cadastre um professor (a)">
            <DefaultForm>
                <Input type="text" label="Nome" idInput="nome"></Input>
                <Input type="text" label="CPF" idInput="cpf"></Input>
                <Input type="text" label="Telefone" idInput="telefone"></Input>
                <Input type="text" label="E-mail" idInput="email"></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}