'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { TextArea } from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";

export default function Agente_Reagente() {
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
            alert(JSON.stringify(values))
        }
    })
    return (
        <Section title="Cadastre um Agente/Reagente" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome do agente/reagente" idInput={'nome'} value={formik.values.nome} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fórmula química" idInput={'formulaquimica'} value={formik.values.formulaquimica} onChange={formik.handleChange}></Input>
                <Input type="text" label="Peso molecular" idInput={'pesomolecular'} value={formik.values.pesomolecular} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por moleculas (g/mol)",
                            abr: "g/mol",
                            active: false,
                        },
                    ]} ></Input>
                <Input type="text" label="Número CAS (Chemical Abstracts Service)" idInput={'numerocas'} value={formik.values.numerocas} onChange={formik.handleChange}></Input>
                <Input type="text" label="Fornecedor" idInput={'fornecedor'} value={formik.values.fornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Número de catálogo do fornecedor" idInput={'numerocatalogofornecedor'} value={formik.values.numerocatalogofornecedor} onChange={formik.handleChange}></Input>
                <Input type="text" label="Data de compra"></Input>
                <Input type="text" label="Concentração" idInput={'concentracao'} value={formik.values.concentracao} onChange={formik.handleChange} selectAside
                    optionsFakeSelect={[
                        {
                            id: 1,
                            nome: "Gramas por Litro (g/L)",
                            abr: "g/l",
                            active: false,
                        },
                        {
                            id: 2,
                            nome: "Gramas por mililitro (g/mL)",
                            abr: "g/mL",
                            active: false,
                        },
                    ]}></Input>
                <Input type="text" label="Quantidade" idInput={'quantidade'} value={formik.values.quantidade} onChange={formik.handleChange} selectAside
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
                <Input type="text" label="Armazenamento recomendado" idInput={'armazenamentorecomendado'} value={formik.values.armazenamentorecomendado} onChange={formik.handleChange}></Input>
                <TextArea labelText="Descrição"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}