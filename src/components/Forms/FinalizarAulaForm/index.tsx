"use client";

import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import { Loader } from "@/components/Loader";
import MenuSubmit from "@/components/MenuSubmit";
import { useEffect, useState } from "react";
import Select from "@/components/Select";
import { InputBoxSelectLink } from "@/components/InputBoxSelect";
import TextArea from "@/components/TextArea";

export default function FinalizarAulaForm({
  aulas,
  id,
  materias,
  professor,
  laboratorio,
}: {
  aulas: any;
  id: any;
  materias: any;
  professor: any;
  laboratorio: any;
}) {
  const [dataAulas, setDataAulas] = useState(aulas.data);
  const [dataAulasFilted, setdataAulasFilted] = useState() as any;
  console.log(dataAulasFilted);

  useEffect(() => {
    setdataAulasFilted(dataAulas.filter((e: any) => e.id == id));
  }, [id, dataAulas]);

  const [sucess, setSucess] = useState<null | true>(null);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });
  const [submiting, setSubmiting] = useState<null | true>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      const response = await fetch("/api/aula", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      const responseJson = await response.json();
      if (response.ok) {
        setSucess(true);
        setError({ error: false, message: "" });
      } else {
        setError({ error: true, message: responseJson.message });
      }
    } catch (error) {
      setError({
        error: true,
        message: "Erro ao fazer a requisição, tente novamente.",
      });
    } finally {
      setSubmiting(null);
    }
  };
  return dataAulasFilted && dataAulasFilted[0]?.status === "finish" ? (
    <MenuSubmit
      setSucess={setSucess}
      message="Esta aula já foi finalizada!"
      buttonBack></MenuSubmit>
  ) : (
    <DefaultForm onSubmit={handleSubmit}>
      {error.error && (
        <ErrorMessage text={error.message} error={error}></ErrorMessage>
      )}
      <Select
        readOnly
        id="id_materia"
        options={materias.data}
        selectLabel="Matérias"
        value={
          dataAulasFilted
            ? dataAulasFilted[0]?.materias[0]?.MateriaAula.id_materia
            : ""
        }></Select>
      <Select
        readOnly
        id="id_professor"
        options={professor.data}
        selectLabel="Professor"
        value={
          dataAulasFilted
            ? dataAulasFilted[0]?.professores[0]?.ProfessorAula.id_professor
            : ""
        }></Select>
      <Select
        readOnly
        id="id_laboratorio"
        options={laboratorio.data}
        selectLabel="Laboratório"
        value={
          dataAulasFilted
            ? dataAulasFilted[0]?.laboratorios[0]?.LaboratorioAula
                .id_laboratorio
            : ""
        }></Select>

      {dataAulasFilted
        ? dataAulasFilted[0]?.equipamentos[0] && (
            <InputBoxSelectLink
              name="Equipamentos"
              href={`${dataAulasFilted && dataAulasFilted[0]?.id}/equipamentos/${
                dataAulasFilted
                  ? dataAulasFilted[0]?.equipamentos.map(
                      (e: any) => e.EquipamentoAula.id_equipamento
                    )
                  : ""
              }`}></InputBoxSelectLink>
          )
        : null}

      {dataAulasFilted
        ? dataAulasFilted[0]?.vidrarias[0] && (
            <InputBoxSelectLink
              name="Agentes/Reajentes"
              href={`${dataAulasFilted && dataAulasFilted[0]?.id}/agente-reajente/${
                dataAulasFilted
                  ? dataAulasFilted[0]?.agentes_reajentes.map(
                      (e: any) => e.AgenteReajenteAula.id_agentereajente
                    )
                  : ""
              }`}></InputBoxSelectLink>
          )
        : null}

      {dataAulasFilted
        ? dataAulasFilted[0]?.vidrarias[0] && (
            <InputBoxSelectLink
              name="Vidrarias"
              href={`${dataAulasFilted && dataAulasFilted[0]?.id}/vidrarias/${
                dataAulasFilted
                  ? dataAulasFilted[0]?.vidrarias.map(
                      (e: any) => e.VidrariaAula.id_vidraria
                    )
                  : ""
              }`}></InputBoxSelectLink>
          )
        : null}
      <Input
        type="text"
        label="Tópico da Aula"
        value={dataAulasFilted ? dataAulasFilted[0]?.topico_aula : ""}
        onChange={(e) =>
          setdataAulasFilted((prev: any) =>
            prev ? [{ ...prev[0], topico_aula: e.target.value }] : prev
          )
        }
        idInput="topico_aula"
        readOnly></Input>
      <Input
        type="time"
        label="Horário de inicio"
        value={dataAulasFilted ? dataAulasFilted[0].horario_inicio : ""}
        onChange={(e) =>
          setdataAulasFilted((prev: any) =>
            prev ? [{ ...prev[0], horario_inicio: e.target.value }] : prev
          )
        }
        readOnly
        idInput="horario_inicio"></Input>
      <Input
        type="time"
        label="Horário de finalização"
        value={dataAulasFilted ? dataAulasFilted[0].horario_finalizacao : ""}
        onChange={(e) =>
          setdataAulasFilted((prev: any) =>
            prev ? [{ ...prev[0], horario_finalizacao: e.target.value }] : prev
          )
        }
        readOnly
        idInput="horario_finalizacao"></Input>
      <Input
        type="date"
        label="Data de aula"
        idInput="data"
        value={dataAulasFilted ? dataAulasFilted[0].data : ""}
        readOnly
        onChange={(e) =>
          setdataAulasFilted((prev: any) =>
            prev ? [{ ...prev[0], data: e.target.value }] : prev
          )
        }></Input>
      <TextArea
        readOnly
        labelText="Observações"
        id="observacoes"
        length
        value={
          dataAulasFilted ? dataAulasFilted[0].observacoes : ""
        }></TextArea>
      {submiting ? <Loader></Loader> : null}
      <Button type="submit" is="isNotTransparent">
        FINALIZAR
      </Button>
      {sucess && (
        <MenuSubmit
          setSucess={setSucess}
          message="Aula Finalizada com sucesso!"
          buttonBack></MenuSubmit>
      )}
      {!dataAulasFilted && <Loader></Loader>}
    </DefaultForm>
  );
}
