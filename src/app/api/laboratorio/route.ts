import { Laboratorio } from "@/models/Laboratorio";
import { LaboratorioItems } from "@/types/laboratorio";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const laboratorios = await Laboratorio.findAll();
        return NextResponse.json({ status: 'success', data: laboratorios }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { nome, predio, andar, bloco, sala, descricao, responsavel } = await req.json() as LaboratorioItems;

        if(nome.toString().length <= 0 || responsavel.toString().length <= 0
        ){
            return NextResponse.json({status: 'error', message: 'Não pode haver campos obrigatórios vazios'}, {status: 400})
        }

        if(isDescriptionLengthMore(descricao)){
            return NextResponse.json({status: 'error', message: 'Não ultrapasse os 255 caracteres na descrição'}, {status: 400});
        }

        const createLaboratorio = await Laboratorio.create({
            nome,
            predio,
            andar,
            bloco,
            sala,
            descricao,
            responsavel
        });

        return NextResponse.json({status: 'sucess', message: 'Laboratorio criado com sucesso'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as { id: number|string };
        const deleteLaboratorio = await Laboratorio.findByPk(id);
        if(deleteLaboratorio){
            await deleteLaboratorio.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Laboratorio removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Laboratorio não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { nome, predio, andar, bloco, sala, descricao, id } = await req.json() as LaboratorioItems;
        const editLaboratorio = await Laboratorio.findByPk(id);
        if(editLaboratorio){
            if(nome != undefined){
                await editLaboratorio.update({nome: nome});
            }

            if(predio != undefined){
                await editLaboratorio.update({predio});
            }

            if(andar != undefined){
                await editLaboratorio.update({andar});
            }
            
            if(bloco != undefined){
                await editLaboratorio.update({bloco});
            }

            if(sala != undefined){
                await editLaboratorio.update({sala});
            }

            if(descricao != undefined){
                await editLaboratorio.update({descricao});
            }

            return NextResponse.json({ status: 'sucess', message: 'Laboratorio alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Laboratorio não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}