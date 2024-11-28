import { Administrador } from "@/models/Administrador";
import { Logs } from "@/models/Log";
import { administradorItems, administradorPatch, administradorPut } from "@/types/administrador";
import { authOptions } from "@/utils/authOptions";
import { isValidateCEP } from "@/utils/cepValitador";
import { isValidateDate } from "@/utils/dateValidator";
import { isValidEmail } from "@/utils/emailValitador";
import { generatePassword } from "@/utils/generatePassword";
import { isValidName } from "@/utils/nameValitador";
import { isValidateHouseNumber } from "@/utils/numHouseValidator";
import { isValidPhoneNumber } from "@/utils/phoneValitador";
import { sendEmail } from "@/utils/sendEmail";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession(authOptions);
    await Logs.create({
        nome: session?.user?.name,
        typeHttp: 'POST',
        ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
        message: 'Iniciou uma requisição na rota de administrador'
    });
    try{
        const { nome, email, telefone, data_contratacao, cep, estado, cidade, rua, numero } = await req.json() as administradorItems;

        if(nome.toString().length <= 0 || 
        data_contratacao.toString().length <= 0 || 
        telefone.toString().length <= 0 || 
        email.toString().length <= 0 || 
        cep.toString().length <= 0 || 
        estado.toString().length <= 0 || 
        cidade.toString().length <= 0 || 
        rua.toString().length <= 0 || 
        numero.toString().length <= 0
        ){
            return NextResponse.json({ status: 'error', message: `Não pode haver campos vazios`, code: 400 }, {status: 400});
        }

        if(!isValidName(nome)){
            return NextResponse.json({ status: 'error', message: `Nome inválido`, code: 400 }, {status: 400});
        }
        
        if(!isValidPhoneNumber(telefone)){
            return NextResponse.json({ status: 'error', message: `Telefone inválido`, code: 400 }, {status: 400});
        }
        
        if(!isValidEmail(email)){
            return NextResponse.json({ status: 'error', message: `Email inválido`, code: 400 }, {status: 400});
        }
        
        // if(!isValidateDate(data_contratacao)){
        //     return NextResponse.json({ status: 'error', message: `Data de contratação inválido`, code: 400 }, {status: 400});
        // }

        if(!isValidateCEP(cep)){
            return NextResponse.json({ status: 'error', message: `CEP inválido`, code: 400 }, {status: 400});
        }

        if(!isValidateHouseNumber(numero)){
            return NextResponse.json({ status: 'error', message: `Número inválido`, code: 400 }, {status: 400});
        }

        const password = generatePassword();

        const createAdministrador = await Administrador.create({
            nome,
            email,
            telefone,
            data_contratacao,
            cep,
            estado,
            cidade,
            rua,
            numero,
            senha: password,
        });
        sendEmail(password.toString(), email, nome, 'adm');

        await Logs.create({
            nome: session?.user?.name,
            typeHttp: 'POST',
            ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
            message: `Finalizou o cadastro do administrador, senha gerada pelo sistema:${password}`
        });
        return NextResponse.json({status: 'sucess', message: 'Administrador criado com sucesso', createAdministrador}, {status: 201})
        
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
        const { id } = await req.json() as { id: number|string };
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

export async function PUT(req: NextRequest){
    try{
        const { nome, email, celular, id } = await req.json() as administradorPut;
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

export async function PATCH(req: NextRequest){
    try{
        const { id, password, passwordRepeat } = await req.json() as administradorPatch;

        if(!password && !passwordRepeat){
            return NextResponse.json({ status: 'error', message: 'Não deixe nenhum campo vazio.'}, {status: 400}); 
        }

        if(password !== passwordRepeat){
            return NextResponse.json({ status: 'error', message: 'Adicione duas senha iguais, tente novamente.'}, {status: 400}); 
        }

        const update = await Administrador.update({
            senha: password
        },{
            where: { id: id }
        });
        
        return NextResponse.json({ status: 'sucess', message: 'Senha alterada com sucesso'}, {status: 200}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}