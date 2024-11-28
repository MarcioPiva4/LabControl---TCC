'use client'

import { scrollTop } from "@/utils/scrollTop";
import { useEffect, useState } from "react";
import styled from "styled-components"

const ButtonBackTopWrappaer = styled.div`
    position: fixed;
    bottom: 90px;
    z-index: 100;
    right: 10px;

    button{
        outline: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        background-color: #083066;
        border-radius: 10px;
        width: 80px;
        border: 1px solid #fff;
        svg{
            width: 3em;
            height: 3em;
            padding: 8px;
        }
    }
`;

export default function ButtonBackTop(){
    const [visible, setVisible] = useState<boolean | null>(null);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY; 
            if(scrollPosition >= 200){
                setVisible(true);
            }else {
                setVisible(false);
            }
          });
    
    }, []);

    return(
        visible && (
            <ButtonBackTopWrappaer>
                <button onClick={() => scrollTop()}> 
                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <polyline 
                            points="5,80 50,20 95,80" 
                            fill="none" 
                            stroke="#fff" 
                            strokeWidth="10" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                </button>
            </ButtonBackTopWrappaer>
        )
    )
}