"use client";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

interface propTextArea {
  labelText?: string;
  id: string;
  length?: boolean;
}

const Label = styled.label`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  line-height: ${(props) => props.theme.font.label.height};
  margin-bottom: 3px;
`;

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
  overflow: hidden;
`;

const MaxLengthWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    right: 29px;
    bottom: 33px;
  }
`;

export default function TextArea({ labelText, id, length }: propTextArea) {
  const [caracteres, setCaracteres] = useState<number>(0);
  function textAreaLength(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value.slice(0, 255);
    setCaracteres(value.length);
    e.target.value = value;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Label>{labelText}</Label>
        {length ? (
          <MaxLengthWrapper>
            <TextAreaWrapper
              id={id}
              name={id}
              onChange={(e) => textAreaLength(e)}></TextAreaWrapper>
            <span>{caracteres} / 255</span>
          </MaxLengthWrapper>
        ) : (
          <TextAreaWrapper id={id} name={id}></TextAreaWrapper>
        )}
      </ThemeProvider>
    </>
  );
}
