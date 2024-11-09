'use client'
import { ButtonLink } from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import { SelectVariant } from "@/components/FakeSelect";
import Input from "@/components/Input";
import { InputBoxSelectWithQuntity } from "@/components/InputBoxSelect";
import Section from "@/components/Section";
import { useRouter } from "next/navigation";
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
  quantidade_agenteReajente: number;
}

export default function AgenteReajenteRevisar({ id, agentesReajentes, baixa, idAula, aulas }: { id: string; agentesReajentes: any; baixa?: boolean; idAula?: string; aulas?: any}) {
  const arrayIds = id.replaceAll('%2C', ',').split(',');
  const [data,setData] = useState(agentesReajentes.data);
  const [itens, setItens] = useState(data.filter((e: any, i: any) => arrayIds.includes(e.id.toString())));
  const router = useRouter();
  const [parsedData, setParsedData] = useState<Itens[]>([]);
  const [dataAulas, setDataAulas] = useState(aulas? aulas.data.filter((e: any) => e.id == idAula) : null);
  const [abr,setAbr] = useState([
    { id: 1, nome: "Gramas (g)", abr: "G", active: false, value: "G" },
    { id: 2, nome: "Quilogramas (Kg)", abr: "Kg", active: false, value: "KG" },
    { id: 3, nome: "Toneladas (T)", abr: "T", active: false, value: "T" },
    { id: 4, nome: "Mililitros (ml)", abr: "Ml", active: false, value: "ML" },
    { id: 5, nome: "Litros (L)", abr: "L", active: false, value: "L" },
    { id: 6, nome: "Unidade (Un)", abr: "Un", active: false, value: "UN" },
  ]);

  const selectRef = useRef(null);

  useEffect(() => {
    setItens((prev: any) => 
      prev.map((item: any, i: number) =>(
        { ...item, quantidadeAdd: parsedData[i]?.quantidade_agenteReajente || 1, abr }
       )
      )
    );
  }, [id, abr, parsedData]);

  useEffect(() => {
    // Carregar dados do localStorage ao montar o componente
    const localData = localStorage.getItem('agenteReajenteAula');
    if (localData) {
      const savedData = JSON.parse(localData);

      // Atualiza o estado de itens
      setItens((prev: any) => 
        prev.map((item: any) => {
          const savedItem = savedData.find((saved: any) => saved.id_agenteReajente === item.id);
          return {
            ...item,
            quantidadeAdd: savedItem ? savedItem.quantidade_agenteReajente : item.quantidadeAdd,
          };
        })
      );

      // Atualiza o estado das unidades selecionadas
      const unitMap = savedData.reduce((acc: any, saved: any) => {
        acc[saved.id_agenteReajente] = saved.unidade;
        return acc;
      }, {});
      setSelectedUnits(unitMap);
    }
  }, []);

  const handleAddQuantity = (id: number) => {
    setItens((prev: any) => 
      prev.map((item: any) =>
        item.id === id
          ? { ...item, quantidadeAdd: (item.quantidadeAdd || 0) + 1 }
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
    if(!baixa){
      if (localStorage.getItem('agenteReajenteAula')) {
        localStorage.removeItem('agenteReajenteAula');
      }
      
      const dadosParaSalvar = itens.map((e: any) => ({
        id_agenteReajente: e.id,
        quantidade_agenteReajente: e.quantidadeAdd,
        unidade: selectedUnits[e.id] || 'G',
      }));
    
      localStorage.setItem('agenteReajenteAula', JSON.stringify(dadosParaSalvar));
      router.push(`/cadastro/aula/`);
    } else {
      router.push(`/baixa-aulas/finalizar/${idAula}`);
    }

  }
  
  const [selectedUnits, setSelectedUnits] = useState<{ [key: number]: string }>({});
  return (
    <>
      {itens.length <= 0 && <h1>Selecione uma opção antes de continuar</h1>}
      {itens.length > 0 && (
        <Section title={`Revisar Item`} bottom>
          <DefaultForm>
            <Adjust>
              {itens.map((e: any, i:number) => (
                <div key={e.id}>
                  <InputBoxSelectWithQuntity
                    name={e.nome}
                    id={e.id}
                    add
                    sub
                    addQuantity={() => handleAddQuantity(e.id)}
                    subQuantity={() => handleSubQuantity(e.id)}
                    quantityFloat={e.quantidadeAdd}
                    {...(baixa ? { disable: true } : {})}
                  ></InputBoxSelectWithQuntity>
                  <Input
                    label="Quantidade"
                    type="number"
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
                    value={!baixa ? e.quantidadeAdd ? e.quantidadeAdd : 1 : dataAulas && dataAulas[0]?.agentes_reajentes[i]?.AgenteReajenteAula.quantidade}
                    {...(baixa ? { readOnly: true } : {})}
                  >
                    <SelectVariant
                      selectRef={selectRef}
                      options={abr}
                      onChange={(selectedValue) => {
                        setSelectedUnits((prev) => ({ ...prev, [e.id]: selectedValue }));
                      }}
                      valueStartActive={dataAulas && dataAulas[0]?.agentes_reajentes[i]?.AgenteReajenteAula.medida_quantidade}
                      value={selectedUnits[e.id] || 'Un'}
                      {...(baixa ? { disabled: true } : {})}
                    />
                  </Input>
                </div>
              ))}
              <Content>
                <ButtonLink type="button" link="link" is="isTransparent" href={baixa ? `/baixa-aulas/finalizar/${idAula}/vidrarias/${itens.map((e: any) => e.id)}` : `/cadastro/aula/vidrarias/${itens.map((e: any) => e.id)}`}>
                  CANCELAR
                </ButtonLink>
                <button onClick={submitForm} type="button">
                  CONFIRMAR
                </button>
              </Content>
            </Adjust>
          </DefaultForm>
        </Section>
      )}
    </>
  );
  
}