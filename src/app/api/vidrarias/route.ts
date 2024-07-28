
import { Vidrarias } from "@/models/Vidrarias";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const vidrarias = await Vidrarias.findAll();
        return NextResponse.json({ status: 'success', data: vidrarias }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { vidraria, tipo, capacidade, material, quantidade, preco_compra, observacoes, id_fornecedor } = await req.json() as any;


        //fazer os testes lógicos para caso seja vazio e etc;

        const createVidraria = await Vidrarias.create({
            vidraria,
            tipo,
            capacidade,
            material,
            quantidade,
            preco_compra,
            observacoes,
            id_fornecedor,
        });

        return NextResponse.json({status: 'sucess', message: 'Vidraria criado com sucesso', createVidraria}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteVidraria = await Vidrarias.findByPk(id);
        if(deleteVidraria){
            await deleteVidraria.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Vidraria removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Fornecedor não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { vidraria, tipo, capacidade, material, quantidade, preco_compra, observacoes, id_fornecedor, id } = await req.json() as any;
        const editVidraria = await Vidrarias.findByPk(id);
        if(editVidraria){
            if(vidraria != undefined){
                await editVidraria.update({vidraria});
            }

            if(tipo != undefined){
                await editVidraria.update({tipo});
            }

            if(capacidade != undefined){
                await editVidraria.update({capacidade});
            }
            
            if(material != undefined){
                await editVidraria.update({material});
            }

            if(quantidade != undefined){
                await editVidraria.update({quantidade});
            }

            if(preco_compra != undefined){
                await editVidraria.update({preco_compra});
            }

            if(observacoes != undefined){
                await editVidraria.update({observacoes});
            }

            if(id_fornecedor != undefined){
                await editVidraria.update({id_fornecedor});
            }

            return NextResponse.json({ status: 'sucess', message: 'Vidraria alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Vidraria não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}