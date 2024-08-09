import { AgenteReajente, FornecedorAgenteReajente } from "@/models/Agente_reajente";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const agentesReajentes = await AgenteReajente.findAll();
        return NextResponse.json({ status: 'success', data: agentesReajentes }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { nome, formula, peso_molecular, material, cas, data_compra, data_validade, concentracao, quantidade, armazenamento_recomendado, observacoes, id_fornecedor } = await req.json() as any;

            if(nome.toString().length <= 0 || 
            formula.toString().length <= 0 || 
            peso_molecular.toString().length <= 0 || 
            material.toString().length <= 0 || 
            cas.toString().length <= 0 || 
            data_compra.toString().length <= 0 || 
            data_validade.toString().length <= 0 || 
            concentracao.toString().length <= 0 || 
            quantidade.toString().length <= 0 || 
            armazenamento_recomendado.toString().length <= 0 || 
            id_fornecedor){
                return NextResponse.json({status: 'error', message: 'Não pode haver campos vazios'}, {status: 400})
            }

        //fazer os testes lógicos para caso seja vazio e etc;

        const createAgenteReajente = await AgenteReajente.create({
            nome,
            formula,
            peso_molecular,
            material,
            cas,
            data_compra,
            data_validade,
            concentracao,
            quantidade,
            armazenamento_recomendado,
            observacoes,
            id_fornecedor
        }) as any;

        await Promise.all(id_fornecedor.map(async (fornecedorId: number) => {
            await FornecedorAgenteReajente.create({
                id_fornecedor: fornecedorId,
                id_vidraria: createAgenteReajente.id 
            });
        }));

        return NextResponse.json({status: 'sucess', message: 'Agente e reajente criado com sucesso', createAgenteReajente}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteAgenteReajente = await AgenteReajente.findByPk(id);
        if(deleteAgenteReajente){
            await deleteAgenteReajente.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Agente reajente removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Agente reajente não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { nome, formula, peso_molecular, material, cas, data_compra, data_validade, concentracao, quantidade, armazenamento_recomendado, observacoes, id_fornecedor, id } = await req.json() as any;
        const editAgenteReajente = await AgenteReajente.findByPk(id);
        if(editAgenteReajente){
            if(nome != undefined){
                await editAgenteReajente.update({nome});
            }

            if(formula != undefined){
                await editAgenteReajente.update({formula});
            }

            if(peso_molecular != undefined){
                await editAgenteReajente.update({peso_molecular});
            }
            
            if(material != undefined){
                await editAgenteReajente.update({material});
            }

            if(cas != undefined){
                await editAgenteReajente.update({cas});
            }

            if(data_compra != undefined){
                await  editAgenteReajente.update({data_compra});
            }

            if(data_validade != undefined){
                await  editAgenteReajente.update({data_validade});
            }

            if(concentracao != undefined){
                await  editAgenteReajente.update({concentracao});
            }

            if(quantidade != undefined){
                await  editAgenteReajente.update({quantidade});
            }

            if(armazenamento_recomendado != undefined){
                await  editAgenteReajente.update({armazenamento_recomendado});
            }

            if(observacoes != undefined){
                await  editAgenteReajente.update({observacoes});
            }

            if(id_fornecedor != undefined){
                await  editAgenteReajente.update({id_fornecedor});
            }

            return NextResponse.json({ status: 'sucess', message: 'Agente reajente alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Agente reajente não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}