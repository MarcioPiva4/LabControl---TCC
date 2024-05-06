import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";

export default function Professor(){
    return(
        <Section title="Informe a localização">
            <DefaultForm>
                <Input type="text" label="CEP"></Input>
                <Input type="text" label="Estado"></Input>
                <Input type="text" label="Cidade"></Input>
                <Input type="text" label="Bairro"></Input>
                <Input type="text" label="Rua"></Input>
                <Input type="text" label="N°"></Input>
                <Button type="submit" is="isNotTransparent" bottom>Cadastrar</Button>
            </DefaultForm>
        </Section>
    )
}