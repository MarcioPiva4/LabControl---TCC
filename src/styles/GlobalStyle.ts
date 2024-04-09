"use client"
import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
  }
  body{
    background: linear-gradient(180deg, rgba(21,69,128,1) 0%, rgba(4,24,51,1) 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: "Inter", sans-serif;
  }
`