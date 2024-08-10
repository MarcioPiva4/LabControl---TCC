"use client";

import { useEffect, useRef, useState } from "react";
import { OptionType } from "../Input";
import styled from "styled-components";
import Image from "next/image";

const ContentSelect = styled.div.attrs<{ $active?: boolean }>((props) => ({
  $active: props.$active,
}))`
  position: absolute;
  top: 0;
  right: -1px;
  background-color: ${(props) => props.theme.color.secondary};
  height: 100%;
  border-radius: ${(props) =>
    props.$active ? "0 15px 0px 0" : "0 45px 45px 0"};
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  gap: 10px;

  p {
    opacity: ${(props) => (props.$active ? "0" : "1")};
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    transition: 0.3s all;
    transform: ${(props) => (props.$active ? "rotate(-90deg)" : "rotate(0)")};
  }
`;

export function SelectVariant({
  selectRef,
  icon,
  options,
}: {
  selectRef?: any;
  icon?: boolean;
  options: Array<OptionType>;
}) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [values, setValues] = useState<Array<OptionType>>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = values.find((e) => e.active);

  function setOption(id: number) {
    const updatedValues = values.map((e) => ({
      ...e,
      active: e.id === id,
    }));
    setValues(updatedValues);
    setOpenSelect(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target)) {
      setOpenSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [containerRef, openSelect]);

  return (
    <div ref={containerRef}>
      <ContentSelect
        onClick={() => setOpenSelect(!openSelect)}
        $active={openSelect}>
        <p>{selected ? selected.abr : "Selecione"}</p>
        <Image
          src="/inputArrow.svg"
          alt="Ícone de seta virada para a esquerda"
          width={15}
          height={15}
        />
      </ContentSelect>
      <FakeSelect
        openSelect={openSelect}
        selectRef={selectRef}
        icon={icon}
        options={values}
        setOption={setOption}
        selected={selected}
      />
    </div>
  );
}

const ContentList = styled.div.attrs<{ $icon: boolean }>((props) => ({
  $icon: props.$icon,
}))`
  position: absolute;
  background-color: ${(props) => props.theme.color.secondary};
  right: -1px;
  width: ${(props) => (props.$icon ? "30%" : "60%")};
  z-index: 5;
  border-radius: 0px 0px 15px 15px;
`;

const List = styled.ul.attrs<{ $active: boolean; $number: number }>(
  (props) => ({
    $active: props.$active,
    $number: props.$number,
  })
)`
  list-style: none;
  padding: 15px 0 15px 0px;
  height: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  li {
    cursor: pointer;
    color: ${(props) => props.theme.color.white};
    font-size: ${(props) => props.theme.font.label.size};
    font-weight: ${(props) => props.theme.font.label.weight};
    line-height: ${(props) => props.theme.font.label.height};
    padding: 7px 10px;

    &:nth-child(${(props) => props.$number}) {
      background-color: ${(props) => (props.$active ? "#0c3b78" : "")};
    }

    &:hover {
      background-color: #0c3b78;
    }

    svg {
      width: 100%;
    }
  }
`;

function FakeSelect({
  openSelect,
  selectRef,
  icon,
  options,
  setOption,
  selected,
}: {
  openSelect: boolean;
  selectRef?: any;
  icon?: boolean;
  options: Array<OptionType>;
  setOption: any;
  selected: any;
}) {  
  useEffect(() => {
    if (selectRef?.current && selected) {
      selectRef.current.value = selected.value;
    }
  }, [selectRef, selected]);

  return (
    <ContentList
      $icon={icon ?? false}
      style={openSelect ? {} : { display: "none" }}>
      <List
        $active={selected && selected.active}
        $number={selected && selected.id}>
        {options.map((e) => (
          <li key={e.id} onClick={() => setOption(e.id)}>
            {e.nome}
          </li>
        ))}
      </List>
      <select ref={selectRef} style={{ display: "none" }}>
        {options.map((e) => (
          <option key={e.id} value={e.value}>
            {e.value}
          </option>
        ))}
      </select>
    </ContentList>
  );
}
