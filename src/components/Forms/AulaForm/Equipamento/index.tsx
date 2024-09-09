'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EquipamentosAula({ equipamentos } : any) {
    // const [data,setData] = useState([
    //     {
    //       id: 1,
    //       nome: "teste",
    //       quantidadeTrue: 2, //real quantidade q tem estoque, so sera desconto apos a baixa da aula
    //       quantidadeFloat: 1, //quantidade antes do professor dar baixa
    //       active: false,
    //     },
    //     {
    //       id: 2,
    //       nome: "teste2",
    //       quantidadeTrue: 2, 
    //       quantidadeFloat: 4,
    //       active: false,
    //     },
    //     {
    //       id: 3,
    //       nome: "teste3",
    //       quantidadeTrue: 2,
    //       quantidadeFloat: 1,
    //       active: false,
    //     },
    //     {
    //       id: 4,
    //       nome: "teste4",
    //       quantidadeTrue: 2,
    //       quantidadeFloat: 1,
    //       active: false,
    //     },
    //   ]);
  const [data,setData] = useState(equipamentos.data);

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
    <Section title="Equipamentos" arrowBefore href="/cadastro/aula">
      <InputSearch placeholder="pesquise os equipamentos..." id="equipamentosseach"></InputSearch>
      {data.map((e: any, i: any) => ( 
        <InputBoxSelect name={e.equipamento} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`equipamentos/revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
