import { Vidrarias, FornecedorVidrarias } from "@/models/Vidrarias";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const { vidraria, tipo, capacidade, material, quantidade, preco_compra, observacoes, id_fornecedor } = await req.json() as any;
        if(vidraria.toString().length <= 0 ||
            tipo.toString().length <= 0 ||
            capacidade.toString().length <= 0 ||
            material.toString().length <= 0 ||
            quantidade.toString().length <= 0 ||
            preco_compra.toString().length <= 0 ||
            observacoes.toString().length <= 0 ||
            id_fornecedor.length <= 0
        ){
            return NextResponse.json({status: 'error', message: 'Não pode haver campos vazios'}, {status: 400})
        }

        const createVidraria = await Vidrarias.create({
            vidraria,
            tipo,
            capacidade,
            material,
            quantidade,
            preco_compra,
            observacoes,
        });

        // Associa os fornecedores selecionados
        await Promise.all(id_fornecedor.map(async (fornecedorId: number) => {
            await FornecedorVidrarias.create({
                id_fornecedor: fornecedorId,
                id_vidraria: createVidraria.id
            });
        }));

        return NextResponse.json({status: 'sucess', message: 'Vidraria criado com sucesso', createVidraria}, {status: 201});
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}
