export interface ProfessorReq {
    status: string;
    data: [
        ProfessorItems
    ];
}

export interface ProfessorItems {
    id: number;
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    loginCount: number;
}

export interface ProfessorPatch{
    id: number|string;
    password: string;
    passwordRepeat:string
}