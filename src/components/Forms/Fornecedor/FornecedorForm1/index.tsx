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
