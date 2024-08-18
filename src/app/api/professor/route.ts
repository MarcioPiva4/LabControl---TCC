import { Professor } from "@/models/Professor";
import { cpfValitador } from "@/utils/cpfValitador";
import { isValidEmail } from "@/utils/emailValitador";
import { isValidName } from "@/utils/nameValitador";
import { isValidPhoneNumber } from "@/utils/phoneValitador";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const professores = await Professor.findAll();
        return NextResponse.json({ status: 'success', data: professores }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { nome, telefone, email, cpf, senha } = await req.json() as any;

        if(nome.toString().length <= 0 || cpf.toString().length <= 0 || telefone.toString().length <= 0 || email.toString().length <= 0){
            return NextResponse.json({ status: 'error', message: `Não pode haver campos vazios`, code: 400 }, {status: 400});
        }

        if(!cpfValitador(cpf)){
            return NextResponse.json({ status: 'error', message: `CPF inválido`, code: 400 }, {status: 400});
        }

        if(!isValidPhoneNumber(telefone)){
            return NextResponse.json({ status: 'error', message: `Telefone inválido`, code: 400 }, {status: 400});
        }

        if(!isValidEmail(email)){
            return NextResponse.json({ status: 'error', message: `Email inválido`, code: 400 }, {status: 400});
        }

        if(!isValidName(nome)){
            return NextResponse.json({ status: 'error', message: `Nome inválido`, code: 400 }, {status: 400});
        }

        const createProfessor = await Professor.create({
            nome,
            telefone,
            email,
            cpf,
            senha,
        });

        return NextResponse.json({status: 'sucess', message: 'Professor criado com sucesso'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteProfessor = await Professor.findByPk(id);
        if(deleteProfessor){
            await deleteProfessor.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Professor deletado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Professor não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { id, nome, telefone, email } = await req.json() as any;
        const editProfessor = await Professor.findByPk(id);
        if(editProfessor){
            if(nome != undefined){
                await editProfessor.update({nome: nome});
            }

            if(telefone != undefined){
                await editProfessor.update({telefone: telefone});
            }

            if(email != undefined) {
                await editProfessor.update({email: email});
            }

            return NextResponse.json({ status: 'sucess', message: 'Professor alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Professor não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}