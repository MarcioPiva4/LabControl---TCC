'use client'

import Button from "@/components/Button"
import DefaultForm from "@/components/DefaultForm"
import ErrorMessage from "@/components/ErrorMessage"
import Input from "@/components/Input"
import { Loader } from "@/components/Loader"
import MenuSubmit from "@/components/MenuSubmit"
import { useEffect, useState } from "react"

export default function FinalizarAulaForm( { aulas, id } : {aulas: any, id: any}){
    const [dataAulas, setDataAulas] = useState(aulas.data);
    const [dataAulasFilted, setdataAulasFilted] = useState() as any;

    useEffect(() => {
        setdataAulasFilted(dataAulas.filter((e: any) => e.id == id));
    }, [id, dataAulas])
    console.log(dataAulasFilted);

    const [sucess, setSucess] = useState<null | true>(null);
    const [error, setError] = useState<{error: boolean; message: string}>({ error: false, message: '' });
    const [submiting, setSubmiting] = useState<null | true>(null);
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setSubmiting(true);
    //     const form = e.currentTarget;
    //     const formData = new FormData(form);
    //     const dataForm = Object.fromEntries(formData.entries());
    //     const equipamentos = localStorage.getItem('equipamentosAula');
    //     const parsedEquipamentos = equipamentos ? JSON.parse(equipamentos) : null;
    //     const vidrarias = localStorage.getItem('vidrariasAula');
    //     const parsedVidrarias = vidrarias ? JSON.parse(vidrarias) : null;
    //     const agenteReajente = localStorage.getItem('agenteReajenteAula');
    //     const parsedAgenteReajente = agenteReajente ? JSON.parse(agenteReajente) : null;
    //     const data = {
    //         aula: dataForm,
    //         equipamentos: parsedEquipamentos,
    //         vidrarias: parsedVidrarias,
    //         agenteReajente: parsedAgenteReajente
    //     }
    //     try {
    //         const response = await fetch('/api/aula', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         const responseJson = await response.json();
    //         if (response.ok) {
    //             setSucess(true);
    //             setError({error: false, message: ''});
    //         } else {
    //             setError({error: true, message: responseJson.message})
    //         }
    //     } catch (error) {
    //         setError({error: true, message: 'Erro ao fazer a requisição, tente novamente.'})
    //     } finally {
    //         setSubmiting(null);
    //     }
    // };
    return(
        <DefaultForm>
            {error.error && <ErrorMessage text={error.message}></ErrorMessage>}
            <Input readOnly type="text" label="Matéria" value={dataAulasFilted ? dataAulasFilted[0]?.materias[0]?.nome : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? [{ ...prev[0], materias: [{ ...prev[0].materias[0], nome: e.target.value }] }] : prev)}  idInput="materia_aula"></Input>
            <Input readOnly type="text" label="Professor" value={dataAulasFilted ? dataAulasFilted[0]?.professores[0]?.nome : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? [{ ...prev[0], professores: [{ ...prev[0].professores[0], nome: e.target.value }] }] : prev)} idInput="professor_aula"></Input>
            <Input readOnly type="text" label="Laboratório" value={dataAulasFilted ? dataAulasFilted[0]?.laboratorios[0]?.nome : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? [{ ...prev[0], laboratorios: [{ ...prev[0].laboratorios[0], nome: e.target.value }] }] : prev)} idInput="laboratorio_aula"></Input>
            <Input readOnly type="text" label="Tópico da Aula" value={dataAulasFilted ? dataAulasFilted[0].topico_aula : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? prev.topico_aula = e.target.value : prev)} idInput="topico_aula"></Input>
            <Input readOnly type="time" label="Horário de inicio" value={dataAulasFilted ? dataAulasFilted[0].horario_inicio : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? prev.horario_inicio = e.target.value : prev)} idInput="horario_inicio"></Input>
            <Input readOnly type="time" label="Horário de finalização" value={dataAulasFilted ? dataAulasFilted[0].horario_finalizacao : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? prev.horario_finalizacao = e.target.value : prev)} idInput="horario_finalizacao"></Input>
            <Input readOnly type="date" label="Data de aula" idInput="data" value={dataAulasFilted ? dataAulasFilted[0].data : ''} onChange={(e) => setdataAulasFilted((prev: any) => prev ? prev.data = e.target.value : prev)}></Input>
            {submiting ? <Loader></Loader> : null}
            <Button type="submit" is="isNotTransparent">CADASTRAR</Button>
            {sucess && <MenuSubmit setSucess={setSucess}></MenuSubmit>}
        </DefaultForm>
    )
}