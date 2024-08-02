import { NextResponse } from "next/server";

export async function POST(res: NextResponse){
    try{
        const {cep} = await res.json();
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if(response){
            const data = await response.json();
            console.log(data)
            return NextResponse.json({data: data}, {status: 200});
        }
    } catch(error) {
        return NextResponse.json({message: `Erro na requisição, tente novamente ${error}`}, {status: 400});
    }
}