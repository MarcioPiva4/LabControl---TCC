import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";

export default function Administrador(){
    return(
        <Section title="Cadastre um Administrador" bottom>
            <DefaultForm>
                <Input type="text" label="Nome" idInput="nome"></Input>
                <Input type="text" label="Telefone" idInput="telefone"></Input>
                <Input type="text" label="E-mail" idInput="email" ></Input>
                <Input type="text" label="Data de Contratação" idInput="datacontratacao"></Input>
                <Input type="text" label="CEP" idInput="cep"></Input>
                <Input type="text" label="Estado" idInput="estado"></Input>
                <Input type="text" label="Cidade" idInput="cidade"></Input>
                <Input type="text" label="Rua" idInput="rua"></Input>
                <Input type="text" label="N°" idInput="numero"></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}