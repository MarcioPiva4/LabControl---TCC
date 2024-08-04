import { NextResponse } from "next/server";

export async function POST(res: NextResponse){
    try{
        const {cep} = await res.json();
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if(response.ok){
            const data = await response.json();
            return NextResponse.json({data: data}, {status: 200});
        } else {
            return NextResponse.json({message: 'cep inválido'}, {status: 400});
        }
    } catch(error) {
        return NextResponse.json({message: `Erro na requisição, tente novamente`}, {status: 400});
    }
}