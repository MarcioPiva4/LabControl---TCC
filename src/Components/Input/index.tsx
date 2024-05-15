"use client";
import { theme } from "@/styles/theme";
import Image from "next/image";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
interface PropInput {
  label?: string;
  idInput?: string;
  placeHolder?: string;
  type: "text" | "number" | "search" | "select";
  options?: Array<{
    value: string;
  }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  selectAside?: boolean;
  optionsFakeSelect?: Array<{id: number; nome: string; abr: string; active: boolean}>;
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
  value,
  onChange,
  selectAside,
  optionsFakeSelect,
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
              value={value}
              type={type}
              onChange={onChange}
            ></InputWrapper>
            {selectAside && optionsFakeSelect && <SelectFirstVariant options={optionsFakeSelect}></SelectFirstVariant>}
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

function SelectFirstVariant({options}: {options: Array<{id: number; nome: string; abr: string; active: boolean}>}) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [values, setValues] = useState<
    Array<{ id: number; nome: string; abr: string; active: boolean }>
  >(options);
  const selected = values.find((e) => e.active);

  function setOption(id: number) {
    const updatedValues = values.map((e) => ({
      ...e,
      active: e.id === id,
    }));
    setValues(updatedValues);
    setOpenSelect(!openSelect);
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
        <FakeSelect options={values} setOption={setOption} selected={selected}></FakeSelect>
      )}
    </>
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

const List = styled.ul.attrs<{$active: boolean; $number: number}>((props) => ({
  $active: props.$active,
  $number: props.$number,
}))`
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

    &:nth-child(${(props) => props.$number}) {
      background-color: ${(props) => props.$active ? '#0c3b78' : ''};
    }

    &:hover{
      background-color: #0c3b78;
    }
  }
`;

function FakeSelect({options, setOption, selected}: {options: Array<{id: number; nome: string; abr: string; active: boolean}>; setOption: any; selected: any;}){
  return(
    <ContentList>
      <List $active={selected && selected.active} $number={selected && selected.id}>
        {options.map((e) => <li key={e.id} onClick={() => setOption(e.id)}>{e.nome}</li>)}
      </List>
    </ContentList>
  )
}