import { Fornecedor } from "@/models/Fornecedor";
import { isValidateCEP } from "@/utils/cepValitador";
import { isValidateCNPJ } from "@/utils/cnpjValitador";
import { isValidEmail } from "@/utils/emailValitador";
import { isValidName } from "@/utils/nameValitador";
import { isValidateHouseNumber } from "@/utils/numHouseValidator";
import { isValidPhoneNumber } from "@/utils/phoneValitador";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const fornecedores = await Fornecedor.findAll();
        return NextResponse.json({ status: 'success', data: fornecedores }, {status: 200});
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400}, {status: 400})
    }
}

export async function POST(req: NextRequest){
    try{
        const { nome, cnpj, email, telefone, telefone_tipo, cep, estado, cidade, bairro, rua, numero } = await req.json() as any;

        if(nome.toString().length <= 0 || 
            cnpj.toString().length <= 0 || 
            telefone.toString().length <= 0 || 
            email.toString().length <= 0 || 
            telefone_tipo.toString().length <= 0 || 
            cep.toString().length <= 0 || 
            estado.toString().length <= 0 || 
            cidade.toString().length <= 0 || 
            bairro.toString().length <= 0 || 
            rua.toString().length <= 0 || 
            numero.toString().length <= 0
        ){
            return NextResponse.json({ status: 'error', message: `Não pode haver campos vazios`, code: 400 }, {status: 400});
        }

        if(!isValidName(nome)){
            return NextResponse.json({ status: 'error', message: `Nome inválido`, code: 400 }, {status: 400});
        }

        if(!isValidEmail(email)){
            return NextResponse.json({ status: 'error', message: `Email inválido`, code: 400 }, {status: 400});
        }

        if(!isValidPhoneNumber(telefone)){
            return NextResponse.json({ status: 'error', message: `Telefone inválido`, code: 400 }, {status: 400});
        }

        if(!isValidateCNPJ(cnpj)){
            return NextResponse.json({ status: 'error', message: `CPNJ inválido`, code: 400 }, {status: 400});
        }

        if(!isValidateCEP(cep)){
            return NextResponse.json({ status: 'error', message: `CEP inválido`, code: 400 }, {status: 400});
        }

        if(!isValidateHouseNumber(numero)){
            return NextResponse.json({ status: 'error', message: `Número inválido`, code: 400 }, {status: 400});
        }

        if(telefone_tipo != 'whatsapp' && telefone_tipo != 'telefone'){
            return NextResponse.json({ status: 'error', message: `Tipo de telefone inválido`, code: 400 }, {status: 400});
        }

        const createFornecedor = await Fornecedor.create({
            nome,
            cnpj,
            email,
            telefone,
            telefone_tipo,
            cep,
            estado,
            cidade,
            bairro,
            rua,
            numero
        });

        return NextResponse.json({status: 'sucess', message: 'Fornecedor criado com sucesso'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const { id } = await req.json() as any;
        const deleteFornecedor = await Fornecedor.findByPk(id);
        if(deleteFornecedor){
            await deleteFornecedor.destroy();
            return NextResponse.json({ status: 'sucess', message: 'Fornecedor removido com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Fornecedor não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}

export async function PATCH(req: NextRequest){
    try{
        const { nome, cnpj, email, telefone, telefone_tipo, cep, estado, cidade, bairro, rua, numero, id } = await req.json() as any;
        const editFornecedor = await Fornecedor.findByPk(id);
        if(editFornecedor){
            if(nome != undefined){
                await editFornecedor.update({nome: nome});
            }

            if(cnpj != undefined){
                await editFornecedor.update({cnpj});
            }

            if(email != undefined){
                await editFornecedor.update({email});
            }
            
            if(telefone != undefined){
                await editFornecedor.update({telefone});
            }

            if(telefone_tipo != undefined){
                await editFornecedor.update({telefone_tipo});
            }

            if(cep != undefined){
                await editFornecedor.update({cep});
            }

            if(estado != undefined){
                await editFornecedor.update({estado});
            }

            if(cidade != undefined){
                await editFornecedor.update({cidade});
            }

            if(bairro != undefined){
                await editFornecedor.update({bairro});
            }

            if(rua != undefined){
                await editFornecedor.update({rua});
            }

            if(numero != undefined){
                await editFornecedor.update({numero});
            }

            return NextResponse.json({ status: 'sucess', message: 'Fornecedor alterado com sucesso!'}, {status: 200});
        }

        return NextResponse.json({ status: 'error', message: 'Fornecedor não encontrado, tente novamente'}, {status: 404}); 
    } catch (error){
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, {status: 400})
    }
}