"use client";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

interface propsSection {
  title?: string;
  children: React.ReactNode;
  direction?: "row"|"column";
  bottom?: boolean;
  arrowBefore?: boolean;
  href?: string;
}

const SectionWrapper = styled.section`
  width: 100%;
  margin: 5vh auto;
  max-width: 800px;
  padding: 0 20px;

  .svg{
    margin-bottom: 20px;
    cursor: pointer;
    aspect-ratio: auto;
  }
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
export default function Section({ title, children, direction, bottom, arrowBefore, href}: propsSection) {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <SectionWrapper>
        {arrowBefore && <svg className="svg" onClick={() => router.push(href ?? '/')} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.69375 15.75L16.4937 25.55L14 28L0 14L14 0L16.4937 2.45L6.69375 12.25H28V15.75H6.69375Z" fill="white"/></svg>}
        <Title>{title}</Title>
        <Content $bottom={bottom} $direction={direction}>{children}</Content>
      </SectionWrapper>
    </ThemeProvider>
  );
}
