import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Administrador } from "@/models/Administrador";
import { Professor } from "@/models/Professor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { name, image } = await req.json();

    try {
        const userId = session.user.id;
        let user;

        if (session.user.role === 'adm') {
            user = await Administrador.findByPk(userId) as any;
        } else if (session.user.role === 'prof') {
            user = await Professor.findByPk(userId) as any;
        } else {
            return NextResponse.json({ message: "Função de usuário desconhecida" }, { status: 400 });
        }

        if (!user) {
            return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
        }

        user.nome = name || user.nome;
        user.image = image || user.image;
        await user.save();

        const updatedSession = {
            ...session,
            user: {
                ...session.user,
                name: user.nome,
                image: user.image,
            },
        };

        return NextResponse.json(updatedSession, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        return NextResponse.json({ message: "Erro ao atualizar o usuário" }, { status: 500 });
    }
}
