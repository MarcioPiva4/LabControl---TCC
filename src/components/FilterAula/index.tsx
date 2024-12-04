"use client";

import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const ContentFilters = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  padding-bottom: 15px;
  flex-direction: column;

  .selects {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    border-bottom: 1px solid white;
    padding-bottom: 15px;

    .select {
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 20px;
      padding: 3px 10px;
      color: #fff;
      border: 1.5px solid #ccd1d2;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.1px;
      width: fit-content;
      cursor: pointer;
    }
  }

  .results {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .result {
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 20px;
      padding: 3px 10px;
      color: #fff;
      border: 1.5px solid #ccd1d2;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.1px;
      width: fit-content;
      cursor: pointer;
    }

    .clear_all {
      background-color: #fff;
      color: #000 !important;
      font-weight: 400;
      cursor: pointer;
      text-decoration: none;
    }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;

  .dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    line-height: 20px;
    padding: 8px 12px;
    color: #fff;
    border: 1.5px solid #ccd1d2;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.1px;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 110%;
    left: 0;
    background-color: #333;
    border: 1px solid #ccd1d2;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 10;
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;

    &.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-item {
      padding: 8px 12px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: block;
      text-decoration: none;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

export function FilterAula({ manutencao }: { manutencao?: boolean }) {
  const [isDropdownOpenData, setIsDropdownOpenData] = useState(false);
  const [isDropdownOpenType, setIsDropdownOpenType] = useState(false);
  const [filter, setFilter] = useState<string>("");

  const toggleDropdownData = () => {
    setIsDropdownOpenData((prev) => !prev);
  };

  const toggleDropdownType = () => {
    setIsDropdownOpenType((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpenData(false);
    setIsDropdownOpenType(false);
  };

  const handleSelect = (item: string) => {
    setFilter(item); // Replace the current filter with the new selection
    closeDropdown();
  };

  const clearFilter = () => {
    setFilter(""); // Clear the selected filter
  };

  const generateUrl = (filterKey: string, filterValue: string) => {
    const currentUrl = new URL(window.location.href);
    const currentQueryParams = new URLSearchParams(currentUrl.search);
    currentQueryParams.set(filterKey, filterValue);

    return `${currentUrl.pathname}?${currentQueryParams.toString()}`;
  };

  return (
    <ContentFilters>
      <div className="selects">
        <DropdownWrapper>
          <div
            className="dropdown-trigger"
            onClick={toggleDropdownData}
            onBlur={closeDropdown}
            tabIndex={0}>
            Publicado em
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.75 7.5L9 11.25L5.25 7.5L12.75 7.5Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
          </div>
          <div className={`dropdown-menu ${isDropdownOpenData ? "open" : ""}`}>
            <Link
              href={generateUrl("publicado", "hoje")}
              className="dropdown-item"
              onClick={() => handleSelect("Hoje")}>
              Hoje
            </Link>
            <Link
              href={generateUrl("publicado", "ontem")}
              className="dropdown-item"
              onClick={() => handleSelect("Ontem")}>
              Ontem
            </Link>
            <Link
              href={generateUrl("publicado", "estaSemana")}
              className="dropdown-item"
              onClick={() => handleSelect("Esta semana")}>
              Esta Semana
            </Link>
            <Link
              href={generateUrl("publicado", "ultimaSemana")}
              className="dropdown-item"
              onClick={() => handleSelect("Última semana")}>
              Última semana
            </Link>
            <Link
              href={generateUrl("publicado", "ultimoMes")}
              className="dropdown-item"
              onClick={() => handleSelect("Último mês")}>
              Último mês
            </Link>
          </div>
        </DropdownWrapper>

        {!manutencao && (
          <DropdownWrapper>
            <div
              className="dropdown-trigger"
              onClick={toggleDropdownType}
              onBlur={closeDropdown}
              tabIndex={0}>
              Progresso
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.75 7.5L9 11.25L5.25 7.5L12.75 7.5Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </div>
            <div
              className={`dropdown-menu ${isDropdownOpenType ? "open" : ""}`}>
              <Link
                href={generateUrl("status", "progresso")}
                className="dropdown-item"
                onClick={() => handleSelect("Em processo")}>
                Em processo
              </Link>
              <Link
                href={generateUrl("status", "finalizada")}
                className="dropdown-item"
                onClick={() => handleSelect("Finalizada")}>
                Finalizada
              </Link>
            </div>
          </DropdownWrapper>
        )}
      </div>

      <div className="results">
        {filter ? (
          <div className="result">{filter}</div>
        ) : (
          <div className="result">Selecione um filtro</div>
        )}
        <Link
          href={window.location.pathname}
          className="result clear_all"
          onClick={clearFilter}>
          Limpar todos
        </Link>
      </div>
    </ContentFilters>
  );
}
