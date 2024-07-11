"use client";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

interface propTextArea {
    labelText?: string;
    id: string;
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
  `;
  
  export default function TextArea({ labelText, id }: propTextArea) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Label>{labelText}</Label>
          <TextAreaWrapper id={id} name={id}></TextAreaWrapper>
        </ThemeProvider>
      </>
    );
  }