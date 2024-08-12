/*"use client"
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import { InputBoxSelectLink } from "@/components/InputBoxSelect";
import Section from "@/components/Section";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useEffect, useState } from "react";

export default function Aula(){
    const [ids, setIds] = useState<number[]>();
    useEffect(() => {
        const idsEquipamentos = localStorage.getItem('equipamentos')
        if(idsEquipamentos){
            const idsEquipamentosFormatted = idsEquipamentos?.replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').split(',');
            setIds(idsEquipamentosFormatted?.map(e => Number(e.slice(0, 1))));
        }
    }
    , []);
    return(
        <Section title="Cadastre uma aula" bottom>
            <DefaultForm>
                <Select id="materia" options={['matematica', 'portugues', 'geografia', 'euzemar']} selectLabel="Matérias"></Select>
                <Select id="professor" selectLabel="Professor (a)" options={['Nivaldo', 'teste', 'euzemar']}></Select>
                <Select id="laboratorio" selectLabel="Laboratório" options={['01', '02', '03']}></Select>
                <InputBoxSelectLink name="Equipamentos" href={ids ? `/cadastro/aula/equipamentos/${ids.map(e => e)}` : "/cadastro/aula/equipamentos"}></InputBoxSelectLink>
                <Input type="text" label="Tópico da Aula " idInput="topicoaula"></Input>
                <Select id="horarioinicio" selectLabel="Horario de inicio" options={['19:50', '20:40', '21:30']}></Select>
                <Select id="horariotermino" selectLabel="Horario de termino" options={['19:50', '20:40', '21:30']}></Select>
                <Input type="text" label="Data de aula" idInput="dataaula"></Input>
                <TextArea labelText="Observações" id="observacoes"></TextArea>
                <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            </DefaultForm>
        </Section>
    )
}*/

import AulaForm from "@/components/Forms/AulaForm";
import Section from "@/components/Section";


export default function Aula(){
    return(
        <Section title="Cadastre uma aula" bottom>
            <AulaForm></AulaForm>
        </Section>
    )
}