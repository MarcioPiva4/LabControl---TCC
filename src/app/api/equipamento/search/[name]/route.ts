import { Equipamento } from "@/models/Equipamento";
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

        const data = await Equipamento.findAll({
            where: {
              equipamento: {
                [Op.like]: `%${name}%`,
              },
            },
          });

        return NextResponse.json({status: 'sucess', data: data});
    } catch (error: unknown){
        return NextResponse.json({status: 'error', message: `Ocorreu um erro durante a requisição: ${error}`, code: 400}, {status: 400})
    }
}