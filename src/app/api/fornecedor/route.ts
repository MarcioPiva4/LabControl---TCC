import { Fornecedor } from "@/models/Fornecedor";
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


        //fazer os testes lógicos para caso seja vazio e etc;

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

        return NextResponse.json({status: 'sucess', message: 'Fornecedor criado com sucesso', createFornecedor}, {status: 201})
        
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