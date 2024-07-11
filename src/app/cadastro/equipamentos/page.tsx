import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import Section from "@/components/Section";
import TextArea from "@/components/TextArea/index";

export default function Equipamentos(){
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <DefaultForm>
                <Input type="text" label="Equipamento" idInput="equipamento"></Input>
                <Input type="text" label="Tipo de Equipamento" idInput="tipoequipamento"></Input>
                <Input type="text" label="Número de Série" idInput="numeroserie"></Input>
                <Input type="text" label="Marca/Modelo" idInput="marcamodelo"></Input>
                <Input type="text" label="Quantidade" idInput="quantidade"></Input>
                <Input type="text" label="Quantos fornecedores?" idInput="qtnfornecedores"></Input>
                <Input type="text" label="Fornecedor" idInput="fornecedor"></Input>
                <Input type="text" label="Preço de Compra" idInput="precocompra"></Input>
                <Input type="text" label="Localização" idInput="localizacao"></Input>
                <TextArea labelText="Observações adicionais" id="observacoes"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}