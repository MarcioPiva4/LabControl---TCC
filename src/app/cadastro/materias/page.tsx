import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";

export default function Materias(){
    return(
        <Section title="Cadastre uma matéria">
            <DefaultForm>
                <Input type="text" label="Nome da matéria"></Input>
                <TextArea labelText="Emenda"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}