"use client";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";

interface PropInput {
  label?: string;
  idInput?: string;
  placeHolder?: string;
  type: "text" | "number" | "search" | "select";
  options?: Array<{
    value: string;
  }>;
}

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
  margin-bottom: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black};

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
}: PropInput) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {label && <Label>{label}</Label>}
        {type != "select" ? (
          <InputWrapper
            placeholder={placeHolder}
            id={idInput}
            name={idInput}
            type={type}
          ></InputWrapper>
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
