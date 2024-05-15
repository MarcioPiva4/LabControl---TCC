'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import  TextArea  from "@/Components/TextArea/index";
import { useFormik } from "formik";

export default function Materias(){
    const formik = useFormik({
        initialValues: {
            nome: '',
            emenda: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values));
        }
    })
    return(
        <Section title="Cadastre uma matéria">
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome da matéria" idInput="nome" onChange={formik.handleChange} value={formik.values.nome}></Input>
                <TextArea labelText="Emenda" id="emenda" value={formik.values.emenda} onChange={formik.handleChange}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}