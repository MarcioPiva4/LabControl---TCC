"use client";
import { theme } from "@/styles/theme";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

interface propsSection {
  title?: string;
  children: React.ReactNode;
  direction?: "row"|"column";
  bottom?: boolean;
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

const Content = styled.div.attrs<{$direction?: "row"|"column"; $bottom?: boolean;}>((props) => ({
  $direction: props.$direction || "column",
  $bottom: props.$bottom || false,
}))`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  flex-wrap: wrap;
  padding-bottom: ${(props) => props.$bottom ? '15vh' : '0px'}
`;

export default function Section({ title, children, direction, bottom }: propsSection) {
  return (
    <ThemeProvider theme={theme}>
      <SectionWrapper>
        <Title>{title}</Title>
        <Content $bottom={bottom} $direction={direction}>{children}</Content>
      </SectionWrapper>
    </ThemeProvider>
  );
}
