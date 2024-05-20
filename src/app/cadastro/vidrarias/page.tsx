'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import TextArea from "@/Components/TextArea/index";
import { useFormik } from "formik";
import { useRef } from "react";

export default function Equipamentos(){
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
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
            alert(selectQuantidade.current?.value);
        }
    })
    return(
        <Section title="Cadastre uma Vidraria" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Vidraria" idInput="vidrarias" value={formik.values.vidrarias} onChange={formik.handleChange}></Input>
                <Input type="text" label="Tipo de Vidraria" idInput="tipovidraria" value={formik.values.tipovidraria} onChange={formik.handleChange}></Input>
                <Input type="text" selectRef={selectQuantidade} label="Capacidade" idInput="capacidade" value={formik.values.capacidade} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: false,
                            value: "g"
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                            value: "Kg"
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                            value: "T"
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                            value: "ml"
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                            value: "L"
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                            value: "Un"
                        },
                    ]}></Input>
                <Input type="text" label="Material" idInput="material" value={formik.values.material} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantidade" idInput="quantidade" value={formik.values.quantidade} onChange={formik.handleChange}></Input>
                <Input type="text" label="Quantos fornecedores?" idInput="qtsfornecedores" value={formik.values.qtsfornecedores} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fornecedor" idInput="fornecedor" value={formik.values.fornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Preço de Compra" idInput="precocompra" value={formik.values.precocompra} onChange={formik.handleChange}></Input>
                <Input type="text" label="Localização" idInput="localizacao" value={formik.values.localizacao} onChange={formik.handleChange}></Input>
                <TextArea labelText="Observações adicionais" id="observacoes" value={formik.values.observacoes} onChange={formik.handleChange}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}