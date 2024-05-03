"use client";
import { theme } from "@/styles/theme";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

interface PropInput {
  label?: string;
  idInput?: string;
  placeHolder?: string;
  type: "text" | "number" | "search" | "select";
  options?: Array<{
    value: string;
  }>;
  selectAside?: "variant1" | "variant2" | "variant3";
}

const ContentInput = styled.div`
  position: relative;
  height: auto;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  line-height: ${(props) => props.theme.font.label.height};
  margin-bottom: 3px;
`;

const InputWrapper = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 50px;
  height: 30px;
  padding: 0 15px;
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.color.secondary};
  }

  &:-moz-placeholder {
    color: ${(props) => props.theme.color.secondary};
  }

  &::-moz-placeholder {
    color: ${(props) => props.theme.color.secondary};
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.color.secondary};
  }
`;

export default function Input({
  label,
  idInput,
  placeHolder,
  type,
  options,
  selectAside,
}: PropInput) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {label && <Label>{label}</Label>}
        {type != "select" ? (
          <ContentInput>
            <InputWrapper
              placeholder={placeHolder}
              id={idInput}
              name={idInput}
              type={type}
            ></InputWrapper>
            {selectAside && RenderSelect(selectAside)}
          </ContentInput>
        ) : (
          <select id={idInput} name={idInput}>
            {options?.map((e) => (
              <option key={e.value}>{e.value}</option>
            ))}
          </select>
        )}
      </ThemeProvider>
    </>
  );
}

interface propTextArea {
  labelText?: string;
}

const TextAreaWrapper = styled.textarea`
  resize: none;
  height: 180px;
  border-radius: 20px;
  width: 100%;
  padding: 10px 20px;
  outline: none;
  font-family: ${(props) => props.theme.font.fontFamily};
  color: ${(props) => props.theme.color.secondary};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  margin-bottom: 25px;
`;

export function TextArea({ labelText }: propTextArea) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Label>{labelText}</Label>
        <TextAreaWrapper></TextAreaWrapper>
      </ThemeProvider>
    </>
  );
}

function RenderSelect(selectAside: any): React.ReactNode {
  switch (selectAside) {
    case "variant1":
      return SelectFirstVariant();
    case "variant2":
      return SelectSecondVariant();
    case "variant3":
      return SelectThirdVariant();
    default:
      return null;
  }
}

const ContentSelect = styled.div.attrs<{ $active?: boolean }>((props) => ({
  $active: props.$active,
}))`
  position: absolute;
  top: 0;
  right: -1px;
  background-color: ${(props) => props.theme.color.secondary};
  height: 100%;
  border-radius: ${(props) => props.$active ? '0 15px 0px 0' : '0 45px 45px 0'};
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  gap: 10px;

  p {
    opacity: ${(props) => props.$active ? '0' : '1'};
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
  }

  img{
    transition: .3s all;
    transform: ${(props) => props.$active ? 'rotate(-90deg)' : 'rotate(0)'};
  }
`;

function SelectFirstVariant() {
  return (
    <ContentSelect>
      <p>g/mol</p>
      <Image
        src="/inputArrow.svg"
        alt="Ícone de seta virada para a esquerda"
        width={15}
        height={15}
      ></Image>
    </ContentSelect>
  );
}

function SelectSecondVariant() {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [values, setValues] = useState<
    Array<{ id: number; nome: string; abr: string; active: boolean }>
  >([
    {
      id: 1,
      nome: "Gramas por Litro (g/L)",
      abr: "g/l",
      active: false,
    },
    {
      id: 2,
      nome: "Gramas por mililitro (g/mL)",
      abr: "g/mL",
      active: false,
    },
  ]);
  const selected = values.find((e) => e.active);

  function setOption(id: number) {
    const updatedValues = values.map((e) => ({
      ...e,
      active: e.id === id,
    }));
    setValues(updatedValues);
  }

  return (
    <>
      <ContentSelect
        onClick={() => setOpenSelect(!openSelect)}
        $active={openSelect}
      >
        <p>{selected ? selected.abr : 'Selecione'}</p>
        <Image
          src="/inputArrow.svg"
          alt="Ícone de seta virada para a esquerda"
          width={15}
          height={15}
        ></Image>
      </ContentSelect>
      {openSelect && (
        <FakeSelect options={values} setOption={setOption}></FakeSelect>
      )}
    </>
  );
}

function SelectThirdVariant() {
  return (
    <ContentSelect>
      <p>g/mol</p>
      <Image
        src="/inputArrow.svg"
        alt="Ícone de seta virada para a esquerda"
        width={15}
        height={15}
      ></Image>
    </ContentSelect>
  );
}


const ContentList = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.color.secondary};
  right: -1px;
  width: 60%;
  z-index: 5;
  border-radius: 0px 0px 15px 15px;
`;

const List = styled.ul`
  list-style: none;
  padding: 15px 0 15px 0px;
  height: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  li{
    cursor: pointer;
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
    padding: 7px 10px;

    &:hover{
      background-color: #0c3b78;
    }
  }
`;

function FakeSelect({options, setOption}: {options: Array<{id: number; nome: string; abr: string; active: boolean}>; setOption: any}){
  return(
    <ContentList>
      <List>
        {options.map((e) => <li key={e.id} onClick={() => setOption(e.id)}>{e.nome}</li>)}
      </List>
    </ContentList>
  )
}