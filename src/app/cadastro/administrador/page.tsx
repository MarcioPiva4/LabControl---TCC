'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import { useFormik } from "formik";

export default function Administrador(){
    const formik = useFormik({
        initialValues: {
            nome: '',
            telefone: '',
            email: '',
            datacontratacao: '',
            cep: '',
            estado: '',
            cidade: '',
            rua: '',
            numero: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    return(
        <Section title="Cadastre um Administrador" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome" idInput="nome" value={formik.values.nome} onChange={formik.handleChange}></Input>
                <Input type="text" label="Telefone" idInput="telefone" value={formik.values.telefone} onChange={formik.handleChange}></Input>
                <Input type="text" label="E-mail" idInput="email" value={formik.values.email} onChange={formik.handleChange}></Input>
                <Input type="text" label="Data de Contratação" idInput="datacontratacao" value={formik.values.datacontratacao} onChange={formik.handleChange}></Input>
                <Input type="text" label="CEP" idInput="cep" value={formik.values.cep} onChange={formik.handleChange}></Input>
                <Input type="text" label="Estado" idInput="estado" value={formik.values.estado} onChange={formik.handleChange}></Input>
                <Input type="text" label="Cidade" idInput="cidade" value={formik.values.cidade} onChange={formik.handleChange}></Input>
                <Input type="text" label="Rua" idInput="rua" value={formik.values.rua} onChange={formik.handleChange}></Input>
                <Input type="text" label="N°" idInput="numero" value={formik.values.numero} onChange={formik.handleChange}></Input>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}