import { AgenteReajente } from "@/models/Agente_reajente";
import {
  AgenteReajenteAula,
  Aula,
  EquipamentoAula,
  LaboratorioAula,
  MateriaAula,
  ProfessorAula,
  VidrariaAula,
} from "@/models/Aula";
import { Equipamento } from "@/models/Equipamento";
import { Laboratorio } from "@/models/Laboratorio";
import { Materias } from "@/models/Materias";
import { Professor } from "@/models/Professor";
import { Vidrarias } from "@/models/Vidrarias";
import { isValidateDate } from "@/utils/dateValidator";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { checkAndSubtractStock } from "@/utils/stockConversion";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const aulas = await Aula.findAll({
      include: [
        {
          model: Professor,
          as: "professores",
          attributes: ["nome"],
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
    });
    const response = NextResponse.json(
      { status: "success", data: aulas },
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

export async function POST(req: NextRequest) {
  try {
    const { aula, equipamentos, vidrarias, agenteReajente } =
      (await req.json()) as any;
    const {
      id_materia,
      id_professor,
      id_laboratorio,
      topico_aula,
      horario_inicio,
      horario_finalizacao,
      data,
      observacoes,
    } = aula;

    if (
      topico_aula.toString().length <= 0 ||
      horario_inicio.toString().length <= 0 ||
      horario_finalizacao.toString().length <= 0 ||
      data.toString().length <= 0
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Não pode haver campos obrigatórios vazios",
        },
        { status: 400 }
      );
    }

    if (!isValidateDate(data)) {
      return NextResponse.json(
        { status: "error", message: "Data inválida" },
        { status: 400 }
      );
    }

    if (isDescriptionLengthMore(observacoes)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Não ultrapasse os 255 caracteres nas observações",
        },
        { status: 400 }
      );
    }

    if (equipamentos || vidrarias || agenteReajente) {
      const verificarEstoque = async () => {
        if (equipamentos) {
          for (const e of equipamentos) {
            const equipamento = (await Equipamento.findByPk(
              e.id_equipamento
            )) as any;
            if (equipamento) {
              const novaQuantidadeFloat =
                equipamento.quantidade_float - e.quantidade_equipamento;
              if (novaQuantidadeFloat < 0) {
                throw new Error(
                  "Estoque não disponível para o equipamento, diminua e tente novamente."
                );
              }
            }
          }
        }

        if (vidrarias) {
          for (const e of vidrarias) {
            const vidraria = (await Vidrarias.findByPk(e.id_vidrarias)) as any;
            if (vidraria) {
              const novaQuantidadeFloat =
                vidraria.quantidade_float - e.quantidade_vidrarias;
              if (novaQuantidadeFloat < 0) {
                throw new Error(
                  "Estoque não disponível para a vidraria, diminua e tente novamente."
                );
              }
            }
          }
        }

        if (agenteReajente) {
          for (const e of agenteReajente) {
            const agentesReajentes = (await AgenteReajente.findByPk(
              e.id_agenteReajente
            )) as any;
            if (agentesReajentes) {
              checkAndSubtractStock(
                agentesReajentes.quantidade_float,
                e.quantidade_agenteReajente,
                agentesReajentes.medida_quantidade,
                e.unidade
              );
            }
          }
        }
      };
      await verificarEstoque();
    }

    const createAula = (await Aula.create({
      topico_aula,
      horario_inicio,
      horario_finalizacao,
      data,
      observacoes,
    })) as any;

    if (equipamentos || vidrarias || agenteReajente) {
      if(equipamentos){
        //muitos para muitos
        await Promise.all(
          equipamentos.map(async (e: any) => {
            await EquipamentoAula.create({
              id_equipamento: e.id_equipamento,
              id_aula: createAula.id,
              quantidade: e.quantidade_equipamento,
            });
          })
        );

        //att qtn float
        await Promise.all(
          equipamentos.map(async (e: any) => {
            const equipamento = (await Equipamento.findByPk(
              e.id_equipamento
            )) as any;

            if (equipamento) {
              const novaQuantidadeFloat =
                equipamento.quantidade_float - e.quantidade_equipamento;

              await equipamento.update({
                quantidade_float: novaQuantidadeFloat,
              });
            }
          })
        );
      }

      if(vidrarias){
        //muitos para muitos
        await Promise.all(
          vidrarias.map(async (e: any) => {
            await VidrariaAula.create({
              id_vidraria: e.id_vidrarias,
              id_aula: createAula.id,
              quantidade: e.quantidade_vidrarias,
            });
          })
        );

        //att qtn float
        await Promise.all(
          vidrarias.map(async (e: any) => {
            const vidraria = (await Vidrarias.findByPk(e.id_vidrarias)) as any;
  
            if (vidraria) {
              const novaQuantidadeFloat =
                vidraria.quantidade_float - e.quantidade_vidrarias;
  
              await vidraria.update({
                quantidade_float: novaQuantidadeFloat,
              });
            }
          })
        );
      }

      if(agenteReajente){
        //muitos para muitos
        await Promise.all(
          agenteReajente.map(async (e: any) => {
            await AgenteReajenteAula.create({
              id_agentereajente: e.id_agenteReajente,
              id_aula: createAula.id,
              quantidade: e.quantidade_agenteReajente,
              medida_quantidade: e.unidade,
            });
          })
        );

        //att qtn float
        await Promise.all(
          agenteReajente.map(async (e: any) => {
            const agentesReajentes = (await AgenteReajente.findByPk(
              e.id_agenteReajente
            )) as any;
  
            if (agentesReajentes) {
              const novaQuantidadeFloat =
                agentesReajentes.quantidade_float - e.quantidade_agenteReajente;
  
              await agentesReajentes.update({
                quantidade_float: novaQuantidadeFloat,
              });
            }
          })
        );
      }
    }

    await ProfessorAula.create({
      id_professor: id_professor,
      id_aula: createAula.id,
    });

    await LaboratorioAula.create({
      id_laboratorio: id_laboratorio,
      id_aula: createAula.id,
    });

    await MateriaAula.create({
      id_materia: id_materia,
      id_aula: createAula.id,
    });

    return NextResponse.json(
      { status: "sucess", message: "Aula criada com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: `${error}`, code: 400 },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { aula, equipamentos, vidrarias, agenteReajente, id } =
      (await req.json()) as any;
    const {
      id_materia,
      id_professor,
      id_laboratorio,
      topico_aula,
      horario_inicio,
      horario_finalizacao,
      data,
      observacoes,
    } = aula;

    // if (
    //   topico_aula.toString().length <= 0 ||
    //   horario_inicio.toString().length <= 0 ||
    //   horario_finalizacao.toString().length <= 0 ||
    //   data.toString().length <= 0
    // ) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Não pode haver campos obrigatórios vazios",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!isValidateDate(data)) {
    //   return NextResponse.json(
    //     { status: "error", message: "Data inválida" },
    //     { status: 400 }
    //   );
    // }

    // if (isDescriptionLengthMore(observacoes)) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Não ultrapasse os 255 caracteres nas observações",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!equipamentos) {
    //   return NextResponse.json(
    //     { status: "error", message: "Selecione um equipamento para a aula" },
    //     { status: 400 }
    //   );
    // }

    // if (!vidrarias) {
    //   return NextResponse.json(
    //     { status: "error", message: "Selecione uma vidraria para a aula" },
    //     { status: 400 }
    //   );
    // }

    // if (!agenteReajente) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Selecione um agente/reajente para a aula",
    //     },
    //     { status: 400 }
    //   );
    // }

    const editAula = (await Aula.update(
      {
        topico_aula,
        horario_inicio,
        horario_finalizacao,
        data,
        observacoes,
      },
      { where: { id: id } }
    )) as any;

    if (id_materia) {
      await MateriaAula.update(
        {
          id_materia: id_materia,
        },
        { where: { id_aula: id } }
      );
    }

    if (id_professor) {
      await ProfessorAula.update(
        {
          id_professor: id_professor,
        },
        { where: { id_aula: id } }
      );
    }

    if (id_laboratorio) {
      await LaboratorioAula.update(
        {
          id_laboratorio: id_laboratorio,
        },
        { where: { id_aula: id } }
      );
    }

    if (equipamentos) {
      await Promise.all(
        equipamentos.map(async (e: any) => {
          await EquipamentoAula.update(
            {
              quantidade: e.quantidade_equipamento,
            },
            {
              where: { id_equipamento: e.id_equipamento, id_aula: id },
            }
          );
        })
      );
    }

    if (vidrarias) {
      await Promise.all(
        vidrarias.map(async (e: any) => {
          await VidrariaAula.update(
            {
              quantidade: e.quantidade_vidrarias,
            },
            {
              where: { id_vidraria: e.id_vidrarias, id_aula: id },
            }
          );
        })
      );
    }

    if (agenteReajente) {
      await Promise.all(
        agenteReajente.map(async (e: any) => {
          await AgenteReajenteAula.update(
            {
              quantidade: e.quantidade_agenteReajente,
            },
            {
              where: { id_agentereajente: e.id_agenteReajente, id_aula: id },
            }
          );
        })
      );
    }

    const aulas = await Aula.findAll({
      include: [
        {
          model: Professor,
          as: "professores",
          attributes: ["nome"],
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
    });

    return NextResponse.json(
      { status: "sucess", data: aulas, message: "Aula editada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: `${error}`,
        code: 400,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = (await req.json()) as any;
    const aula = await Aula.findByPk(id, {include: [
        {
          model: AgenteReajente,
          as: "agentes_reajentes",
          attributes: ["id"],
        },
        {
          model: Equipamento,
          as: "equipamentos",
          attributes: ["id"],
        },
        {
          model: Vidrarias,
          as: "vidrarias",
          attributes: ["id"],
        }
      ]
    }) as any;
    if (aula) {
      if (aula.agentes_reajentes && Array.isArray(aula.agentes_reajentes)) {
        for (const agente of aula.agentes_reajentes) {
          const agenteReajente = await AgenteReajente.findByPk(agente.id);
          if (agenteReajente) {
            const quantidadeFloat = agenteReajente.get().quantidade_float;
            await agenteReajente.update({ quantidade: quantidadeFloat });
          }
        }
      }
    
      if (aula.equipamentos && Array.isArray(aula.equipamentos)) {
        for (const equipamento of aula.equipamentos) {
          const equipamentoInstance = await Equipamento.findByPk(equipamento.id);
          if (equipamentoInstance) {
            const quantidadeFloat = equipamentoInstance.get().quantidade_float;
            await equipamentoInstance.update({ quantidade: quantidadeFloat });
          }
        }
      }
    
      if (aula.vidrarias && Array.isArray(aula.vidrarias)) {
        for (const vidraria of aula.vidrarias) {
          const vidrariaInstance = await Vidrarias.findByPk(vidraria.id);
          if (vidrariaInstance) {
            const quantidadeFloat = vidrariaInstance.get().quantidade_float;
            await vidrariaInstance.update({ quantidade: quantidadeFloat });
          }
        }
      }
    
      await aula.update({ status: "finish" });
    
      return NextResponse.json(
        { status: "success", message: `Aula finalizada com sucesso`, code: 200 },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      {
        status: "error",
        message: `Aula não encontrada, tente outra aula`,
        code: 404,
      },
      { status: 404 }
    );
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json() as { id: number|string };
    const deleteAula = await Aula.findByPk(id);
    if (deleteAula) {
      await deleteAula.destroy();
      return NextResponse.json(
        { status: "sucess", message: "Aula removida com sucesso!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { status: "error", message: "Aula não encontrada, tente novamente" },
      { status: 404 }
    );
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
