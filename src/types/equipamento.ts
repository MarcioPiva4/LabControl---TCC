export interface EquipamentoReq {
    status: string;
    data: [
        EquipamentoItems
    ];
}

export interface EquipamentoItems {
    id: number;
    equipamento: string;
    tipo: string;
    numero_serie: string;
    marca_modelo: string;
    quantidade: number;
    quantidade_float: number;
    preco_compra: string;
    localizacao: string;
    observacoes: string;
}

export interface EquipamentoPost extends EquipamentoItems{
    id_fornecedor: [string];
}