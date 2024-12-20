'use client'
import { ButtonLink } from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import { InputBoxSelectWithQuntity } from "@/components/InputBoxSelect";
import Section from "@/components/Section";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  quantidade_equipamento: number;
}

export default function EquipamentoRevisar({ id, equipamentos, baixa, idAula, aulas, manutencao }: { id: string; equipamentos: any; baixa?: boolean; idAula?: string; aulas?: any; manutencao?: boolean;}) {
  const arrayIds = id.replaceAll('%2C', ',').split(',');
  const [data,setData] = useState(equipamentos.data);
  const [itens, setItens] = useState(data.filter((e: any, i: any) => arrayIds.includes(e.id.toString())));
  const router = useRouter();
  const [parsedData, setParsedData] = useState<Itens[]>([]);
  const [dataAulas, setDataAulas] = useState(aulas? aulas.data.filter((e: any) => e.id == idAula) : null);

  useEffect(() => {
    setItens((prev: any) => 
      prev.map((item: any, i: number) =>(
        { ...item, quantidadeAdd: parsedData[i]?.quantidade_equipamento || 1 }
       )
      )
    );
  }, [id, parsedData]);

  useEffect(() => {
    if(manutencao){
      const localData = localStorage.getItem('equipamentosAulaEditar');
      if(localData){
         return setParsedData(JSON.parse(localData));
      }
    }
    const localData = localStorage.getItem('equipamentosAula');
    if(localData){
      return setParsedData(JSON.parse(localData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if(baixa){
      router.push(`/baixa-aulas/finalizar/${idAula}`);
    }  else if (manutencao){
      if(localStorage.getItem('equipamentosAulaEditar')){
        localStorage.removeItem('equipamentosAulaEditar')
      }
      localStorage.setItem('equipamentosAulaEditar', JSON.stringify(itens.map((e: any) =>  ({id_aula: idAula,id_equipamento: e.id, quantidade_equipamento: e.quantidadeAdd})  )));
      router.push(`/manutencao/editar/${idAula}`);
    }else {
      if(localStorage.getItem('equipamentosAula')){
        localStorage.removeItem('equipamentosAula')
      }
      localStorage.setItem('equipamentosAula', JSON.stringify(itens.map((e: any) =>  ({id_equipamento: e.id, quantidade_equipamento: e.quantidadeAdd})  )));
      router.push('/cadastro/aula');
    }
  }
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
                    name={e.equipamento}
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
                    value={!baixa ? e.quantidadeAdd ? e.quantidadeAdd : 1 : dataAulas && dataAulas[0]?.equipamentos[i]?.EquipamentoAula.quantidade}
                    {...(baixa ? { readOnly: true } : {})}
                  />
                </div>
              ))}
              <Content>
                <ButtonLink type="button" link="link" is="isTransparent" href={baixa && `/baixa-aulas/finalizar/${idAula}/equipamentos/${itens.map((e: any) => e.id)}` || manutencao && `/manutencao/editar/${idAula}/equipamentos/${itens.map((e: any) => e.id)}` || `/cadastro/aula/equipamentos/${itens.map((e: any) => e.id)}`}>
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