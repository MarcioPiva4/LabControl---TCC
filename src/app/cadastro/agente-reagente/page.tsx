'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import TextArea from "@/Components/TextArea/index";
import { useFormik } from "formik";
import { useRef } from "react";

export default function Agente_Reagente() {
    const selectPesoMolecular = useRef<null | HTMLInputElement>(null);
    const selectConcentracao = useRef<null | HTMLInputElement>(null);
    const selectQuantidade = useRef<null | HTMLInputElement>(null);
    const formik = useFormik({
        initialValues: {
            nome: '',
            formulaquimica: '',
            pesomolecular: '',
            numerocas: '',
            fornecedor: '',
            numerocatalogofornecedor: '',
            datacompra: '',
            concentracao: '',
            quantidade: '',
            armazenamentorecomendado: '',
            descricao: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values));
            alert(selectPesoMolecular.current?.value);
            alert(selectConcentracao.current?.value);
            alert(selectQuantidade.current?.value);
        }
    })
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome do agente/reagente" idInput={'nome'} value={formik.values.nome} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fórmula química" idInput={'formulaquimica'} value={formik.values.formulaquimica} onChange={formik.handleChange}></Input>
                <Input type="text" selectRef={selectPesoMolecular} label="Peso molecular" idInput={'pesomolecular'} value={formik.values.pesomolecular} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por moleculas (g/mol)",
                            abr: "g/mol",
                            active: false,
                            value: "g/mol"
                        },
                    ]} ></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)" idInput={'numerocas'} value={formik.values.numerocas} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fornecedor" idInput={'fornecedor'} value={formik.values.fornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Número de catálogo do fornecedor" idInput={'numerocatalogofornecedor'} value={formik.values.numerocatalogofornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Data de compra"></Input>
                <Input type="text" selectRef={selectConcentracao} label="Concentração" idInput={'concentracao'} value={formik.values.concentracao} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por Litro (g/L)",
                            abr: "g/l",
                            active: false,
                            value: "g/l"
                        },
                        {
                            id: 2,
                            nome: "Gramas por mililitro (g/mL)",
                            abr: "g/mL",
                            active: false,
                            value: "g/ml",
                        },
                    ]}></Input>
                <Input type="text" selectRef={selectQuantidade} label="Quantidade" idInput={'quantidade'} value={formik.values.quantidade} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas (g)",
                            abr: "g",
                            active: false,
                            value: "g",
                        },
                        {
                            id: 2,
                            nome: "Quilogramas (Kg)",
                            abr: "Kg",
                            active: false,
                            value: "Kg",
                        },
                        {
                            id: 3,
                            nome: "Toneladas (T)",
                            abr: "T",
                            active: false,
                            value: "T",
                        },
                        {
                            id: 4,
                            nome: "Mililitros (ml)",
                            abr: "ml",
                            active: false,
                            value: "ml",
                        },
                        {
                            id: 5,
                            nome: "Litros (L)",
                            abr: "L",
                            active: false,
                            value: "L",
                        },
                        {
                            id: 6,
                            nome: "Unidade (Un)",
                            abr: "Un",
                            active: false,
                            value: "Un",
                        },
                    ]}></Input>
                <Input type="text" label="Armazenamento recomendado" idInput={'armazenamentorecomendado'} value={formik.values.armazenamentorecomendado} onChange={formik.handleChange}></Input>
                <TextArea labelText="Descrição" id="descricao" value={formik.values.descricao} onChange={formik.handleChange}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}