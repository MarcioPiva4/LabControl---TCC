import { db } from "@/lib/db";
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
import { Logs } from "@/models/Log";
import { Materias } from "@/models/Materias";
import { Professor } from "@/models/Professor";
import { Vidrarias } from "@/models/Vidrarias";
import { authOptions } from "@/utils/authOptions";
import { isValidateDate } from "@/utils/dateValidator";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { formatDate } from "@/utils/formatData";
import { validateHourly } from "@/utils/horarioAula";
import { checkAndSubtractStock } from "@/utils/stockConversion";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { status: "error", message: "Token não encontrado no cabeçalho" },
      { status: 401 }
    );
  }
  // Extrair o token do cabeçalho Authorization
  const token = await getToken({
    req,
    secret,
    raw: true,
  });

  if (!token) {
    return NextResponse.json(
      { status: "error", message: "Token inválido ou expirado" },
      { status: 401 }
    );
  }

  const userRole = req.headers.get("X-User-Role");
  const userEmail = req.headers.get("X-User-Email");
  try {
    const aulas = await Aula.findAll({
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
    });

    // Recupera a sessão do usuário
    const filteredAulas = !userRole && !userEmail ? 
      userRole === "prof"
        ? aulas.filter((e: any) =>
            e.professores.some((professor: any) => professor.email === userEmail)
          )
        : aulas : aulas;

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
        message: `Erro ao fazer a solicitação: ${error}`,
        code: 400,
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  await Logs.create({
    nome: session?.user?.name,
    typeHttp: "POST",
    ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
    message: "Iniciou uma requisição na rota de aulas",
  });
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
        { status: "error", message: `A data ${formatDate(data)} é inválida. Por favor, insira uma data futura.` },
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

    const testTime = validateHourly(horario_inicio, horario_finalizacao);
    if (!testTime.value){
      return NextResponse.json(
        {
          status: "error",
          message: testTime.message
        },
        { status: 400 }
      )
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
      if (equipamentos) {
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

      if (vidrarias) {
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

      if (agenteReajente) {
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

    await Logs.create({
      nome: session?.user?.name,
      typeHttp: "POST",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
      message: `Finalizou o cadastro de uma aula`,
    });

    return NextResponse.json(
      { status: "sucess", message: "Aula criada com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    await Logs.create({
      nome: session?.user?.name,
      typeHttp: "POST",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
      message: `A requisição fracassou`,
    });

    return NextResponse.json(
      { status: "error", message: `${error}`, code: 400 },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { aula, equipamentos, vidrarias, agenteReajente, id } = await req.json();
    const { id_materia, id_professor, id_laboratorio, topico_aula, horario_inicio, horario_finalizacao, data, observacoes } = aula;

    console.log("Recuperado do front", equipamentos);

    // Função para verificar e atualizar estoque
    const verificarEstoque = async () => {
      if (equipamentos) {
        // Itera sobre cada equipamento
        for (const e of equipamentos) {
          const t = await db.transaction(); // Cria uma transação isolada por item

          try {
            // Recupera o equipamento
            const equipamento = await Equipamento.findByPk(e.id_equipamento, { transaction: t }) as any;
            if (equipamento) {
              const aulaEquipamento = await Aula.findByPk(e.id_aula, {
                include: [
                  {
                    model: Equipamento,
                    as: "equipamentos",
                    attributes: ["id", "equipamento"],
                    through: {
                      attributes: ["quantidade"],
                    },
                  },
                ],
                transaction: t,
              }) as any;

              // Processa a atualização do estoque para cada equipamento
              for (const equip of aulaEquipamento.equipamentos) {
                const quantidadeAula = equip.EquipamentoAula.quantidade;
                const quantidadeSub = e.quantidade_equipamento - quantidadeAula;
                const quantidadeAdi = e.quantidade_equipamento + quantidadeAula;

                console.log("quantidadeSub:", quantidadeSub, "quantidadeAdi:", quantidadeAdi, "estoque:", equipamento.quantidade, "quantidadeAula:", quantidadeAula, "estoque_float:", equipamento.quantidade_float);

                // Ajuste no estoque baseado na quantidade subtraída ou adicionada
                if (quantidadeSub < 0 && quantidadeAdi > quantidadeAula) {
                  const incrementEstoque = equipamento.quantidade_float + Math.abs(quantidadeSub);

                  if (incrementEstoque > equipamento.quantidade) {
                    console.log(`Erro: Estoque insuficiente para o equipamento "${equip.equipamento}".`);
                    throw new Error(`Estoque insuficiente para o equipamento: "${equip.equipamento}".`);
                  }

                  await EquipamentoAula.update(
                    { quantidade: e.quantidade_equipamento },
                    { where: { id_equipamento: e.id_equipamento, id_aula: e.id_aula }, transaction: t }
                  );
                  await equipamento.update({ quantidade_float: incrementEstoque }, { transaction: t });
                }

                if (quantidadeSub > 0 && quantidadeAdi > quantidadeAula) {
                  const reduceEstoque = equipamento.quantidade_float - Math.abs(quantidadeSub);

                  if (reduceEstoque < 0) {
                    console.log(`Erro: Estoque insuficiente para o equipamento "${equip.equipamento}".`);
                    throw new Error(`Estoque insuficiente para o equipamento: "${equip.equipamento}".`);
                  }

                  await EquipamentoAula.update(
                    { quantidade: e.quantidade_equipamento },
                    { where: { id_equipamento: e.id_equipamento, id_aula: e.id_aula }, transaction: t }
                  );
                  await equipamento.update({ quantidade_float: reduceEstoque }, { transaction: t });
                }
              }
            }

            // Commit após processar todos os equipamentos
            await t.commit();
          } catch (error) {
            // Rollback em caso de erro
            await t.rollback();
            console.error("Erro ao processar o equipamento:", error);
            throw new Error(`Erro ao processar o equipamento "${e.id_equipamento}".`);
          }
        }
      }
    };

    await verificarEstoque();

    // Lógica para remover ou adicionar equipamentos
    if (equipamentos) {
      const equipamentosEnviados = equipamentos.map((e: any) => e.id_equipamento);
      for (const e of equipamentos) {
        const equipamento = await Equipamento.findByPk(e.id_equipamento) as any;
        if (equipamento) {
          const aulaEquipamento = await Aula.findByPk(e.id_aula, {
            include: [
              {
                model: Equipamento,
                as: "equipamentos",
                attributes: ["id", "equipamento"],
                through: { attributes: ["quantidade"] },
              },
            ],
          }) as any;

          const equipamentoNaAula = aulaEquipamento.equipamentos.find((equip: any) => equip.id === e.id_equipamento);

          for (const equipamentoAula of aulaEquipamento.equipamentos) {
            if (!equipamentosEnviados.includes(equipamentoAula.id)) {
              const equipamentoAtualizado = await Equipamento.findOne({ where: { id: equipamentoAula.id } }) as any;
              const equipamentoAulaRelacao = await EquipamentoAula.findOne({
                where: { id_aula: e.id_aula, id_equipamento: equipamentoAula.id },
              }) as any;
              const quantidadeFloat = equipamentoAtualizado.quantidade_float + equipamentoAulaRelacao.quantidade;

              await equipamentoAtualizado.update({ quantidade_float: quantidadeFloat });
              await EquipamentoAula.destroy({
                where: { id_aula: e.id_aula, id_equipamento: equipamentoAula.id },
              });
            }
          }

          if (!equipamentoNaAula) {
            const novaQuantidadeFloat = equipamento.quantidade_float - e.quantidade_equipamento;
            if (novaQuantidadeFloat < 0) {
              throw new Error(`Estoque insuficiente para o equipamento: "${equipamento.equipamento}". Reduza a quantidade e tente novamente.`);
            }
            await aulaEquipamento.addEquipamento(equipamento, { through: { quantidade: e.quantidade_equipamento } });
            await equipamento.update({ quantidade_float: novaQuantidadeFloat });
          }
        }
      }
    }

    if (!isValidateDate(data)) {
      return NextResponse.json(
        { status: "error", message: `A data ${formatDate(data)} é inválida. Por favor, insira uma data futura.` },
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

    const testTime = validateHourly(horario_inicio, horario_finalizacao);
    if (!testTime.value){
      return NextResponse.json(
        {
          status: "error",
          message: testTime.message
        },
        { status: 400 }
      )
    }

    // Atualizações relacionadas à aula
    if (id_materia) await MateriaAula.update({ id_materia }, { where: { id_aula: id } });
    if (id_professor) await ProfessorAula.update({ id_professor }, { where: { id_aula: id } });
    if (id_laboratorio) await LaboratorioAula.update({ id_laboratorio }, { where: { id_aula: id } });

    const editAula = await Aula.update(
      {
        topico_aula,
        horario_inicio,
        horario_finalizacao,
        data,
        observacoes,
      },
      { where: { id: id } } 
  ) as any;  

    // Retorna a aula atualizada
    const aulas = await Aula.findAll({
      include: [
        { model: Professor, as: "professores", attributes: ["nome"] },
        { model: Materias, as: "materias", attributes: ["nome"] },
        { model: Laboratorio, as: "laboratorios", attributes: ["nome"] },
        { model: Equipamento, as: "equipamentos", attributes: ["equipamento"] },
        { model: Vidrarias, as: "vidrarias", attributes: ["vidraria"] },
        { model: AgenteReajente, as: "agentes_reajentes", attributes: ["nome"] },
      ],
    });

    return NextResponse.json({ status: "sucess", data: aulas, message: "Aula editada com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: `${error}`, code: 400 }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = (await req.json()) as any;
    const aula = (await Aula.findByPk(id, {
      include: [
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
        },
      ],
    })) as any;
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
          const equipamentoInstance = await Equipamento.findByPk(
            equipamento.id
          );
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
        {
          status: "success",
          message: `Aula finalizada com sucesso`,
          code: 200,
        },
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
    const { id } = (await req.json()) as { id: number | string };
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
