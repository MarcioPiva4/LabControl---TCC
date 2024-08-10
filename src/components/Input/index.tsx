"use client";
import { theme } from "@/styles/theme";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { SelectVariant } from "../FakeSelect";

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
