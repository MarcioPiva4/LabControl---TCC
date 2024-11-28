export interface VidrariaReq {
    status: string;
    data: [
        VidrariaItems
    ];
}

export interface VidrariaItems {
    id: number;
    vidraria: string;
    tipo: string;
    capacidade: string;
    material: string;
    quantidade: number;
    quantidade_float: number;
    preco_compra: string;
    observacoes: string;
}

export interface VidrariaPost extends VidrariaItems{
    id_fornecedor: [string];
}