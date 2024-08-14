'use client';
import Input from "@/components/Input";;
import { useEffect, useState } from "react";
import TextArea from "@/components/TextArea";
import DefaultForm from "@/components/DefaultForm";
import ErrorMessage from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import Button from "@/components/Button";
import MenuSubmit from "@/components/MenuSubmit";
import Select from "@/components/Select";
import { InputBoxSelectLink } from "@/components/InputBoxSelect";

const AulaForm = () => {
    const [ids, setIds] = useState<number[]>();
    useEffect(() => {
        const idsEquipamentos = localStorage.getItem('equipamentos')
        if(idsEquipamentos){
            const idsEquipamentosFormatted = idsEquipamentos?.replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').split(',');
            setIds(idsEquipamentosFormatted?.map(e => Number(e.slice(0, 1))));
        }
        }
    , []);
    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmiting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/aula', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (response.ok) {
                setSucess(true);
                setError({error: false, message: ''});
            } else {
                setError({error: true, message: responseJson.message})
            }
        } catch (error) {
            setError({error: true, message: 'Erro ao fazer a requisição, tente novamente.'})
        } finally {
            setSubmiting(null);
        }
    };
    return (
        <DefaultForm onSubmit={handleSubmit}>
            {error.error && <ErrorMessage text={error.message}></ErrorMessage>}
            <Select id="materia" options={[{name: '', id: ''}, {name: 'matematica', id: '1'}, {name: 'portugues', id: '2'}, {name: 'geografia', id: '3'}, {name: 'euzemar', id: '4'}]} selectLabel="Matérias"></Select>
            <Select id="professor" selectLabel="Professor (a)" options={[{name: '', id: ''},{name: 'matematica', id: '1'}, {name: 'portugues', id: '2'}, {name: 'geografia', id: '3'}, {name: 'euzemar', id: '4'}]}></Select>
            <Select id="laboratorio" selectLabel="Laboratório" options={[{name: '', id: ''},{name: 'matematica', id: '1'}, {name: 'portugues', id: '2'}, {name: 'geografia', id: '3'}, {name: 'euzemar', id: '4'}]}></Select>
            <InputBoxSelectLink name="Equipamentos" href={ids ? `/cadastro/aula/equipamentos/${ids.map(e => e)}` : "/cadastro/aula/equipamentos"}></InputBoxSelectLink>
            <Input type="text" label="Tópico da Aula" idInput="topico_aula"></Input>
            <Input type="time" label="Horário de inicio" idInput="horario_inicio"></Input>
            <Input type="time" label="Horário de finalização" idInput="horario_finalizacao"></Input>
            <Input type="date" label="Data de aula" idInput="data"></Input>
            <TextArea labelText="Observações" id="observacoes" length></TextArea>
            {submiting ? <Loader></Loader> : null}
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
        </DefaultForm>
    );
};

export default AulaForm;
