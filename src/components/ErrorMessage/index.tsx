'use client'
import { scrollTop } from "@/utils/scrollTop";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ErrorMessageWrapper = styled.p`
    color: #fff;
    text-align: center;
    padding: 10px;
    background-color: #ff5353;
    margin-bottom: 10px;
    font-weight: bold;
`;

export default function ErrorMessage({text, error}: {text: string, error: any}){
    const [textP, setTextP] = useState<string>(text);
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(error.error);
        scrollTop();
    }, [error])
    return(
        visible && 
        <ErrorMessageWrapper>{textP}</ErrorMessageWrapper>
    )
}