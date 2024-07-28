import { Administrador } from "@/models/Administrador";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const administradores = await Administrador.findAll();
        return NextResponse.json({ status: 'success', data: administradores }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { nome, email, celular } = await req.json() as any;


        //fazer os testes lógicos para caso seja vazio e etc;

        const createAdministrador = await Administrador.create({
            nome: nome,
            email: email,
            celular: celular,
        });

        return NextResponse.json({status: 'sucess', message: 'Administrador criado com sucesso', createAdministrador}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteAdministrador = await Administrador.findByPk(id);
        if(deleteAdministrador){
            await deleteAdministrador.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Administrador removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Administrador não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { nome, email, celular, id } = await req.json() as any;
        const editAdministrador = await Administrador.findByPk(id);
        if(editAdministrador){
            if(nome != undefined){
                await editAdministrador.update({nome: nome});
            }

            if(celular != undefined){
                await editAdministrador.update({celular: celular});
            }

            if(email != undefined){
                await editAdministrador.update({email: email});
            }


            return NextResponse.json({ status: 'sucess', message: 'Administrador alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Administrador não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}