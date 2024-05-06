"use client";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";

const MenuWrapper = styled.div`
    position: fixed;
    background-color: #FFFFFF;
    width: 90%;
    height: 40%;
    display: flex;
    justify-content: cneter;
    align-items: center;
    border-radius: 20px;

    div{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 25px;
        h2{
            color: #041833;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            line-height: 29.05px;
        }
        button{
            width: 100%;
            height: 50px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 17px;
            font-weight: 700;
            line-height: 21px;
        }
        button:nth-child(2){
            background: ${props => props.theme.color.gradient};
            color: #fff;
        }
    }
`;

export default function MenuSubmit(){
    return(
    <ThemeProvider theme={theme}>
        <MenuWrapper>
            <div>
            <h2>Cadastrar novamente?</h2>
            <button type="submit">SIM</button>
            <button type="submit">NÃO</button>
            </div>
        </MenuWrapper>
      </ThemeProvider>
    )
  }
           