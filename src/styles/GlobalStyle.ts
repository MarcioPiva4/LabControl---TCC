"use client"
import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
  }
  body{
    background: ${props => props.theme.color.gradient};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: "Inter", sans-serif;
    overflow-x: hidden;
  }
  main{
    display: flex;
    flex-direction: column;
    flex: 1;
    @media screen and (min-width: 769px){
      padding-left: 213px;
    }
  }
`