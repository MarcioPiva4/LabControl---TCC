import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";

export default function Professor(){
    return(
        <Section title="Cadastre um fornecedor">
            <DefaultForm>
                <Input type="text" label="Nome"></Input>
                <Input type="text" label="CNPJ"></Input>
                <Input type="text" label="Telefone"></Input>
                <Input type="text" label="E-mail"></Input>
                <Button type="link" is="isNotTransparent">Proximo</Button>
            </DefaultForm>
        </Section>
    )
}