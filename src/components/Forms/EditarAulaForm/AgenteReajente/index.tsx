'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import { Loader } from "@/components/Loader";
import Section from "@/components/Section";
import { useEffect, useState } from "react";

export default function AgenteReajenteAulaEditar({ agenteReajente, aulas, id } : {agenteReajente: any; aulas: any; id: any}) {
  const [agenteReajenteData, setAgenteReajenteData] = useState(agenteReajente.data);
  const [aulasData, setAulasData] = useState(aulas.data);
  const [aulasDataFiltered, setAulasDataFiltered] = useState<any>();
  const [data,setData] = useState<any>();

  useEffect(() => {
    if (aulasData) {
      const filtered = aulasData.filter((e: any) => e.id == id);
      setAulasDataFiltered(filtered);
    }

  }, [aulasData, id]);
  
  console.log(aulasDataFiltered);

  useEffect(() => {
    if(aulasDataFiltered){
      const filtered = agenteReajenteData.map((e: any, i: number) => (
        e.id == aulasDataFiltered[0]?.agentes_reajentes[i]?.AgenteReajenteAula?.id_agentereajente ? {...e, active: true} : {...e}
      ))
      setData(filtered);
    }
  }, [aulasDataFiltered, agenteReajenteData])

  function activeOption(id: number){
    const updatedData = data.map((e: any) => 
      e.id === id ? { ...e, active: true } : { ...e }
    );
    setData(updatedData);
  }

  function disableOption(id: number){
    const updatedData = data.map((e: any) => 
      e.id === id ? { ...e, active: false } : { ...e }
    );
    setData(updatedData);
  }

  const selecteds = data ?  data.filter((e: any) => e.active) : [];
  const selectedIds = selecteds.map((e: any) => e.id).join(',');
  return (
    <Section title="Agentes Reajentes" arrowBefore href={`/manutencao/editar/${id}`}>
      <InputSearch placeholder="pesquise os agentes/reajentes..." id="agentesReajentesseach"></InputSearch>
      {data ? data.map((e: any, i: any) => ( 
        <InputBoxSelect name={e.nome} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      )): <Loader></Loader>}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`/manutencao/editar/${id}/agente-reajente/revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
