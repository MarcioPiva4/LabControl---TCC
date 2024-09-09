'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EquipamentoID({ id, equipamentos }: {id: any, equipamentos: any}){
    const arrayIds = id.replaceAll('%2C', ',').split(',');
    const [data,setData] = useState(equipamentos.data);

    useEffect(() => {
        const activeForId = data.map((e: any) => arrayIds.includes(e.id.toString()) ? {...e, active: true} : {...e, active: false});
        setData(activeForId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pathName = usePathname();
    const router = useRouter();

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
        {data.map((e: any, i: number) => ( 
          <InputBoxSelect name={e.equipamento} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
        ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}