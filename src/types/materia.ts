export interface MateriaReq {
    status: string;
    data: [
        MateriaItems
    ];
}

export interface MateriaItems {
    id: number;
    nome: string;
    emenda: string;
}