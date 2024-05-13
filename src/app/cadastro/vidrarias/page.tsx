'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";

export default function Equipamentos(){
    const formik = useFormik({
        initialValues: {
            vidrarias: '',
            tipovidraria: '',
            capacidade: '',
            material: '',
            quantidade: '',
            qtsfornecedores: '',
            fornecedor: '',
            precocompra: '',
            localizacao: '',
            observacoes: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values));
        }
    })
    return(
        <Section title="Cadastre uma Vidraria" bottom children>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Vidraria" idInput="vidrarias" value={formik.values.vidrarias} onChange={formik.handleChange}></Input>
                <Input type="text" label="Tipo de Vidraria" idInput="tipovidraria" value={formik.values.tipovidraria} onChange={formik.handleChange}></Input>
                <Input type="text" label="Capacidade" idInput="capacidade" value={formik.values.capacidade} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: false,
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                        },
                    ]}></Input>
                <Input type="text" label="Material" idInput="material" value={formik.values.material} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantidade" idInput="quantidade" value={formik.values.quantidade} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantos fornecedores?" idInput="qtsfornecedores" value={formik.values.qtsfornecedores} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fornecedor" idInput="fornecedor" value={formik.values.fornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Preço de Compra" idInput="precocompra" value={formik.values.precocompra} onChange={formik.handleChange}></Input>
                <Input type="text" label="Localização" idInput="localizacao" value={formik.values.localizacao} onChange={formik.handleChange}></Input>
                <TextArea labelText="Observações adicionais"></TextArea>
                <Button type="submit" is="isNotTransparent" children>CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}