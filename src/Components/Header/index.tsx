"use client";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { Box } from "../Box";
import { Icons } from "./Icons";
import { theme } from "@/styles/theme";
import Link from "next/link";

export function Header() {
  const Header = styled.header`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.color.secondary};
    height: 10vh;
    z-index: 5;

    & > div {
      height: 100%;
    }

    & > div > nav {
      height: 100%;
    }

    & > div > nav > ul {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5%;
    }
  `;
  const Li = styled.li`
    list-style: none;
    cursor: pointer;
    & > a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: ${(props) => props.theme.color.white};
      text-decoration: none;
    }
    p {
      transition: 0.3s all;
    }
    &:hover p {
      color: ${(props) => props.theme.color.primary};
    }
    &:hover svg path {
      fill: ${(props) => props.theme.color.primary};
    }
  `;
  const SubMenu = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 50vw;
    height: 91vh;
    background-color: ${props => props.theme.color.secondary};
    z-index: 1;

    & > ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding: 25px 35px;
        justify-content: flex-end;
    }

    & > ul > li > a{
        color: ${(props) => props.theme.color.white};
        text-decoration: none;
        padding: 10px;
    }

    & > ul > li > a > span{
        font-size: ${props => props.theme.font.headerLinks.size};
        font-weight: ${props => props.theme.font.headerLinks.weight};
        line-height: ${props => props.theme.font.headerLinks.height};
        transition: .3s all;
    }

    & > ul > li > a:hover > span{
        color: ${props => props.theme.color.primary};
        position: relative;
    }

    & > ul > li > a > span:before{
        width: 0;
        background-color: ${props => props.theme.color.primary};
        height: 2px;
        position: absolute;
        content: '';
        bottom: -2px;
    }

    & > ul > li > a:hover > span::before{
        background-color: ${props => props.theme.color.primary};
        width: 100%;
        animation: animationHoverLink .3s;
    }

    @keyframes animationHoverLink {
        from{
            width: 0;
        } to{
            width: 100%;
        }
    }
  `;
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <div>
          <nav>
            <ul>
              <Li>
                <Link href={"#"}>
                  <p>Cadastro</p>
                  <Icons icon="cadastro"></Icons>
                </Link>
              </Li>
              <Li>
                <Link href={"#"}>
                  <p>Manutenção</p>
                  <Icons icon="manutencao"></Icons>
                </Link>
              </Li>
              <Li>
                <Link href={"#"}>
                  <p>Home</p>
                  <Icons icon="home"></Icons>
                </Link>
              </Li>
              <Li>
                <Link href={"#"}>
                  <p>Baixa de aulas</p>
                  <Icons icon="baixaAulas"></Icons>
                </Link>
              </Li>
              <Li>
                <Link href={"#"}>
                  <p>Relatorios</p>
                  <Icons icon="relatorios"></Icons>
                </Link>
              </Li>
            </ul>
          </nav>
        </div>
      </Header>
      <SubMenu>
            <ul>
              <li>
                <Link href={"#"}>
                  <span>Administrador</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Agentes/Reagentes</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Aulas</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Equipamentos</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Fornecedor</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Laboratorio</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Matérias</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Professor</span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span>Vidrarias</span>
                </Link>
              </li>
            </ul>
        </SubMenu>
    </ThemeProvider>
  );
}
