"use client";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";

interface propBoxList {
  title: string;
  description?: string;
  src?: string;
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: auto;
  padding: 10px;
`;

const Figure = styled.figure`
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
    color: ${props => props.theme.color.white};
    text-align: left;
    font-size: ${props => props.theme.font.subtitle.size};
    font-weight: ${props => props.theme.font.subtitle.weight};
    line-height: ${props => props.theme.font.subtitle.height};
`;

const Paragraph = styled.p`
    color: ${props => props.theme.color.white};
    text-align: left;
    font-size: ${props => props.theme.font.text.size};
    font-weight: ${props => props.theme.font.text.weight};
    line-height: ${props => props.theme.font.text.height};
`;

export default function BoxList({
  title,
  description,
  src,
}: propBoxList) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <div>
          <Figure>image</Figure>
        </div>
        <div>
          {title && <Title>{title}</Title>}
          {description && <Paragraph>{description}</Paragraph>}
        </div>
      </Box>
    </ThemeProvider>
  );
}
