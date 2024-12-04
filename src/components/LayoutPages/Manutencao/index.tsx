/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FilterAula } from "@/components/FilterAula";
import { AulaItems, AulaReq } from "@/types/aula";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ContentAulas = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: flex-start;
    @media screen and (max-width: 1030px) {
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
            background-color: #ff04d7;
            border-radius: 50%;
            border: 1.5px solid #c5c5c5;
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
    a {
      color: #c5c5c5;
      font-weight: bold;
    }
  }
`;

export default function Manutencao({ aulas }: { aulas: AulaReq }) {
  const [dataAulas, setDataAulas] = useState<AulaItems[]>(aulas.data);
  useEffect(() => {
    const aulas = dataAulas.filter((e) => e.status != "finish") as any;
    setDataAulas(aulas);
  }, []);

  const searchParams = useSearchParams();
  const session = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = searchParams.toString();
      try {
        const response = await fetch(`/api/aula/filter?${queryParams}`, {cache: 'no-store', headers: {
          "Authorization": `Bearer ${session?.data?.token}`,
          "X-User-Email": session?.data?.user.email as string,
          "X-User-Role": session?.data?.user.role as string
        }});
        const data = await response.json() as AulaReq;
        setDataAulas(data.data.filter((e) => e.status != "finish"));
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      }
    };

    if (searchParams) {
      fetchData(); 
    }
  }, [searchParams]); 

  return (
    dataAulas && (
      <>
        <FilterAula manutencao></FilterAula>

        <ContentAulas>
          <ul>
            {dataAulas.length > 0 ? (
              dataAulas?.map((e) => (
                <li key={e.id}>
                  <Link href={`manutencao/editar/${e.id}`}>
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
              <p className="no_results">
                Nenhuma aula encontrada
              </p>
            )}
          </ul>
        </ContentAulas>
      </>
    )
  );
}
