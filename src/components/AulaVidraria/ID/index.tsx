'use client'

import AulaSearchFilter from "@/components/AulaSearchFilter";
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";
import { useEffect, useState } from "react";

export default function VidrariasID({ id, vidrarias, baixa, idAula, manutencao }: {id: any, vidrarias: any, baixa?: boolean, idAula?: string; manutencao?: boolean}){
    const arrayIds = id.replaceAll('%2C', ',').split(',');
    const [data,setData] = useState(vidrarias.data);

    useEffect(() => {
        let updatedData;
        if(baixa && manutencao){
          updatedData = data
          .filter((e: any) => arrayIds.includes(e.id.toString()))
          .map((e: any) => ({ ...e, active: true }));
        } else {
          updatedData = data.map((e: any) =>
            arrayIds.includes(e.id.toString()) ? { ...e, active: true } : { ...e, active: false }
          );
        }

        const sortedData = [
          ...updatedData.filter((e: any) => e.active),
          ...updatedData.filter((e: any) => !e.active),
        ];
        setData(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  function activeOption(id: number){
    const updatedData = data.map((e: any) => 
      e.id === id ? { ...e, active: true } : { ...e }
    );
    const sortedData = [
      ...updatedData.filter((e: any) => e.active),
      ...updatedData.filter((e: any) => !e.active),
    ];
    setData(sortedData);
  }

  function disableOption(id: number){
    const updatedData = data.map((e: any) => 
      e.id === id ? { ...e, active: false } : { ...e }
    );
    const sortedData = [
      ...updatedData.filter((e: any) => e.active),
      ...updatedData.filter((e: any) => !e.active),
    ];
    setData(sortedData);
  }

  const selecteds = data.filter((e: any) => e.active);
  const selectedIds = selecteds.map((e: any) => e.id).join(',');

  const [search, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      if (search.length >= 1) {
        try {
          const response = await fetch(`/api/vidrarias/search/${search}`);
          const result = await response.json();
          setSearchResult(result.data);
        } catch (error) {
          console.error("Erro ao buscar agente/reajente:", error);
        }
      }
    };

    fetchData();
  }, [search]); 

  const filteredData = search.length >= 1
  ? data.filter((e: any) => e.vidraria.toLowerCase().includes(search.toLowerCase()))
  : data;
  return (
    <Section title="Vidrarias" arrowBefore href={baixa && `/baixa-aulas/finalizar/${idAula}` || manutencao && `/manutencao/editar/${idAula}` || '/cadastro/aula'} bottom>
      <InputSearch placeholder="pesquise as vidrarias..." id="vidrariasseach" onChange={(e) => setSearch(e.target.value)} value={search}></InputSearch>
      {search && (
        <AulaSearchFilter search={search} searchResult={searchResult} type="vidraria" word="a"></AulaSearchFilter>
      )}
        {filteredData.map((e: any, i: number) => ( 
          <InputBoxSelect name={e.vidraria} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
        ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}
