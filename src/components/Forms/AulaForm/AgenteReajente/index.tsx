'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";
import { useState } from "react";

export default function AgenteReajenteAula({ agentesReajentes } : any) {
  const [data,setData] = useState(agentesReajentes.data);

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

  const selecteds = data.filter((e: any) => e.active);
  const selectedIds = selecteds.map((e: any) => e.id).join(',');

  return (
    <Section title="Agentes/Reajentes" arrowBefore href="/cadastro/aula">
      <InputSearch placeholder="pesquise os agentes/reajentes..." id="agentesreajentesseach"></InputSearch>
      {data.map((e: any, i: any) => ( 
        <InputBoxSelect name={e.nome} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`agente-reajente/revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
