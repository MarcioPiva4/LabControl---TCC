"use client"
import Button from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import { InputBoxSelectLink } from "@/Components/InputBoxSelect";
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

    const idsEquipamentos = localStorage.getItem('equipamentos');
    const idsEquipamentosFormatted = idsEquipamentos?.replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').split(',');
    const idsArrayNumber = idsEquipamentosFormatted?.map(e => Number(e.slice(0, 1)));
    return(
        <Section title="Cadastre uma aula" bottom>
            <DefaultForm handleSubmit={formik.handleSubmit}>
                <Select id="materia" options={['matematica', 'portugues', 'geografia', 'euzemar']} selectLabel="Matérias" onChange={formik.handleChange} value={formik.values.materia}></Select>
                <Select id="professor" selectLabel="Professor (a)" onChange={formik.handleChange} value={formik.values.professor} options={['Nivaldo', 'teste', 'euzemar']}></Select>
                <Select id="laboratorio" selectLabel="Laboratório" onChange={formik.handleChange} value={formik.values.laboratorio} options={['01', '02', '03']}></Select>
                <InputBoxSelectLink name="Equipamentos" href={idsArrayNumber ? `/cadastro/aula/equipamentos/${idsArrayNumber.map(e => e)}` : "/cadastro/aula/equipamentos"}></InputBoxSelectLink>
                <Input type="text" label="Tópico da Aula " idInput="topicoaula" onChange={formik.handleChange} value={formik.values.topicoaula}></Input>
                <Select id="horarioinicio" selectLabel="Horario de inicio" onChange={formik.handleChange} value={formik.values.horarioinicio} options={['19:50', '20:40', '21:30']}></Select>
                <Select id="horariotermino" selectLabel="Horario de termino" onChange={formik.handleChange} value={formik.values.horariotermino} options={['19:50', '20:40', '21:30']}></Select>
                <Input type="text" label="Data de aula" idInput="dataaula" onChange={formik.handleChange} value={formik.values.dataaula}></Input>
                <TextArea labelText="Observações" id="observacoes" onChange={formik.handleChange} value={formik.values.observacoes}></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}