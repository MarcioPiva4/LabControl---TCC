import { Logs } from "@/models/Log";
import { Materias } from "@/models/Materias";
import { MateriaItems } from "@/types/materia";
import { authOptions } from "@/utils/authOptions";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const materiais = await Materias.findAll();
        return NextResponse.json({ status: 'success', data: materiais }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest,  res: NextApiResponse){
    const session = await getServerSession(authOptions);
    await Logs.create({
        nome: session?.user?.name,
        typeHttp: 'POST',
        ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
        message: 'Iniciou uma requisição na rota de matérias'
    });

    try{
        const { nome, emenda } = await req.json() as MateriaItems;

        if(nome.toString().length <= 0 || emenda.toString().length <= 0){
            return NextResponse.json({ status: 'error', message: `Não pode haver campos vazios`, code: 400 }, {status: 400});
        }

        if(emenda.toString().length > 255 ){
            return NextResponse.json({ status: 'error', message: `Emenda grande demais`, code: 400 }, {status: 400});
        }

        const createMateria = await Materias.create({
            nome,
            emenda,
        });

        await Logs.create({
            nome: session?.user?.name,
            typeHttp: 'POST',
            ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
            message: `Finalizou o cadastro da matéria: ${nome} e ${emenda}`
        });
        return NextResponse.json({status: 'sucess', message: 'Matéria criada com sucesso'}, {status: 201})
        
    } catch (error) {

        await Logs.create({
            nome: session?.user?.name,
            typeHttp: 'POST',
            ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
            message: `A requisição fracassou`
        });
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as { id: number | string};
        const deleteMateria = await Materias.findByPk(id);
        if(deleteMateria){
            await deleteMateria.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Matéria removida com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Matéria não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { id, nome, emenda } = await req.json() as MateriaItems;
        const editMateria = await Materias.findByPk(id);
        if(editMateria){
            if(nome != undefined){
                await editMateria.update({nome: nome});
            }

            if(emenda != undefined){
                await editMateria.update({telefone: emenda});
            }


            return NextResponse.json({ status: 'sucess', message: 'Matéria alterada com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Matéria não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}