import { Equipamento, FornecedorEquipamentos } from "@/models/Equipamento";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const equipamentos = await Equipamento.findAll();
        return NextResponse.json({ status: 'success', data: equipamentos }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { equipamento, quantidade, tipo, numero_serie, marca_modelo, preco_compra, localizacao, observacoes, id_fornecedor } = await req.json() as any;

        if(equipamento.toString().length <= 0 ||
            tipo.toString().length <= 0 ||
            numero_serie.toString().length <= 0 ||
            marca_modelo.toString().length <= 0 ||
            quantidade.toString().length <= 0 ||
            preco_compra.toString().length <= 0 ||
            id_fornecedor.length <= 0 ||
            localizacao.length <= 0
        ){
            return NextResponse.json({status: 'error', message: 'Não pode haver campos obrigatórios vazios'}, {status: 400})
        }

        const createEquipamento = await Equipamento.create({
            equipamento,
            quantidade,
            tipo,
            numero_serie,
            marca_modelo,
            preco_compra,
            localizacao,
            observacoes,
            id_fornecedor
        }) as any;

        await Promise.all(id_fornecedor.map(async (fornecedorId: number) => {
            await FornecedorEquipamentos.create({
                id_fornecedor: fornecedorId,
                id_equipamentos: createEquipamento.id
            });
        }));

        return NextResponse.json({status: 'sucess', message: 'Equipamento criado com sucesso', createEquipamento}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteEquipamento = await Equipamento.findByPk(id);
        if(deleteEquipamento){
            await deleteEquipamento.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Equipamento removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Equipamento não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { equipamento, quantidade, tipo, numero_serie, marca_modelo, preco_compra, localizacao, observacoes, id_fornecedor, id } = await req.json() as any;
        const editEquipamento = await Equipamento.findByPk(id);
        if(editEquipamento){
            if(equipamento != undefined){
                await editEquipamento.update({equipamento});
            }

            if(quantidade != undefined){
                await editEquipamento.update({quantidade});
            }

            if(tipo != undefined){
                await editEquipamento.update({tipo});
            }
            
            if(numero_serie != undefined){
                await editEquipamento.update({numero_serie});
            }

            if(marca_modelo != undefined){
                await editEquipamento.update({marca_modelo});
            }

            if(preco_compra != undefined){
                await  editEquipamento.update({preco_compra});
            }

            if(localizacao != undefined){
                await  editEquipamento.update({localizacao});
            }

            if(observacoes != undefined){
                await  editEquipamento.update({observacoes});
            }

            if(id_fornecedor != undefined){
                await  editEquipamento.update({id_fornecedor});
            }

            return NextResponse.json({ status: 'sucess', message: 'Equipamento alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Equipamento não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}