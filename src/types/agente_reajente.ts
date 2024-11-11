export interface AgenteReajenteReq {
    status: string;
    data: [
        AgenteReajenteItems
    ];
}

export interface AgenteReajenteItems {
    id: number ;
    nome: string;
    formula: string;
    peso_molecular: string;
    material: string;
    cas: number;
    data_compra: Date;
    data_validade: Date;
    concentracao: string;
    quantidade: number;
    quantidade_float: number;
    medida_quantidade: string;
    armazenamento_recomendado: string;
    observacoes: string;
}

export interface AgenteReajenteReqPost extends AgenteReajenteItems{
    id_fornecedor: [string];
}