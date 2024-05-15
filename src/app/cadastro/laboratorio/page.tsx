'use client'
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import TextArea from "@/Components/TextArea/index";
import { useFormik } from "formik";

export default function Equipamentos(){
    const formik = useFormik({
        initialValues: {
            nome: '',
            predio: '',
            andar: '',
            bloco: '',
            sala: '',
            responsavel: '',
            descricao: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    return(
        <Section title="Cadastre um Laboratorio" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Input type="text" label="Nome do Laboratório" idInput="nome" onChange={formik.handleChange} value={formik.values.nome}></Input>
                <Input type="text" label="Prédio" idInput="predio" onChange={formik.handleChange} value={formik.values.predio}></Input>
                <Input type="text" label="Andar" idInput="andar" onChange={formik.handleChange} value={formik.values.andar}></Input>
                <Input type="text" label="Bloco" idInput="bloco" onChange={formik.handleChange} value={formik.values.bloco}></Input>
                <Input type="text" label="Sala"  idInput="sala" onChange={formik.handleChange} value={formik.values.sala}></Input>
                <Input type="text" label="Responsável" idInput="responsavel" onChange={formik.handleChange} value={formik.values.responsavel}></Input>
                <TextArea labelText="Descrição" id="descricao" value={formik.values.descricao} onChange={formik.handleChange}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}