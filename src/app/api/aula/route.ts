import { AgenteReajente } from "@/models/Agente_reajente";
import { AgenteReajenteAula, Aula, EquipamentoAula, LaboratorioAula, MateriaAula, ProfessorAula, VidrariaAula } from "@/models/Aula";
import { Equipamento } from "@/models/Equipamento";
import { Laboratorio } from "@/models/Laboratorio";
import { Materias } from "@/models/Materias";
import { Professor } from "@/models/Professor";
import { Vidrarias } from "@/models/Vidrarias";
import { isValidateDate } from "@/utils/dateValidator";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){
    try{
        const aulas = await Aula.findAll({
          include: [
            {
                model: Professor,
                as: 'professores',  
                attributes: ['nome'] 
            },
            {
                model: Materias,
                as: 'materias', 
                attributes: ['nome']
            },
            {
                model: Laboratorio,
                as: 'laboratorios',
                attributes: ['nome']
            },
            {
                model: Equipamento,
                as: 'equipamentos',
                attributes: ['equipamento'],
            },
            {
                model: Vidrarias,
                as: 'vidrarias',  
                attributes: ['vidraria'], 
                through: { attributes: ['quantidade'] } 
            },
            {
                model: AgenteReajente,
                as: 'agentes_reajentes', 
                attributes: ['nome'],
                through: { attributes: ['quantidade'] } 
            }
          ],
        });
        const response = NextResponse.json(
          { status: "success", data: aulas },
          { status: 200 }
        );

        response.headers.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        return response;
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        
        const { aula, equipamentos, vidrarias, agenteReajente } = await req.json() as any;
        const {
          id_materia,
          id_professor,
          id_laboratorio,
          topico_aula,
          horario_inicio,
          horario_finalizacao,
          data,
          observacoes,
        } = aula;

        if(topico_aula.toString().length <= 0 ||
            horario_inicio.toString().length <= 0 ||
            horario_finalizacao.toString().length <= 0 ||
            data.toString().length <= 0
        ){
            return NextResponse.json({status: 'error', message: 'Não pode haver campos obrigatórios vazios'}, {status: 400})
        }

        if(!isValidateDate(data)){
            return NextResponse.json({status: 'error', message: 'Data inválida'}, {status: 400})
        }

        if(isDescriptionLengthMore(observacoes)){
            return NextResponse.json({status: 'error', message: 'Não ultrapasse os 255 caracteres nas observações'}, {status: 400});
        }

        if(!equipamentos){
            return NextResponse.json({status: 'error', message: 'Selecione um equipamento para a aula'}, {status: 400});
        }

        if(!vidrarias){
            return NextResponse.json({status: 'error', message: 'Selecione uma vidraria para a aula'}, {status: 400});
        }

        if(!agenteReajente){
            return NextResponse.json({status: 'error', message: 'Selecione um agente/reajente para a aula'}, {status: 400});
        }

        const createAula = await Aula.create({
            topico_aula,
            horario_inicio,
            horario_finalizacao,
            data,
            observacoes,
        }) as any;

        await ProfessorAula.create({
            id_professor: id_professor,
            id_aula: createAula.id
        });

        await LaboratorioAula.create({
            id_laboratorio: id_laboratorio,
            id_aula: createAula.id
        });

        await MateriaAula.create({
            id_materia: id_materia,
            id_aula: createAula.id
        });

        await Promise.all(equipamentos.map(async (e: any) => {
            await EquipamentoAula.create({
                id_equipamento: e.id_equipamento,
                id_aula: createAula.id,
                quantidade: e.quantidade_equipamento,
            });
        }));

        await Promise.all(vidrarias.map(async (e: any) => {
            await VidrariaAula.create({
                id_vidraria: e.id_vidrarias,
                id_aula: createAula.id,
                quantidade: e.quantidade_vidrarias,
            });
        }));

        await Promise.all(agenteReajente.map(async (e: any) => {
            await AgenteReajenteAula.create({
                id_agentereajente: e.id_agenteReajente,
                id_aula: createAula.id,
                quantidade: e.quantidade_agenteReajente,
            });
        }));


        return NextResponse.json({status: 'sucess', message: 'Aula criado com sucesso'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

// export async function PATCH(req: NextRequest){
//     try{
//         const { materia, professor,  } = req.json() as any;
//     } catch(error){
//        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
//     }
// }

export async function PATCH(req: NextRequest){
    try{
        //const {id} = req.json() as any;

        const aula = await Aula.findByPk(1);
        if(aula){
            aula.update({ status: 'finish' });
            return NextResponse.json({ status: 'sucess', message: `Aula finalizada com sucesso`, code: 200}, {status: 200})
        }
        return NextResponse.json({ status: 'error', message: `Aula não encontrada, tente outra aula`, code: 404}, {status: 404});
    } catch(error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400});
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