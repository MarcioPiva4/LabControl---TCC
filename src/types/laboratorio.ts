export interface LaboratorioReq {
    status: string;
    data: [
        LaboratorioItems
    ];
}

export interface LaboratorioItems {
    id: number;
    nome: string;
    predio: string;
    andar: string;
    bloco: string;
    sala: string;
    responsavel: string;
    descricao: string;
}