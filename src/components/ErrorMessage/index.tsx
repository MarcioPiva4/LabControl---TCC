'use client'
import styled from "styled-components";

const ErrorMessageWrapper = styled.p`
    color: #fff;
    text-align: center;
    padding: 10px 0;
    background-color: #ff5353;
    margin-bottom: 10px;
    font-weight: bold;
`;

export default function ErrorMessage({text}: {text: string}){
    return(
        <ErrorMessageWrapper>{text}</ErrorMessageWrapper>
    )
}