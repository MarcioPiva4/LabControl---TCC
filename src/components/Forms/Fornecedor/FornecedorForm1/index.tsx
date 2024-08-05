'use client';
import Button from "@/components/Button";
import DefaultForm from "@/components/DefaultForm";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface DataBefore {
  data?: {
    nome?: string;
    cnpj?: string;
    telefone?: string;
    email?: string;
  };
  phone?: string;
}

export default function FornecedorForm1() {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [dataBefore, setDataBefore] = useState<DataBefore>({});
    const [nome, setNome] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [typeTelefone, setTypeTelefone] = useState<{whatsapp: boolean; telefone: boolean}>();
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem('fornecedorscreen1') as string;
        const typePhone = localStorage.getItem('fornecedortelefone') as string;
        if (storedData) {
            setDataBefore({ data: JSON.parse(storedData), phone: typePhone });
        }
    }, []);

    useEffect(() => {
        if (dataBefore.data) {
            setNome(dataBefore.data.nome || '');
            setCnpj(dataBefore.data.cnpj || '');
            setTelefone(dataBefore.data.telefone || '');
            setEmail(dataBefore.data.email || '');
        }
        if (dataBefore.phone) {
            setTypeTelefone({
                telefone: dataBefore.phone === "telefone",
                whatsapp: dataBefore.phone === "whatsapp"
            });
        }
    }, [dataBefore]);

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const selectedValue = selectRef.current?.value || '';
        localStorage.setItem('fornecedortelefone', JSON.stringify(selectedValue));
        localStorage.setItem('fornecedorscreen1', JSON.stringify(data));
        router.push('/cadastro/fornecedor/finish');
    };

    return (
        <DefaultForm onSubmit={handlerSubmit}>
            <Input 
                type="text" 
                label="Nome" 
                idInput="nome" 
                value={nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            />
            <Input 
                type="text" 
                label="CNPJ" 
                idInput="cnpj" 
                value={cnpj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)}
            />
            <Input 
                type="text" 
                label="Telefone" 
                selectAside 
                idInput="telefone" 
                value={telefone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
                optionsFakeSelect={[
                    {
                        id: 1,
                        nome: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_349_2866)"><path d="M14.7989 11.4923C14.76 11.4736 13.3019 10.7556 13.0428 10.6624C12.937 10.6244 12.8237 10.5873 12.7032 10.5873C12.5063 10.5873 12.3409 10.6854 12.2121 10.8782C12.0665 11.0947 11.6256 11.61 11.4893 11.764C11.4715 11.7843 11.4472 11.8086 11.4327 11.8086C11.4196 11.8086 11.194 11.7157 11.1257 11.686C9.56159 11.0066 8.37438 9.37278 8.21159 9.09726C8.18834 9.05765 8.18737 9.03966 8.18717 9.03966C8.19289 9.01869 8.24549 8.96596 8.27263 8.93875C8.35204 8.86018 8.43808 8.75661 8.52133 8.65641C8.56075 8.60894 8.60023 8.56141 8.63899 8.51661C8.75977 8.37609 8.81354 8.267 8.87587 8.14063L8.90854 8.07498C9.06075 7.77258 8.93074 7.51739 8.88873 7.43498C8.85425 7.36602 8.2386 5.88018 8.17315 5.72407C8.01575 5.34739 7.80776 5.172 7.51873 5.172C7.49191 5.172 7.51873 5.172 7.40626 5.17674C7.26932 5.18252 6.52354 5.2807 6.1938 5.48856C5.84412 5.70901 5.25256 6.41174 5.25256 7.64758C5.25256 8.75985 5.95841 9.81005 6.26146 10.2095C6.26899 10.2195 6.28282 10.24 6.30289 10.2693C7.46347 11.9643 8.91029 13.2204 10.377 13.8063C11.789 14.3703 12.4576 14.4355 12.8378 14.4355H12.8378C12.9976 14.4355 13.1254 14.423 13.2382 14.4119L13.3098 14.405C13.7976 14.3618 14.8695 13.8063 15.1133 13.1288C15.3054 12.595 15.3561 12.0119 15.2283 11.8003C15.1407 11.6564 14.9899 11.584 14.7989 11.4923Z" fill="white"/><path d="M10.1775 0C4.76089 0 0.354141 4.37364 0.354141 9.74955C0.354141 11.4883 0.819465 13.1903 1.70096 14.6799L0.0137512 19.6569C-0.0176774 19.7497 0.0056992 19.8523 0.0743356 19.9221C0.123881 19.9727 0.191089 20 0.259725 20C0.286024 20 0.312517 19.996 0.338362 19.9878L5.52797 18.3387C6.9481 19.0975 8.55317 19.498 10.1776 19.498C15.5937 19.4981 20 15.1249 20 9.74955C20 4.37364 15.5937 0 10.1775 0ZM10.1775 17.4671C8.64901 17.4671 7.16856 17.0258 5.89596 16.1907C5.85317 16.1626 5.80349 16.1482 5.75349 16.1482C5.72706 16.1482 5.70057 16.1522 5.67479 16.1604L3.07511 16.9868L3.91434 14.5108C3.94148 14.4307 3.92791 14.3423 3.87791 14.274C2.90882 12.9499 2.39654 11.3854 2.39654 9.74955C2.39654 5.49351 5.88706 2.03091 10.1775 2.03091C14.4673 2.03091 17.9575 5.49351 17.9575 9.74955C17.9575 14.0051 14.4675 17.4671 10.1775 17.4671Z" fill="white"/></g><defs><clipPath id="clip0_349_2866"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>,
                        abr: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_349_2866)"><path d="M14.7989 11.4923C14.76 11.4736 13.3019 10.7556 13.0428 10.6624C12.937 10.6244 12.8237 10.5873 12.7032 10.5873C12.5063 10.5873 12.3409 10.6854 12.2121 10.8782C12.0665 11.0947 11.6256 11.61 11.4893 11.764C11.4715 11.7843 11.4472 11.8086 11.4327 11.8086C11.4196 11.8086 11.194 11.7157 11.1257 11.686C9.56159 11.0066 8.37438 9.37278 8.21159 9.09726C8.18834 9.05765 8.18737 9.03966 8.18717 9.03966C8.19289 9.01869 8.24549 8.96596 8.27263 8.93875C8.35204 8.86018 8.43808 8.75661 8.52133 8.65641C8.56075 8.60894 8.60023 8.56141 8.63899 8.51661C8.75977 8.37609 8.81354 8.267 8.87587 8.14063L8.90854 8.07498C9.06075 7.77258 8.93074 7.51739 8.88873 7.43498C8.85425 7.36602 8.2386 5.88018 8.17315 5.72407C8.01575 5.34739 7.80776 5.172 7.51873 5.172C7.49191 5.172 7.51873 5.172 7.40626 5.17674C7.26932 5.18252 6.52354 5.2807 6.1938 5.48856C5.84412 5.70901 5.25256 6.41174 5.25256 7.64758C5.25256 8.75985 5.95841 9.81005 6.26146 10.2095C6.26899 10.2195 6.28282 10.24 6.30289 10.2693C7.46347 11.9643 8.91029 13.2204 10.377 13.8063C11.789 14.3703 12.4576 14.4355 12.8378 14.4355H12.8378C12.9976 14.4355 13.1254 14.423 13.2382 14.4119L13.3098 14.405C13.7976 14.3618 14.8695 13.8063 15.1133 13.1288C15.3054 12.595 15.3561 12.0119 15.2283 11.8003C15.1407 11.6564 14.9899 11.584 14.7989 11.4923Z" fill="white"/><path d="M10.1775 0C4.76089 0 0.354141 4.37364 0.354141 9.74955C0.354141 11.4883 0.819465 13.1903 1.70096 14.6799L0.0137512 19.6569C-0.0176774 19.7497 0.0056992 19.8523 0.0743356 19.9221C0.123881 19.9727 0.191089 20 0.259725 20C0.286024 20 0.312517 19.996 0.338362 19.9878L5.52797 18.3387C6.9481 19.0975 8.55317 19.498 10.1776 19.498C15.5937 19.4981 20 15.1249 20 9.74955C20 4.37364 15.5937 0 10.1775 0ZM10.1775 17.4671C8.64901 17.4671 7.16856 17.0258 5.89596 16.1907C5.85317 16.1626 5.80349 16.1482 5.75349 16.1482C5.72706 16.1482 5.70057 16.1522 5.67479 16.1604L3.07511 16.9868L3.91434 14.5108C3.94148 14.4307 3.92791 14.3423 3.87791 14.274C2.90882 12.9499 2.39654 11.3854 2.39654 9.74955C2.39654 5.49351 5.88706 2.03091 10.1775 2.03091C14.4673 2.03091 17.9575 5.49351 17.9575 9.74955C17.9575 14.0051 14.4675 17.4671 10.1775 17.4671Z" fill="white"/></g><defs><clipPath id="clip0_349_2866"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>,
                        active: typeTelefone?.whatsapp as boolean,
                        value: "whatsapp",                  
                    },
                    {
                        id: 2,
                        nome: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" ><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" strokeWidth="2"></path> </g></svg>,
                        abr: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" strokeWidth="2"></path> </g></svg>,
                        active: typeTelefone?.telefone as boolean,
                        value: "telefone",
                    }
                ]}
                selectRef={selectRef}
            />
            <Input 
                type="text" 
                label="E-mail" 
                idInput="email" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Button type="submit" is="isNotTransparent">Avançar</Button>
        </DefaultForm>
    );
}