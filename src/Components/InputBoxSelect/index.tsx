'use client'
import { theme } from "@/styles/theme";
import Link from "next/link";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

interface PropInputBoxSelect{
    name: string;
    id: number;
    activeOption?: any;
    active?: boolean;
    disableOption?: any;
}

const BoxSelectWrapper = styled.div.attrs<{$active?: boolean}>((props) => ({
    $active: props.$active,
}))`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    border-radius: 50px;
    margin-bottom: 20px;
    background: ${(props) => props.$active ? '#bbbaba' : '#fff'};

    p{
        font-size: ${(props) => props.theme.font.label.size};
        font-weight: ${(props) => props.theme.font.label.weight};
        line-height: ${(props) => props.theme.font.label.height};
        text-decoration: none;
        color: ${(props) => props.theme.color.black};
    }

    svg{
        cursor: pointer;
    }
`;


export default function InputBoxSelect({name, id, activeOption, disableOption, active}: PropInputBoxSelect){
    return (
      <ThemeProvider theme={theme}>
        <BoxSelectWrapper $active={active}>
          <p>{name}</p>
          {active ? (
            <svg
              width="26"
              height="14"
              viewBox="0 0 26 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => disableOption(id)}
            >
              <rect
                y="3.41064"
                width="2.82075"
                height="26"
                rx="1.41038"
                transform="rotate(-90 0 3.41064)"
                fill="#041833"
              />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => activeOption(id)}
            >
              <rect
                y="14.3491"
                width="2.82075"
                height="26"
                rx="1.41038"
                transform="rotate(-90 0 14.3491)"
                fill="#041833"
              />
              <rect
                x="11.5283"
                width="2.82075"
                height="26"
                rx="1.41038"
                fill="#041833"
              />
            </svg>
          )}
        </BoxSelectWrapper>
      </ThemeProvider>
    );
}

interface PropsInputBoxSelectWithQuantity extends PropInputBoxSelect {
  add?: boolean;
  sub?: boolean;
  addQuantity?: any;
  subQuantity?: any;
  quantityFloat?: number;
}

export function InputBoxSelectWithQuntity({ name, id, add, sub, addQuantity, subQuantity, quantityFloat }: PropsInputBoxSelectWithQuantity) {
  const [value, setValue] = useState<number>(quantityFloat ?? 1);

  const handleAddQuantity = () => {
    setValue(value + 1);
    addQuantity(value + 1);
  };

  const handleSubQuantity = () => {
    setValue(value - 1);
    subQuantity(value - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <BoxSelectWrapper>
        {sub && (
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSubQuantity}
          >
            <rect
              y="3.41064"
              width="2.82075"
              height="26"
              rx="1.41038"
              transform="rotate(-90 0 3.41064)"
              fill="#041833"
            />
          </svg>
        )}
        <p>{name}</p>
        {add && (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleAddQuantity}
          >
            <rect
              y="14.3491"
              width="2.82075"
              height="26"
              rx="1.41038"
              transform="rotate(-90 0 14.3491)"
              fill="#041833"
            />
            <rect
              x="11.5283"
              width="2.82075"
              height="26"
              rx="1.41038"
              fill="#041833"
            />
          </svg>
        )}
      </BoxSelectWrapper>
    </ThemeProvider>
  );
}



interface PropInputBoxSelectLink{
    name: string;
    href: string;
}

const BoxSelectWrapperLink = styled(Link)`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    background-color: #fff;
    border-radius: 50px;
    margin-bottom: 20px;
    text-decoration: none;

    p{
        font-size: ${(props) => props.theme.font.label.size};
        font-weight: ${(props) => props.theme.font.label.weight};
        line-height: ${(props) => props.theme.font.label.height};
        text-decoration: none;
        color: ${(props) => props.theme.color.black};
    }

    svg{
        cursor: pointer;
    }
`;

export function InputBoxSelectLink({name, href}: PropInputBoxSelectLink){
    return(
        <ThemeProvider theme={theme}>
                <BoxSelectWrapperLink href={href ?? ''}>
                    <p>{name}</p>
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="14.3491" width="2.82075" height="26" rx="1.41038" transform="rotate(-90 0 14.3491)" fill="#041833"/>
                        <rect x="11.5283" width="2.82075" height="26" rx="1.41038" fill="#041833"/>
                    </svg>
                </BoxSelectWrapperLink>
        </ThemeProvider>
    )
}