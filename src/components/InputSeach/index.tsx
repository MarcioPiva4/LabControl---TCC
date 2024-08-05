'use client'
import styled from "styled-components";

interface PropInputSeach{
    placeholder?: string;
    id: string;
}

const Content = styled.div`
    position: relative;
    
    svg{
        position: absolute;
        right: 24px;
        top: 10px;
    }
`;

const InputSeach = styled.input`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    background-color: #fff;
    border-radius: 50px;
    margin-bottom: 20px;
    outline: none;
    border: none;

        &[type="search"]::-webkit-search-decoration,
        &[type="search"]::-webkit-search-cancel-button,
        &[type="search"]::-webkit-search-results-button,
        &[type="search"]::-webkit-search-results-decoration {
        display: none;
        }
    `;

export default function InputSearch({placeholder, id}: PropInputSeach){
    return(
        <Content>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.4375 12.9375C5.60417 14.1042 7.02083 14.6875 8.6875 14.6875C10.3542 14.6875 11.7708 14.1042 12.9375 12.9375C14.1042 11.7708 14.6875 10.3542 14.6875 8.6875C14.6875 7.02083 14.1042 5.60417 12.9375 4.4375C11.7708 3.27083 10.3542 2.6875 8.6875 2.6875C7.02083 2.6875 5.60417 3.27083 4.4375 4.4375C3.27083 5.60417 2.6875 7.02083 2.6875 8.6875C2.6875 10.3542 3.27083 11.7708 4.4375 12.9375ZM16.6875 14.6875L23.3125 21.3125L21.3125 23.3125L14.6875 16.6875V15.625L14.3125 15.25C12.7292 16.625 10.8542 17.3125 8.6875 17.3125C6.27083 17.3125 4.20833 16.4792 2.5 14.8125C0.833333 13.1458 0 11.1042 0 8.6875C0 6.27083 0.833333 4.22917 2.5 2.5625C4.20833 0.854167 6.27083 0 8.6875 0C11.1042 0 13.1458 0.854167 14.8125 2.5625C16.4792 4.22917 17.3125 6.27083 17.3125 8.6875C17.3125 9.5625 17.1042 10.5625 16.6875 11.6875C16.2708 12.7708 15.7917 13.6458 15.25 14.3125L15.625 14.6875H16.6875Z" fill="#041833"/>
            </svg>
            <InputSeach type="search" id={id} name={id} placeholder={placeholder}></InputSeach>
        </Content>
    )
}