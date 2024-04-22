import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";

export default function Equipamentos(){
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <DefaultForm>
                <Input type="text" label="Equipamento"></Input>
                <Input type="text" label="Tipo de Equipamento"></Input>
                <Input type="text" label="Número de Série"></Input>
                <Input type="text" label="Marca/Modelo"></Input>
                <Input type="text" label="Quantidade"></Input>
                <Input type="text" label="Quantos fornecedores?"></Input>
                <Input type="text" label="Fornecedor"></Input>
                <Input type="text" label="Preço de Compra"></Input>
                <Input type="text" label="Localização"></Input>
                <TextArea labelText="Observações adicionais"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}