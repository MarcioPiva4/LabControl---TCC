'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

interface PropPageEquipamentos {
    params: {
        id: string;
    }
}

export default function Equipamentos({params}: PropPageEquipamentos ) {
    const { id } = params;
    const arrayIds = id.replaceAll('%2C', ',').split(',');
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

    useEffect(() => {
        const activeForId = data.map((e) => arrayIds.includes(e.id.toString()) ? {...e, active: true} : {...e, active: false});
        setData(activeForId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pathName = usePathname();
    const router = useRouter();

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
    <Section title="Equipamentos" arrowBefore href="/cadastro/aula">
      <InputSearch placeholder="pesquise os equipamentos..." id="equipamentosseach"></InputSearch>
      {data.map((e, i) => ( 
        <InputBoxSelect name={e.nome} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
