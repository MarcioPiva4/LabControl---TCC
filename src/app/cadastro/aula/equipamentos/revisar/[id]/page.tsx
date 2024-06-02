"use client";
import Button, { ButtonLink } from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input, { OptionType } from "@/Components/Input";
import InputBoxSelect, {
  InputBoxSelectWithQuntity,
} from "@/Components/InputBoxSelect";
import Section from "@/Components/Section";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

interface PropPageRevisar {
  params: {
    id: string;
  }
}

export default function Revisar({ params }: PropPageRevisar) {
  const { id } = params;
  const arrayIds = id.replaceAll('%2C', ',').split(',');
  const [data, setData] = useState([
    {
      id: 1,
      nome: "teste",
      quantidadeTrue: 2,
      quantidadeFloat: 1,
      active: false,
      abr: '',
    },
    {
      id: 2,
      nome: "teste2",
      quantidadeTrue: 2,
      quantidadeFloat: 4,
      active: false,
      abr: '',
    },
    {
      id: 3,
      nome: "teste3",
      quantidadeTrue: 2,
      quantidadeFloat: 1,
      abr: '',
    },
    {
      id: 4,
      nome: "teste4",
      quantidadeTrue: 2,
      quantidadeFloat: 1,
      abr: '',
    },
  ]);
  const itens = data.filter((e) => arrayIds.includes(e.id.toString()));

  const router = useRouter();
  const [quantities, setQuantities] = useState<{ [key: number]: number | null }>({});
  const [abr, setAbr] = useState<{ [key: number]: OptionType | undefined }>({});
  const initialValues: { [key: string]: string } = {};
  itens.forEach((item) => {
    initialValues[item.id.toString()] = item.quantidadeFloat.toString();
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const combinedValues = itens.reduce((acc, item) => {
        acc[item.id] = {
          quantidade: values[item.id.toString()],
          abreviacao: abr[item.id]?.abr || ''
        };
        return acc;
      }, {} as { [key: number]: { quantidade: string, abreviacao: string } });

      localStorage.setItem('equipamentos', JSON.stringify(combinedValues));
      router.push('/cadastro/aula');
    },
  });

  const handleAddQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    formik.setFieldValue(id.toString(), (quantities[id] || 0) + 1);
  };

  const handleSubQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 0),
    }));
    formik.setFieldValue(id.toString(), Math.max((quantities[id] || 1) - 1, 0));
  };

  const handleSelectOption = (id: number, value: OptionType) => {
    setAbr((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      {itens.length <= 0 && <h1>Selecione uma opção antes de continuar</h1>}
      {itens.length > 0 && (
        <Section title={`Revisar Item`} bottom>
          <DefaultForm handleSubmit={formik.handleSubmit}>
            <Adjust>
              {itens.map((e) => (
                <div key={e.id}>
                  <InputBoxSelectWithQuntity
                    name={e.nome}
                    id={e.id}
                    add
                    sub
                    addQuantity={() => handleAddQuantity(e.id)}
                    subQuantity={() => handleSubQuantity(e.id)}
                    quantityFloat={e.quantidadeFloat}
                  ></InputBoxSelectWithQuntity>
                  <Input
                    label="Quantidade"
                    type="number"
                    selectAside
                    max={e.quantidadeFloat}
                    min={1}
                    value={formik.values[e.id.toString()] || ''}
                    onChange={(event) => {
                      const value = event.target.value === '' ? null : parseInt(event.target.value);
                      formik.setFieldValue(e.id.toString(), value);
                    }}
                    optionsFakeSelect={[
                      { id: 1, nome: "Gramas (g)", abr: "g", active: false, value: "g" },
                      { id: 2, nome: "Quilogramas (Kg)", abr: "Kg", active: false, value: "Kg" },
                      { id: 3, nome: "Toneladas (T)", abr: "T", active: false, value: "T" },
                      { id: 4, nome: "Mililitros (ml)", abr: "ml", active: false, value: "ml" },
                      { id: 5, nome: "Litros (L)", abr: "L", active: false, value: "L" },
                      { id: 6, nome: "Unidade (Un)", abr: "Un", active: true, value: "Un" },
                    ]}
                    dynamicOption={(value) => handleSelectOption(e.id, value)}
                  />
                </div>
              ))}
              <Content>
                <ButtonLink type="button" link="link" is="isTransparent" href={`/cadastro/aula/equipamentos/${itens.map(e => e.id)}`}>
                  CANCELAR
                </ButtonLink>
                <Button type="submit" is="isNotTransparent">
                  CONFIRMAR
                </Button>
              </Content>
            </Adjust>
          </DefaultForm>
        </Section>
      )}
    </>
  );
}
