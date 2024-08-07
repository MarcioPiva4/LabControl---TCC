"use client";
import { theme } from "@/styles/theme";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

export interface OptionType {
  id: number;
  nome: string | React.ReactNode;
  abr: string | React.ReactNode;
  active: boolean;
  icon?: boolean;
  value: string;
}
interface PropInput {
  label?: string;
  idInput?: string;
  placeHolder?: string;
  type: "text" | "number" | "search" | "email" | "hidden" | "date" | "checkbox" ;
  selectAside?: boolean;
  optionsFakeSelect?: Array<OptionType>;
  icon?: boolean;
  selectRef?: any;
  max?: number;
  min?: number;
  dynamicOption?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
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

  &[type=number]::-webkit-inner-spin-button { 
      -webkit-appearance: none;
  }
  &[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &:read-only{
    color: #fff;
    background-color: #b3b3b3;
    cursor: unset;
  }
`;

export default function Input({
  label,
  idInput,
  placeHolder,
  type,
  selectAside,
  optionsFakeSelect,
  icon,
  selectRef,
  max,
  min,
  value,
  onChange,
  readOnly,
}: PropInput) {
  return (
    <ThemeProvider theme={theme}>
      {label && <Label>{label}</Label>}
      <ContentInput style={type == 'hidden' ? {display: 'none'} : {}}>
        <InputWrapper
          placeholder={placeHolder}
          id={idInput}
          name={idInput}
          type={type}
          maxLength={max}
          minLength={min}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        {selectAside && optionsFakeSelect && (
          <SelectVariant
            selectRef={selectRef}
            icon={icon}
            options={optionsFakeSelect}
          />
        )}
      </ContentInput>
    </ThemeProvider>
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
  border-radius: ${(props) => (props.$active ? '0 15px 0px 0' : '0 45px 45px 0')};
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  gap: 10px;

  p {
    opacity: ${(props) => (props.$active ? '0' : '1')};
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    transition: .3s all;
    transform: ${(props) => (props.$active ? 'rotate(-90deg)' : 'rotate(0)')};
  }
`;

function SelectVariant({ selectRef, icon, options }: { selectRef?: any; icon?: boolean; options: Array<OptionType>; }) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [values, setValues] = useState<Array<OptionType>>(options);

  const selected = values.find((e) => e.active);

  function setOption(id: number) {
    const updatedValues = values.map((e) => ({
      ...e,
      active: e.id === id,
    }));
    setValues(updatedValues);
    setOpenSelect(false);
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
        />
      </ContentSelect>
      <FakeSelect
        openSelect={openSelect}
        selectRef={selectRef}
        icon={icon}
        options={values}
        setOption={setOption}
        selected={selected}
      />
    </>
  );
}

const ContentList = styled.div.attrs<{$icon: boolean}>((props) => ({
  $icon: props.$icon,
}))`
  position: absolute;
  background-color: ${(props) => props.theme.color.secondary};
  right: -1px;
  width: ${(props) => (props.$icon ? '30%' : '60%')};
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

  li {
    cursor: pointer;
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
    padding: 7px 10px;

    &:nth-child(${(props) => props.$number}) {
      background-color: ${(props) => (props.$active ? '#0c3b78' : '')};
    }

    &:hover {
      background-color: #0c3b78;
    }

    svg {
      width: 100%;
    }
  }
`;

function FakeSelect({ openSelect, selectRef, icon, options, setOption, selected }: { openSelect: boolean; selectRef?: any; icon?: boolean; options: Array<OptionType>; setOption: any; selected: any; }) {
  useEffect(() => {
    if (selectRef?.current && selected) {
      selectRef.current.value = selected.value;
    }
  }, [selectRef, selected]);

  return (
    <ContentList $icon={icon ?? false} style={openSelect ? {} : { display: 'none' }}>
      <List $active={selected && selected.active} $number={selected && selected.id}>
        {options.map((e) => <li key={e.id} onClick={() => setOption(e.id)}>{e.nome}</li>)}
      </List>
      <select ref={selectRef} style={{ display: 'none' }}>
        {options.map((e) => <option key={e.id} value={e.value}>{e.value}</option>)}
      </select>
    </ContentList>
  );
}
