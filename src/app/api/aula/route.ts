import { Aula } from "@/models/Aula";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){
    try{
        const aulas = await Aula.findAll();
        return NextResponse.json({ status: 'success', data: aulas }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { topico_aula, horario_inicio, horario_finalizacao, data, observacoes } = await req.json() as any;

        if(topico_aula.toString().length <= 0 ||
            horario_inicio.toString().length <= 0 ||
            horario_finalizacao.toString().length <= 0 ||
            data.toString().length <= 0 ||
            observacoes.toString().length <= 0
        ){
            return NextResponse.json({status: 'error', message: 'Não pode haver campos obrigatórios vazios'}, {status: 400})
        }

        if(isDescriptionLengthMore(observacoes)){
            return NextResponse.json({status: 'error', message: 'Não ultrapasse os 255 caracteres nas observações'}, {status: 400});
        }

        const createAula = await Aula.create({
            topico_aula,
            horario_inicio,
            horario_finalizacao,
            data,
            observacoes,
        }) as any;

        /*await Promise.all(id_fornecedor.map(async (fornecedorId: number) => {
            await FornecedorEquipamentos.create({
                id_fornecedor: fornecedorId,
                id_equipamentos: createEquipamento.id
            });
        }));*/

        return NextResponse.json({status: 'sucess', message: 'Equipamento criado com sucesso'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}


export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteAula = await Aula.findByPk(id);
        if(deleteAula){
            await deleteAula.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Aula removida com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Aula não encontrada, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}