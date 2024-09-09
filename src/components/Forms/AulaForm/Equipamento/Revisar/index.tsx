"use client";
import Button, { ButtonLink } from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import { InputBoxSelectWithQuntity } from "@/components/InputBoxSelect";
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
`;

interface Itens {
  id: number | string;
  nome: string;
  quantidadeFloat: number;
}



export default function EquipamentoRevisar({ id, equipamentos }: { id: string; equipamentos: any}) {
  const arrayIds = id.replaceAll('%2C', ',').split(',');
  const [data,setData] = useState(equipamentos.data);
  const [itens, setItens] = useState(data.filter((e: any, i: any) => arrayIds.includes(e.id.toString())));
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

  const [teste, setTeste] = useState();
  const selectRef = useRef(null);

  console.log(selectRef.current);
  useEffect(() => {
    setItens((prev: any) => 
      prev.map((item: any) =>(
        { ...item, quantidadeAdd: 1, abr }
       )
      )
    );
  }, [id, abr]);

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
    //router.push('/cadastro/aula');
    if(localStorage.getItem('equipamentosAula')){
      localStorage.removeItem('equipamentosAula')
    }
    localStorage.setItem('equipamentosAula', JSON.stringify(itens.map((e: any) =>  ({id: e.id, quantidade: e.quantidadeAdd})  )));
  }
  console.log(itens);
  return (
    <>
      {itens.length <= 0 && <h1>Selecione uma opção antes de continuar</h1>}
      {itens.length > 0 && (
        <Section title={`Revisar Item`} bottom>
          <DefaultForm>
            <Adjust>
              {itens.map((e: any) => (
                <div key={e.id}>
                  <InputBoxSelectWithQuntity
                    name={e.equipamento}
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
                    selectRef={selectRef}
                  />
                </div>
              ))}
              <Content>
                <ButtonLink type="button" link="link" is="isTransparent" href={`/cadastro/aula/equipamentos/${itens.map((e: any) => e.id)}`}>
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