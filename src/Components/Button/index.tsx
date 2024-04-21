"use client";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";

interface PropButton {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  is: "isTransparent" | "isNotTransparent";
  icon?: boolean;
}

const ButtonWrapper = styled.button.attrs<{
  $is: boolean;
  $icon?: boolean;
}>((props) => ({
  $is: props.$is || false,
  $icon: props.$icon || false,
}))`
    width: 100%;
    padding: 5px 15px;
    height: 50px;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    margin-top: 10px;
    font-size: ${(props) => props.theme.font.button.size};
    font-weight: ${(props) => props.theme.font.button.weight};
    line-height: ${(props) => props.theme.font.button.height};
    background-color: ${(props) => props.$is ? props.theme.color.primary : 'transparent'};
    color: ${(props) => props.$is ? props.theme.color.secondary : props.theme.color.primary};
    border: 1px solid ${(props) => props.$is ? props.theme.color.primary : props.theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    gap:  ${(props) => props.$icon ? '15px' : '0'};
    transition: .3s all;
    & > svg > path{
        transition: .3s all;
    }
    &:hover{
        background-color: ${(props) => props.$is ? 'transparent' : props.theme.color.primary};
        color: ${(props) => props.$is ? props.theme.color.primary : props.theme.color.secondary};
        & > svg > path{
            fill: ${(props) => props.theme.color.primary}
        }
    }
`;
export default function Button({ type, children, is, icon }: PropButton) {
  return (
    <ThemeProvider theme={theme}>
        <ButtonWrapper $icon={icon} $is={is === "isNotTransparent"} type={type}>{children}</ButtonWrapper>
    </ThemeProvider>
  );
}
