'use client'

import Select from "@/components/Select";
import Link from "next/link";
import { useEffect, useState } from "react"
import styled from "styled-components";

const ContentFilters = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    padding-bottom: 15px;
    flex-direction: column;

    .selects{
        display: flex;
        gap: 10px;
        flex-direction: column;
        width: 100%;
        border-bottom: 1px solid white;
        padding-bottom: 15px;

        .select{
            display: flex;
            align-items: center;
            gap: 8px;
            line-height: 20px;
            padding: 3px 10px;
            color: #fff;
            border: 1.5px solid #CCD1D2;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0.1px;
            width: fit-content;
            cursor: pointer;
        }
    }
    .results{
        width: 100%;
        height: 100%;

        .result{
            display: flex; 
            align-items: center; 
            gap: 8px; 
            line-height: 20px; 
            padding: 3px 10px; 
            color: #fff; 
            border: 1.5px solid #CCD1D2; 
            border-radius: 50px; 
            font-size: 14px; 
            font-weight: 400; 
            letter-spacing: 0.1px;
            width: fit-content; 
            cursor: pointer; 
        }

        .clear_all{
            background-color: #fff;
            color: #000 !important;
            font-weight: 400;
        }
    }
`;

const ContentAulas = styled.div`
    ul{
        display: flex;
        flex-direction: column;
        gap: 15px;
        justify-content: center;
        align-items: center;
        li{
            background-color: #fff;
            border-radius: 15px;
            width: 100%;
            max-width: 400px;
            height: 100%;
            min-height: 100px;
            display: flex;
            a{
                width: 100%;
                height: auto;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;

                .aulas_content{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    padding-right: 20px;
                    p{
                        font-size: 16px;
                        line-height: 20px;
                        font-weight: 500;
                        color: #747474;
                        width: 100%;
                        overflow: hidden;
                        max-height: 20px;
                    }
                }

                .status_content{
                    span{
                        display: block;
                        width: 15px;
                        height: 15px;
                        background-color: #FF04D7;
                        border-radius: 50%;
                        border: 1.5px solid #C5C5C5;
                    }
                }
            }
        }
    }
`;

export default function BaixaAulas({ aulas, professores }: {aulas: any; professores: any}){
    const [dataAulas, setDataAulas] = useState(aulas.data);
    return(
        <>
            <ContentFilters>
                <div className="selects">
                    <div className="select">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_362_9870)">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="white" fill-opacity="0.5"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_362_9870">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                            Publicado em

                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 7.5L9 11.25L5.25 7.5L12.75 7.5Z" fill="white" fill-opacity="0.5"/>
                        </svg>
                    </div>

                    <div className="select">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_362_9876)">
                            <path d="M2.01 4C2.01 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22L2.01 4ZM4 4V17.17L5.17 16H20V4H4Z" fill="white" fill-opacity="0.5"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_362_9876">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        Emenda Institucional
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 7.5L9 11.25L5.25 7.5L12.75 7.5Z" fill="white" fill-opacity="0.5"/>
                        </svg>
                    </div>

                    <div className="select">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_362_9882)">
                            <path opacity="0.5" d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 15C14.7 15 17.8 16.29 18 17V18H6V17.01C6.2 16.29 9.3 15 12 15ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_362_9882">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        Professor
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="white" fill-opacity="0.5"/>
                        </svg>
                    </div>
                </div>

                <div className="results">
                    <div className="result clear_all">
                        Clear all
                    </div>
                </div>
            </ContentFilters>

            <ContentAulas>
                <ul>
                    {dataAulas?.map((e: any, i: number) => (
                        <>
                            <li key={e.id}>
                                <Link href={`baixa-aulas/finalizar/${e.id}`}>
                                    <div className="aulas_content">
                                        <p>Matéria: { e.materias[0]?.nome }</p>
                                        <p>Tópico da Aula: {e.topico_aula}</p>
                                        <p>Professor: { e.professores[0]?.nome } </p>
                                        <p>Laboratório: { e.laboratorios[0]?.nome }</p>
                                        <p>Data: {e.data}</p>
                                    </div>

                                    <div className="status_content">
                                        <span className="status"></span>
                                    </div>
                                </Link>
                            </li>
                        </>
                    ))}
                </ul>
            </ContentAulas>
        </>
    )
}