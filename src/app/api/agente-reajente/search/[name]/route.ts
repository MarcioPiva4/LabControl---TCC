import { AgenteReajente } from "@/models/Agente_reajente";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

interface Params {
    params: {
        name: string
    }
}

export async function GET(req: Request, params: Params){
    try{
        const name = params.params.name;

        const data = await AgenteReajente.findAll({
            where: {
              nome: {
                [Op.like]: `%${name}%`,
              },
            },
          });

        return NextResponse.json({status: 'sucess', data: data});
    } catch (error: unknown){
        return NextResponse.json({status: 'error', message: `Ocorreu um erro durante a requisição: ${error}`, code: 400}, {status: 400})
    }
}