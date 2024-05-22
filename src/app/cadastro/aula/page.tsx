"use client"
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import Section from "@/Components/Section";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useFormik } from "formik";

export default function Aula(){
    const formik = useFormik({
        initialValues: {
            materia: '',
            professor: '',
            laboratorio: '',
            topicoaula: '',
            horarioinicio: '',
            horariotermino: '',
            dataaula: '',
            observacoes: '',
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    return(
        <Section title="Cadastre uma aula" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Select id="materia" options={['matematica', 'portugues', 'geografia', 'euzemar']} selectLabel="Matérias"></Select>
                <Input type="text" label="Professor (a)" idInput="professor" onChange={formik.handleChange} value={formik.values.professor}></Input>
                <Input type="text" label="Laboratorio" idInput="laboratorio" onChange={formik.handleChange} value={formik.values.laboratorio}></Input>
                <Input type="text" label="Tópico da Aula " idInput="topicoaula" onChange={formik.handleChange} value={formik.values.topicoaula}></Input>
                <Input type="text" label="Horario de inicio " idInput="horarioinicio" onChange={formik.handleChange} value={formik.values.horarioinicio}></Input>
                <Input type="text" label="Horario de termino" idInput="horariotermino" onChange={formik.handleChange} value={formik.values.horariotermino}></Input>
                <Input type="text" label="Data de aula" idInput="dataaula" onChange={formik.handleChange} value={formik.values.dataaula}></Input>
                <TextArea labelText="Observações" id="observacoes" onChange={formik.handleChange} value={formik.values.observacoes}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}