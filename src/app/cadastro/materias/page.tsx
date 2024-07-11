import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import  TextArea  from "@/components/TextArea/index";

export default function Materias(){
    return(
        <Section title="Cadastre uma matéria">
            <DefaultForm>
                <Input type="text" label="Nome da matéria" idInput="nome"></Input>
                <TextArea labelText="Emenda" id="emenda"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}