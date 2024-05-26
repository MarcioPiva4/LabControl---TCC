"use client";
import Button, { ButtonLink } from "@/Components/Button";
import DefaultForm from "@/Components/DefaultForm";
import Input from "@/Components/Input";
import InputBoxSelect, {
  InputBoxSelectWithQuntity,
} from "@/Components/InputBoxSelect";
import Section from "@/Components/Section";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Adjust = styled.div`
  input {
    height: 40px;
  }

  div{
    & div{
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
  id: number;
  nome: string;
  quantidadeFloat: number;
}

export default function Revisar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dataParam = searchParams.get("data");
  const [parsedData, setParsedData] = useState([]);
  const [quantities, setQuantities] = useState<{
    [key: number]: number | null;
  }>({});
  //recupera os dados vindo da rota pai
  useEffect(() => {
    if (dataParam) {
      setParsedData(JSON.parse(decodeURIComponent(dataParam)));
    }
  }, [dataParam]);

  const formik = useFormik({
    initialValues: {
      //
    },
    onSubmit: (values) => {
        router.push('/cadastro/aula');
    },
  });

  const handleAddQuantity = (id: string | number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleSubQuantity = (id: string | number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 0),
    }));
  };

  return (
    <Section title="Revisar" bottom>
      <DefaultForm handleSubmit={formik.handleSubmit}>
        <Adjust>
          {parsedData.map((e: Itens) => (
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
                value={
                  quantities[e.id] !== undefined ? quantities[e.id] ?? 1 : 1
                }
                onChange={(event) => {
                  const value =
                    event.target.value === ""
                      ? null
                      : parseInt(event.target.value);
                  setQuantities({
                    ...quantities,
                    [e.id]: value,
                  });
                }}
                optionsFakeSelect={[
                  {
                    id: 1,
                    nome: "Gramas (g)",
                    abr: "g",
                    active: false,
                    value: "g",
                  },
                  {
                    id: 2,
                    nome: "Quilogramas (Kg)",
                    abr: "Kg",
                    active: false,
                    value: "Kg",
                  },
                  {
                    id: 3,
                    nome: "Toneladas (T)",
                    abr: "T",
                    active: false,
                    value: "T",
                  },
                  {
                    id: 4,
                    nome: "Mililitros (ml)",
                    abr: "ml",
                    active: false,
                    value: "ml",
                  },
                  {
                    id: 5,
                    nome: "Litros (L)",
                    abr: "L",
                    active: false,
                    value: "L",
                  },
                  {
                    id: 6,
                    nome: "Unidade (Un)",
                    abr: "Un",
                    active: true,
                    value: "Un",
                  },
                ]}
              ></Input>
            </div>
          ))}
          <Content>
            <ButtonLink type="button" link="backone" is="isTransparent">
              CANCELAR
            </ButtonLink>
            <Button type="submit" is="isNotTransparent">
              CONFIRMAR
            </Button>
          </Content>
        </Adjust>
      </DefaultForm>
    </Section>
  );
}
