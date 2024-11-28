"use client";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

interface propTextArea {
  labelText?: string;
  id: string;
  length?: boolean;
  value?: string;
  readOnly?: boolean;
  reset?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

  &:read-only {
    color: #fff;
    background-color: #b3b3b3;
    cursor: unset;
  }
`;

const MaxLengthWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    right: 29px;
    bottom: 33px;
  }
`;

export default function TextArea({
  labelText,
  id,
  length,
  value,
  readOnly,
  reset,
  onChange,
}: propTextArea) {
  const [caracteres, setCaracteres] = useState<number>(0);
  const [valueTextBox, setValueTextBox] = useState<string>("");

  useEffect(() => {
    if (value) {
      setValueTextBox(value);
      setCaracteres(value.length);
    }
  }, [value]);

  const textAreaLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, 255);
    setCaracteres(newValue.length);
    setValueTextBox(newValue);
    if (onChange) onChange(e);
  };

  useEffect(() => {
    if (reset) {
      setValueTextBox('');
      setCaracteres(0);
    }
  }, [reset]);

  return (
    <ThemeProvider theme={theme}>
      <Label>{labelText}</Label>
      {length ? (
        <MaxLengthWrapper>
          <TextAreaWrapper
            id={id}
            name={id}
            value={valueTextBox}
            onChange={textAreaLength}
            readOnly={readOnly}
          />
          <span>{caracteres} / 255</span>
        </MaxLengthWrapper>
      ) : (
        <TextAreaWrapper
          id={id}
          name={id}
          value={valueTextBox}
          onChange={textAreaLength}
          readOnly={readOnly}
        />
      )}
    </ThemeProvider>
  );
}
