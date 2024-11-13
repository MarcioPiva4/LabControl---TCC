import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { MateriaItems } from "@/types/materia";
import { ProfessorItems } from "@/types/professor";
import { LaboratorioItems } from "@/types/laboratorio";

interface PropSelect {
  options: Array<{ nome: string; id: string; }> | MateriaItems[] | ProfessorItems[] | LaboratorioItems[];
  id: string;
  selectLabel: string;
  onChange?: (e: string | number) => void;
  value?: string | number;
  readOnly?: boolean;
}

const Label = styled.label`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  line-height: ${(props) => props.theme.font.label.height};
  margin-bottom: 3px;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const SelectedOption = styled.div`
  width: 100%;
  padding: 8px 15px;
  border-radius: 50px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &.disabled{
    color: #fff;
    background-color: #b3b3b3;
    cursor: unset;
  }
`;

const OptionsList = styled.div.attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  style: {
    maxHeight: $isOpen ? '195px' : '0',
    border: $isOpen ? '1px solid #0c3b78' : 'none',
  },
}))<{ $isOpen: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 8px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
  z-index: 1;
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#84EEC1" : "#041833")};
  color: ${(props) => (props.selected ? "#041833" : "#fff")};

  &:hover {
    background-color: #84EEC1;
    color: #041833;
  }
`;

export default function FakeSelect({
  options,
  id,
  selectLabel,
  value,
  onChange,
  readOnly
}: PropSelect) {
  const [selectedOption, setSelectedOption] = useState<string | number>(value || "");
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleOptionClick = (id: string | number) => {
    setSelectedOption(id);
    setIsOpen(false);
    if (onChange) {
      onChange(id);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Label>{selectLabel}</Label>
      <SelectContainer ref={containerRef}>
        <SelectedOption onClick={() => setIsOpen((prev) => !prev)} className={readOnly ? 'disabled' : ''}>
          {options.find((opt) => opt.id === selectedOption)?.nome || "Selecione uma opção"}
        </SelectedOption>

        {!readOnly &&
        <OptionsList $isOpen={isOpen}>
          {options.map((e) => (
            <Option
              key={e.id}
              selected={e.id === selectedOption}
              onClick={() => handleOptionClick(e.id)}
            >
              {e.nome}
            </Option>
          ))}
        </OptionsList>
        }
      </SelectContainer>

      <input type="hidden" id={id} name={id} value={selectedOption} readOnly />
    </ThemeProvider>
  );
}
