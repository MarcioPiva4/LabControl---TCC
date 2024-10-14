import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";

interface PropSelect {
  options: Array<{ nome: string; id: string }>;
  id: string;
  selectLabel: string;
  onChange?: (e: string) => void;
  value?: string;
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
`;

const OptionsList = styled.div.attrs<{ isOpen: boolean }>(({ isOpen }) => ({
  style: {
    maxHeight: isOpen ? '195px' : '0',
    border: isOpen ? '1px solid #0c3b78' : 'none',
  },
}))<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 8px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
  z-index: 1;
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#84EEC1" : "#041833")};
  color: ${(props) => (props.isSelected ? "#041833" : "#fff")};

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
}: PropSelect) {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
    setIsOpen(false);
    if (onChange) {
      onChange(id);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [containerRef]);

  return (
    <ThemeProvider theme={theme}>
      <Label>{selectLabel}</Label>
      <SelectContainer>
        <SelectedOption onClick={() => setIsOpen(!isOpen)}>
          {options.find((opt) => opt.id === selectedOption)?.nome || "Selecione uma opção"}
        </SelectedOption>

        <OptionsList isOpen={isOpen} ref={containerRef}>
          {options.map((e) => (
            <Option
              key={e.id}
              isSelected={e.id == selectedOption} 
              onClick={() => handleOptionClick(e.id)}
            >
              {e.nome}
            </Option>
          ))}
        </OptionsList>
      </SelectContainer>

      <input type="hidden" id={id} name={id} value={selectedOption} readOnly />
    </ThemeProvider>
  );
}
