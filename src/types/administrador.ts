export interface administradorReq{
    status: string;
    data: [
        administradorItems
    ];
}

export interface administradorItems{
    id: number;
    nome: string;
    email: string;
    telefone: string;
    data_contratacao: string;
    cep: string;
    estado: string;
    cidade: string;
    rua: string;
    numero: string;
    loginCount: number;
}

export interface administradorPut extends administradorItems{
    celular: string;
}

export interface administradorPatch extends administradorItems{
    password: string;
    passwordRepeat: string;
}