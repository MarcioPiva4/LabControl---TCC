'use client'
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm"
import Input from "@/components/Input";

export default function FornecedorForm2(){
    return(
        <DefaultForm>
            <Input type="text" label="CEP" idInput="cep"  />
            <Input type="text" label="Estado" idInput="estado" />
            <Input type="text" label="Cidade" idInput="cidade" />
            <Input type="text" label="Bairro" idInput="bairro" />
            <Input type="text" label="Rua" idInput="rua" />
            <Input type="text" label="N°" idInput="numero" />
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
        </DefaultForm>
    )
}