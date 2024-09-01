'use client'
import { useState } from "react";
import styled from "styled-components";

interface Fornecedor {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
}

type Fornecedores = Fornecedor[];

interface PropsInputSelectCheckbox {
    id: string;
    values: Fornecedores;
    title?: string;
}

const Title = styled.h2`
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 3px;`;

const OptionsContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    label{
        border: 1px solid #fff;
        padding: 7px 15px;
        border-radius: 50px;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 8px;
        input{
            display: none;
        }

        button{
            font-size: 12px;
            border: 1px solid #fff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #041833;
            color: #fff;
            cursor: pointer;
        }
    }
`;

const ContentWrappaper = styled.div`
    width: 100%;
    padding: 10px 0 20px 0;
    position: relative;

    p{
        width: 100%;
        background-color: #fff;
        padding: 0 15px;
        border-radius: 50px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg{
            transition: 0.3s all;
        }
    }

    .active{
        svg{
            transform: rotate(-90deg);
        }
    }

    ul{
        background-color: #041833;
        color: #fff;
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        z-index: 100;
        width: 98.5%;
        border-radius: 0px 0px 15px 15px;
        li{
            padding: 7px 20px;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            &:hover{
                background-color: #0c3b78;
            }
        }
    }
`;

export default function InputSelectCheckbox({id, values, title}: PropsInputSelectCheckbox){
    const [open, setOpen] = useState<boolean | null>(null);
    const [list, setList] = useState(values.map(e => ({
        ...e,
        isSelected: false
      })));

    function disableItem(id: number){
        const updatedList = list.map((e) => e.id == id ? { ...e, isSelected: true } : { ...e });
        setList(updatedList);
    }

    function removeItem(id: number){
        const updatedList = list.map((e) => e.id == id ? { ...e, isSelected: false } : { ...e });
        setList(updatedList);
    }
    return(
        <div>
            <Title>{title}</Title>
            <OptionsContent>
                {list.map((e) => e.isSelected ? 
                    <label key={e.id}>{e.nome}
                        <input type="checkbox" name={id} value={e.id.toString()} defaultChecked></input>
                        <button type="button" onClick={() => removeItem(e.id)}>X</button>
                    </label> 
                    : null) 
                }
            </OptionsContent>
            <ContentWrappaper onClick={() => setOpen(!open)}>
                <p className={open ? 'active' : ''}>
                    SELECIONE 
                    <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.217285 9.5L11.3042 0.839745L11.3042 18.1603L0.217285 9.5Z" fill="#041833"/>
                    </svg>
                </p>
                {open && 
                <ul>
                    {values.map(e => <li key={e.id} id={e.id.toString()} onClick={() => disableItem(e.id)}>{e.nome}</li>)}
                </ul>
                }
            </ContentWrappaper>
        </div>
    )
}