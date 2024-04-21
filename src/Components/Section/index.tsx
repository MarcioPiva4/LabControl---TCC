"use client";
import { theme } from "@/styles/theme";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

interface propsSection {
  title?: string;
  children: React.ReactNode;
  direction: "row"|"column";
}

const SectionWrapper = styled.section`
  width: 100%;
  max-width: 90%;
  margin: 5vh auto;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.font.title.size};
  font-weight: ${(props) => props.theme.font.title.weight};
  line-height: ${(props) => props.theme.font.title.height};
  margin-bottom: 20px;
`;

const Content = styled.div.attrs<{$direction: "row"|"column"}>((props) => ({
  $direction: props.$direction || "column",
}))`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  flex-wrap: wrap;
`;

export default function Section({ title, children, direction }: propsSection) {
  return (
    <ThemeProvider theme={theme}>
      <SectionWrapper>
        <Title>{title}</Title>
        <Content $direction={direction}>{children}</Content>
      </SectionWrapper>
    </ThemeProvider>
  );
}
