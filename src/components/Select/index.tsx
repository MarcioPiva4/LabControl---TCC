import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";

interface PropSelect {
    options?: Array<{name: string; id: string}>;
    id: string;
    selectLabel: string;
    onChange?: (e: React.ChangeEvent<any>) => void;
    value?: string;
}

const Label = styled.label`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.font.label.size};
  font-weight: ${(props) => props.theme.font.label.weight};
  line-height: ${(props) => props.theme.font.label.height};
  margin-bottom: 3px;
`;

const SelectWrapper = styled.select`
    margin-bottom: 20px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 30px;
    padding: 0 15px;
    color: #000;
    font-size: 16px;
    font-weight: 500;
`;

export default function Select({options, id, selectLabel, value, onChange}: PropSelect){
    return(
        <>
          <ThemeProvider theme={theme}>
            <Label>{selectLabel}</Label>
            <SelectWrapper id={id} name={id} value={value} onChange={onChange}>
            {options?.map((e) => (
              <option key={e.name} value={e.id}>{e.name}</option>
            ))}
            </SelectWrapper>
          </ThemeProvider>
        </>
    )
}