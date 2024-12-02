"use client";

import { FilterAula } from "@/components/FilterAula";
import Select from "@/components/Select";
import { AulaItems, AulaReq } from "@/types/aula";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";



const ContentAulas = styled.div.attrs<{ $finish?: boolean }>((props) => ({
  $finish: props.$finish || false,
}))`
    ul {
        display: flex;
        flex-direction: row;
        gap: 15px;
        justify-content: flex-start;
        @media screen and (max-width: 1030px){
          justify-content: center;
        }
        align-items: center;
        flex-wrap: wrap;

        li {
            background-color: #fff;
            border-radius: 15px;
            width: 100%;
            max-width: 400px;
            height: 100%;
            min-height: 100px;
            display: flex;
            max-width: 370px;
            
            a {
                width: 100%;
                height: auto;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;

                .aulas_content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    padding-right: 20px;
                    
                    p {
                        font-size: 16px;
                        line-height: 20px;
                        font-weight: 500;
                        color: #747474;
                        width: 100%;
                        overflow: hidden;
                        max-height: 20px;
                    }
                }

                .status_content {
                    span {
                        display: block;
                        width: 15px;
                        height: 15px;
                        background-color: ${(props) => props.$finish ? '#8aff99' : '#FF04D7'};
                        border-radius: 50%;
                        border: 1.5px solid #C5C5C5;
                    }
                }
            }
        }
    }

    .no_results {
      background-color: #041833;
      color: #ffffff;
      border: 1px solid #f5c6cb;
      padding: 15px 25px;
      border-radius: 8px;
      font-size: 16px;
      margin-top: 20px;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s ease-out;
      margin-bottom: 20px;
      a{
        color: #c5c5c5;
        font-weight: bold;
      }
    }
`;

export default function BaixaAulas({ aulas }: { aulas: AulaReq | AulaItems[] }) {
  const [dataAulas, setDataAulas] = useState<AulaItems[]>(
    'data' in aulas ? aulas.data : aulas
  );
  return (
    dataAulas && (
      <>
        <FilterAula></FilterAula>
        <ContentAulas>
          <ul>
            {dataAulas.length > 0 ? (
              dataAulas?.map((e) => (
                <li key={e.id}>
                  <Link href={`baixa-aulas/finalizar/${e.id}`}>
                    <div className="aulas_content">
                      <p>Matéria: {e.materias[0]?.nome}</p>
                      <p>Tópico da Aula: {e.topico_aula}</p>
                      <p>Professor: {e.professores[0]?.nome} </p>
                      <p>Laboratório: {e.laboratorios[0]?.nome}</p>
                      <p>Data: {e.data}</p>
                    </div>

                    <div className="status_content">
                      <span
                        className="status"
                        style={
                          e.status == "in progress"
                            ? { backgroundColor: "#FF04D7" }
                            : { background: "#8aff99" }
                        }></span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="no_results">Nenhuma aula encontrada, cadastre novas aulas <Link href={'/cadastro/aula'}>aqui</Link></p>
            )}
          </ul>
        </ContentAulas>
      </>
    )
  );
}
