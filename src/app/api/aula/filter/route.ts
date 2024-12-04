import { NextResponse } from "next/server";
import { Aula } from "@/models/Aula";
import { Professor } from "@/models/Professor";
import { Materias } from "@/models/Materias";
import { Laboratorio } from "@/models/Laboratorio";
import { Equipamento } from "@/models/Equipamento";
import { Vidrarias } from "@/models/Vidrarias";
import { AgenteReajente } from "@/models/Agente_reajente";
import { Op } from "sequelize";

export async function GET(request: Request) {
  const userRole = request.headers.get("X-User-Role");
  const userEmail = request.headers.get("X-User-Email");

  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const whereConditions: any = {};

    const status = searchParams.get("status");
    if (status) {
      if (status === "progresso") {
        whereConditions.status = "in progress";
      } else if (status === "finalizada") {
        whereConditions.status = "finish";
      }
    }

    const publicado = searchParams.get("publicado");

    if (publicado) {
      const today = new Date();
      let startDate, endDate;

      if (publicado === "hoje") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
        whereConditions.createdAt = {
          [Op.between]: [startDate, endDate],
        };
      } else if (publicado === "ontem") {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        startDate = new Date(yesterday.setHours(0, 0, 0, 0));
        endDate = new Date(yesterday.setHours(23, 59, 59, 999));
        whereConditions.createdAt = {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        };
      } else if (publicado === "ultimaSemana") {
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        lastWeekStart.setHours(0, 0, 0, 0);
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - 1);
        lastWeekEnd.setHours(23, 59, 59, 999);
        whereConditions.createdAt = {
          [Op.gte]: lastWeekStart,
          [Op.lte]: lastWeekEnd,
        };
      } else if (publicado === "ultimoMes") {
        const lastMonthStart = new Date(today);
        lastMonthStart.setMonth(today.getMonth() - 1);
        lastMonthStart.setDate(1);
        lastMonthStart.setHours(0, 0, 0, 0);
        const lastMonthEnd = new Date(today);
        lastMonthEnd.setMonth(today.getMonth() - 1);
        lastMonthEnd.setDate(0);
        lastMonthEnd.setHours(23, 59, 59, 999);
        whereConditions.createdAt = {
          [Op.gte]: lastMonthStart,
          [Op.lte]: lastMonthEnd,
        };
      } else if (publicado === "estaSemana") {
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay());
        sunday.setHours(0, 0, 0, 0);

        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);
        saturday.setHours(23, 59, 59, 999);

        whereConditions.createdAt = {
          [Op.between]: [sunday, saturday],
        };
      }
    }

    const aulas = await Aula.findAll({
      where: whereConditions,
      include: [
        {
          model: Professor,
          as: "professores",
          attributes: ["nome", "email"],
        },
        {
          model: Materias,
          as: "materias",
          attributes: ["nome"],
        },
        {
          model: Laboratorio,
          as: "laboratorios",
          attributes: ["nome"],
        },
        {
          model: Equipamento,
          as: "equipamentos",
          attributes: ["equipamento"],
        },
        {
          model: Vidrarias,
          as: "vidrarias",
          attributes: ["vidraria"],
        },
        {
          model: AgenteReajente,
          as: "agentes_reajentes",
          attributes: ["nome"],
        },
      ],
    }) as any;


    const filteredAulas =
    userRole === "prof"
        ? aulas.filter((e: any) =>
              e.professores.some((professor: any) => professor.email === userEmail)
          )
        : aulas;

    const response = NextResponse.json(
      { status: "success", data: filteredAulas },
      { status: 200 }
    );

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: `erro ao fazer a solicitação: ${error}`,
        code: 400,
      },
      { status: 400 }
    );
  }
}
