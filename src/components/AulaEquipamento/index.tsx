'use client'
import { ButtonLink } from "@/components/Button";
import InputBoxSelect from "@/components/InputBoxSelect";
import InputSearch from "@/components/InputSeach";
import Section from "@/components/Section";;
import { useEffect, useState } from "react";
import AulaSearchFilter from "../AulaSearchFilter";


export default function EquipamentosAula({ equipamentos } : any) {
  const [data,setData] = useState(equipamentos.data);

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
          const response = await fetch(`/api/equipamento/search/${search}`);
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
  ? data.filter((e: any) => e.equipamento.toLowerCase().includes(search.toLowerCase()))
  : data;
  return (
    <Section title="Equipamentos" arrowBefore href="/cadastro/aula" bottom>
      <InputSearch placeholder="pesquise os equipamentos..." id="equipamentosseach" onChange={(e) => setSearch(e.target.value)} value={search}></InputSearch>
      {search && (
        <AulaSearchFilter search={search} searchResult={searchResult} type="equipamento" word="o"></AulaSearchFilter>
      )}
      {filteredData.map((e: any, i: any) => ( 
        <InputBoxSelect name={e.equipamento} key={i} id={e.id} activeOption={activeOption} disableOption={disableOption} active={e.active}></InputBoxSelect>
      ))}
        <ButtonLink is="isNotTransparent" type="button" link="link" href={`equipamentos/revisar/${selectedIds}`}>Revisar</ButtonLink>
    </Section>
  );
}