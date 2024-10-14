"use client";
import Button, { ButtonLink } from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import { InputBoxSelectWithQuntity } from "@/components/InputBoxSelect";
import { Loader } from "@/components/Loader";
import Section from "@/components/Section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Adjust = styled.div`
  input {
    height: 40px;
  }

  div {
    & div {
      margin-bottom: 10px;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  button:last-child{
    width: 100%;
    padding: 5px 15px;
    height: 50px;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    background-color: #84EEC1;
    color: #041833;
    border: 1px solid #84EEC1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    transition: .3s all;
    &:hover{
      color: #84EEC1;
      background-color: transparent;
      border-color: #84EEC1 ;
    }
  }
`;

interface Itens {
  id: number | string;
  nome: string;
  quantidade_vidraria: number;
}



export default function VidrariasRevisarEditar({ idAula, vidrarias, aulas, idVidrarias }: { idAula: string; idVidrarias: string; vidrarias: any; aulas: any}) {
  const arrayIds = idVidrarias.replaceAll('%2C', ',').split(',');


  const [vidrariasData,setVidrariasData] = useState(vidrarias.data);
  const [vidrariasDataFiltered, setVidrariasDataFiltered] = useState(vidrariasData.filter((e: any, i: any) => arrayIds.includes(e.id.toString())));

  const [aulasData, setAulasData] = useState(aulas.data);
  const [aulasDataFiltered, setAulasDataFiltered] = useState<any>();
  const [itens, setItens] = useState<any>();
  useEffect(() => {
    if (aulasData) {
      const filtered = aulasData.filter((e: any) => e.id == idAula);
      setAulasDataFiltered(filtered);
    }

  }, [aulasData, idAula]);

  console.log(itens)
  const router = useRouter();
  const [parsedData, setParsedData] = useState<Itens[]>([]);
  const [abr,setAbr] = useState([
    { id: 1, nome: "Gramas (g)", abr: "g", active: false, value: "g" },
    { id: 2, nome: "Quilogramas (Kg)", abr: "Kg", active: false, value: "Kg" },
    { id: 3, nome: "Toneladas (T)", abr: "T", active: false, value: "T" },
    { id: 4, nome: "Mililitros (ml)", abr: "ml", active: false, value: "ml" },
    { id: 5, nome: "Litros (L)", abr: "L", active: false, value: "L" },
    { id: 6, nome: "Unidade (Un)", abr: "Un", active: true, value: "Un" },
  ]);

  useEffect(() => {
    if (aulasDataFiltered) {
      const filtered = vidrariasDataFiltered.map((e: any, i: number) => {
        const quantidadeInicial = aulasDataFiltered[0]?.equipamentos[i]?.EquipamentoAula?.quantidade || 1;
        return {
          ...e,
          quantidadeAdd: parsedData && parsedData[i]?.quantidade_vidraria !== undefined
            ? parsedData[i].quantidade_vidraria
            : quantidadeInicial,
          abr,
        };
      });
      setItens(filtered);
    }
  }, [aulasDataFiltered, vidrariasDataFiltered, abr, parsedData]);

  console.log(aulasDataFiltered)
  const[dataOptions, setDataOptions] = useState<any>();
  const stateOptions = (childdata: any) => { 
    setDataOptions(childdata);
  }

  const [values, setValues] = useState(abr);
  useEffect(() => {
    const savedAbr = localStorage.getItem('selectedAbr');
    if (savedAbr) {
      const parsedAbr = JSON.parse(savedAbr);
      setValues((prevValues) =>
        prevValues.map((value) =>
          value.id === parsedAbr.id ? { ...value, active: true } : { ...value, active: false }
        )
      );
    }
  }, []);
  
  useEffect(() => {
    const localData = localStorage.getItem('vidrariasAulaEditar');
    if(localData){
      setParsedData(JSON.parse(localData));
    }
  }, []);

  const handleAddQuantity = (id: number) => {
    setItens((prev: any) => 
      prev.map((item: any) =>
        item.id === id
          ? { ...item, quantidadeAdd: (Number(item.quantidadeAdd) || 0) + 1 }
          : item
      )
    );
  };
  
  const handleSubQuantity = (id: number) => {
    setItens((prev: any) => 
      prev.map((item: any) =>
        item.id === id
          ? { ...item, quantidadeAdd: Math.max((item.quantidadeAdd || 0) - 1, 1) }
          : item
      )
    );
  };
  

  const submitForm = () => {
    router.push(`/manutencao/editar/${idAula}`);
    if(localStorage.getItem('vidrariasAulaEditar')){
      localStorage.removeItem('vidrariasAulaEditar')
    }
    localStorage.setItem('vidrariasAulaEditar', JSON.stringify(itens.map((e: any) =>  ({id_vidrarias: e.id, quantidade_vidrarias: e.quantidadeAdd})  )));
  }
  return (
    <>
      {itens ? itens.length <= 0 && <h1>Selecione uma opção antes de continuar</h1> : null}
      {itens ? itens.length > 0 && (
        <Section title={`Revisar Item`} bottom>
          <DefaultForm>
            <Adjust>
              {itens.map((e: any) => (
                <div key={e.id}>
                  <InputBoxSelectWithQuntity
                    name={e.vidraria}
                    id={e.id}
                    add
                    sub
                    addQuantity={() => handleAddQuantity(e.id)}
                    subQuantity={() => handleSubQuantity(e.id)}
                    quantityFloat={e.quantidadeAdd}
                  ></InputBoxSelectWithQuntity>
                  <Input
                    label="Quantidade"
                    type="number"
                    selectAside
                    onChange={(event) => {
                      const newQuantity = parseFloat(event.target.value);
                      setItens((prev: any) => 
                        prev.map((item: any) =>
                          item.id === e.id
                            ? { ...item, quantidadeAdd: isNaN(newQuantity) ? 1 : newQuantity }
                            : item
                        )
                      );
                    }}
                    optionsFakeSelect={e.abr}
                    value={e.quantidadeAdd ? e.quantidadeAdd : 1}
                    stateOptions={stateOptions}
                  />
                </div>
              ))}
              <Content>
                <ButtonLink type="button" link="link" is="isTransparent" href={`/manutencao/editar/${idAula}`}>
                  CANCELAR
                </ButtonLink>
                <button onClick={submitForm} type="button">
                  CONFIRMAR
                </button>
              </Content>
            </Adjust>
          </DefaultForm>
        </Section>
      ) : <Loader></Loader>}
    </>
  );
  
}