'use client'
import { ButtonLink } from "@/Components/Button";
import InputBoxSelect from "@/Components/InputBoxSelect";
import InputSearch from "@/Components/InputSeach";
import Section from "@/Components/Section";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Equipamentos() {
  const [data,setData] = useState([
    {
      id: 1,
      nome: "teste",
      quantidadeTrue: 2, //real quantidade q tem estoque, so sera desconto apos a baixa da aula
      quantidadeFloat: 1, //quantidade antes do professor dar baixa
      active: false,
    },
    {
      id: 2,
      nome: "teste2",
      quantidadeTrue: 2, 
      quantidadeFloat: 4,
      active: false,
    },
    {
      id: 3,
      nome: "teste3",
      quantidadeTrue: 2,
      quantidadeFloat: 1,
      active: false,
    },
    {
      id: 4,
      nome: "teste4",
      quantidadeTrue: 2,
      quantidadeFloat: 1,
      active: false,
    },
  ]);

  function activeOption(id: number){
    const updatedData = data.map((e) => 
      e.id === id ? { ...e, active: true } : { ...e }
    );
    setData(updatedData);
  }

  function disableOption(id: number){
    const updatedData = data.map((e) => 
      e.id === id ? { ...e, active: false } : { ...e }
    );
    setData(updatedData);
  }

  const selecteds = data.filter((e) => e.active);
  const selectedIds = selecteds.map(e => e.id).join(',');

  return (
    <Section title="Equipamentos" arrowBefore>
      <InputSearch placeholder="pesquise os equipamentos..." id="equipamentosseach"></InputSearch>
      {data.map((e, i) => ( 
        <InputBoxSelect name={e.nome} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`equipamentos/revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
