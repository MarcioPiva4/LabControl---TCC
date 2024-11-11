export interface FornecedorReq{
    status: string;
    data: [
        FornecedorItems
    ];
}

export interface FornecedorItems{
    id: number;
    nome: string;
    cnpj: string; 
    email: string;
    telefone: string;
    telefone_tipo: string; 
    cep: string;
    estado: string;
    cidade: string;
    bairro:string;
    rua: string;
    numero: number;
}