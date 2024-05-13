'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";

export default function Equipamentos(){
    const formik = useFormik({
        initialValues: {
            equipamento: '',
            tipoequipamento: '',
            numeroserie: '',
            marcamodelo: '',
            quantidade: '',
            qtnfornecedores: '',
            fornecedor: '',
            precocompra: '',
            localizacao: '',
            observacoes: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    return(
        <Section title="Cadastre um Equipamento" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Equipamento" idInput="equipamento" value={formik.values.equipamento} onChange={formik.handleChange}></Input>
                <Input type="text" label="Tipo de Equipamento" idInput="tipoequipamento" value={formik.values.tipoequipamento} onChange={formik.handleChange}></Input>
                <Input type="text" label="Número de Série" idInput="numeroserie" value={formik.values.numeroserie} onChange={formik.handleChange}></Input>
                <Input type="text" label="Marca/Modelo" idInput="marcamodelo" value={formik.values.marcamodelo} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantidade" idInput="quantidade" value={formik.values.quantidade} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantos fornecedores?" idInput="qtnfornecedores" value={formik.values.qtnfornecedores} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fornecedor" idInput="fornecedor" value={formik.values.fornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Preço de Compra" idInput="precocompra" value={formik.values.precocompra} onChange={formik.handleChange}></Input>
                <Input type="text" label="Localização" idInput="localizacao" value={formik.values.localizacao} onChange={formik.handleChange}></Input>
                <TextArea labelText="Observações adicionais"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}