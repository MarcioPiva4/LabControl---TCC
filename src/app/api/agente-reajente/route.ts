import {
  AgenteReajente,
  FornecedorAgenteReajente,
} from "@/models/Agente_reajente";
import { Logs } from "@/models/Log";
import { AgenteReajenteItems, AgenteReajenteReqPost } from "@/types/agente_reajente";
import { authOptions } from "@/utils/authOptions";
import { isDescriptionLengthMore } from "@/utils/descriptionValidatador";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Model } from "sequelize";

export async function GET() {
  try {
    const agentesReajentes = await AgenteReajente.findAll();
    return NextResponse.json(
      { status: "success", data: agentesReajentes },
      { status: 200 }
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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  await Logs.create({
      nome: session?.user?.name,
      typeHttp: 'POST',
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
      message: 'Iniciou uma requisição na rota de agentes/reajentes'
  });
  try {
    const {
      nome,
      formula,
      peso_molecular,
      material,
      cas,
      data_compra,
      data_validade,
      concentracao,
      quantidade,
      medida_quantidade,
      armazenamento_recomendado,
      observacoes,
      id_fornecedor,
    } = (await req.json()) as AgenteReajenteReqPost;
    if (
      nome.toString().length <= 0 ||
      formula.toString().length <= 0 ||
      peso_molecular.toString().length <= 0 ||
      material.toString().length <= 0 ||
      cas.toString().length <= 0 ||
      data_compra.toString().length <= 0 ||
      data_validade.toString().length <= 0 ||
      concentracao.toString().length <= 0 ||
      quantidade.toString().length <= 0 
    ) {
      return NextResponse.json(
        { status: "error", message: "Não pode haver campos vazios" },
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

    const quantidade_float = quantidade;
    const createAgenteReajente = (await AgenteReajente.create({
      nome,
      formula,
      peso_molecular,
      material,
      cas,
      data_compra,
      data_validade,
      concentracao,
      quantidade,
      medida_quantidade,
      quantidade_float,
      armazenamento_recomendado,
      observacoes,
    })) as Model<AgenteReajenteItems>;

    await Promise.all(
      id_fornecedor.map(async (fornecedorId) => {
        await FornecedorAgenteReajente.create({
          id_fornecedor: fornecedorId,
          id_agente_reajente: createAgenteReajente.get('id'),
        });
      })
    );

    await Logs.create({
      nome: session?.user?.name,
      typeHttp: 'POST',
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
      message: 'Finalizou o cadastro de um agente/reajente'
    });
    return NextResponse.json(
      {
        status: "sucess",
        message: "Agente/reajente criado com sucesso",
        createAgenteReajente,
      },
      { status: 201 }
    );
  } catch (error) {
    await Logs.create({
      nome: session?.user?.name,
      typeHttp: 'POST',
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip,
      message: 'A requisição fracassou'
    });
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
    const deleteAgenteReajente = await AgenteReajente.findByPk(id);
    if (deleteAgenteReajente) {
      await deleteAgenteReajente.destroy();
      return NextResponse.json(
        { status: "sucess", message: "Agente reajente removido com sucesso!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Agente reajente não encontrado, tente novamente",
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

export async function PATCH(req: NextRequest) {
  try {
    const {
      nome,
      formula,
      peso_molecular,
      material,
      cas,
      data_compra,
      data_validade,
      concentracao,
      quantidade,
      armazenamento_recomendado,
      observacoes,
      id_fornecedor,
      id,
    } = (await req.json()) as AgenteReajenteReqPost;
    const editAgenteReajente = await AgenteReajente.findByPk(id);
    if (editAgenteReajente) {
      if (nome != undefined) {
        await editAgenteReajente.update({ nome });
      }

      if (formula != undefined) {
        await editAgenteReajente.update({ formula });
      }

      if (peso_molecular != undefined) {
        await editAgenteReajente.update({ peso_molecular });
      }

      if (material != undefined) {
        await editAgenteReajente.update({ material });
      }

      if (cas != undefined) {
        await editAgenteReajente.update({ cas });
      }

      if (data_compra != undefined) {
        await editAgenteReajente.update({ data_compra });
      }

      if (data_validade != undefined) {
        await editAgenteReajente.update({ data_validade });
      }

      if (concentracao != undefined) {
        await editAgenteReajente.update({ concentracao });
      }

      if (quantidade != undefined) {
        await editAgenteReajente.update({ quantidade });
      }

      if (armazenamento_recomendado != undefined) {
        await editAgenteReajente.update({ armazenamento_recomendado });
      }

      if (observacoes != undefined) {
        await editAgenteReajente.update({ observacoes });
      }

      if (id_fornecedor != undefined) {
        await editAgenteReajente.update({ id_fornecedor });
      }

      return NextResponse.json(
        { status: "sucess", message: "Agente reajente alterado com sucesso!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Agente reajente não encontrado, tente novamente",
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
