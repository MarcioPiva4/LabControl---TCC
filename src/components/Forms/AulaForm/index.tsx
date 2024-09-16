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

const AulaForm = ({materias, professor, laboratorio}: {materias: any; professor: any; laboratorio: any}) => {
    const [idsEquipamentos, setIdsEquipamentos] = useState<number[]>();
    const [idsVidrarias, setIdsVidrarias] = useState<number[]>();
    const [idsAgenteReajente, setIdsAgenteReajente] = useState<number[]>();
    useEffect(() => {
        const idEquipamentos = localStorage.getItem('equipamentosAula');
        const idVidrarias = localStorage.getItem('vidrariasAula');
        const idAgenteReajente = localStorage.getItem('agenteReajenteAula');
        if(idEquipamentos){
            setIdsEquipamentos(JSON.parse(idEquipamentos));
        }

        if(idVidrarias){
            setIdsVidrarias(JSON.parse(idVidrarias));
        }

        if(idAgenteReajente){
            setIdsAgenteReajente(JSON.parse(idAgenteReajente));
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
        const dataForm = Object.fromEntries(formData.entries());
        const equipamentos = localStorage.getItem('equipamentosAula');
        const parsedEquipamentos = equipamentos ? JSON.parse(equipamentos) : null;
        const vidrarias = localStorage.getItem('vidrariasAula');
        const parsedVidrarias = vidrarias ? JSON.parse(vidrarias) : null;
        const agenteReajente = localStorage.getItem('agenteReajenteAula');
        const parsedAgenteReajente = agenteReajente ? JSON.parse(agenteReajente) : null;
        const data = {
            aula: dataForm,
            equipamentos: parsedEquipamentos,
            vidrarias: parsedVidrarias,
            agenteReajente: parsedAgenteReajente
        }
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
                localStorage.removeItem('equipamentosAula')
                localStorage.removeItem('vidrariasAula')
                localStorage.removeItem('agenteReajenteAula')
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
            <Select id="id_materia" options={materias} selectLabel="Matérias"></Select>
            <Select id="id_professor" selectLabel="Professor (a)" options={professor}></Select>
            <Select id="id_laboratorio" selectLabel="Laboratório" options={laboratorio}></Select>
            <InputBoxSelectLink name="Equipamentos" href={idsEquipamentos ? `/cadastro/aula/equipamentos/${idsEquipamentos.map((e: any) => e.id_equipamento)}` : "/cadastro/aula/equipamentos"}></InputBoxSelectLink>
            <InputBoxSelectLink name="Vidrarias" href={idsVidrarias ? `/cadastro/aula/vidrarias/${idsVidrarias.map((e: any) => e.id_vidrarias)}` : "/cadastro/aula/vidrarias"}></InputBoxSelectLink>
            <InputBoxSelectLink name="Agente/Reajente" href={idsAgenteReajente ? `/cadastro/aula/agente-reajente/${idsAgenteReajente.map((e: any) => e.id_agenteReajente)}` : "/cadastro/aula/agente-reajente"}></InputBoxSelectLink>
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
