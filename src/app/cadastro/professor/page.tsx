'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";

export default function Professor(){
    const formik = useFormik({
        initialValues: {
            nome: '',
            cpf: '',
            telefone: '',
            email: ''
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    return(
        <Section title="Cadastre um professor (a)">
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome" idInput="nome" onChange={formik.handleChange} value={formik.values.nome}></Input>
                <Input type="text" label="CPF" idInput="cpf" onChange={formik.handleChange} value={formik.values.cpf}></Input>
                <Input type="text" label="Telefone" idInput="telefone" onChange={formik.handleChange} value={formik.values.telefone}></Input>
                <Input type="text" label="E-mail" idInput="email" onChange={formik.handleChange} value={formik.values.email}></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}