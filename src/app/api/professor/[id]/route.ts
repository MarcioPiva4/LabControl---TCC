import { NextRequest, NextResponse } from "next/server";
import { Professor } from "@/models/Professor";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID do professor não foi fornecido.", code: 400 },
        { status: 400 }
      );
    }

    const professor = await Professor.findOne({ where: { id } }) as any;

    if (!professor) {
      return NextResponse.json(
        { status: "error", message: "Professor não encontrado.", code: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", data: professor.image },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: `Erro ao fazer a solicitação: ${error}`, code: 500 },
      { status: 500 }
    );
  }
}
