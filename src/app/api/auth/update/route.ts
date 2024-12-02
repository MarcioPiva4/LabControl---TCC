import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Administrador } from "@/models/Administrador";
import { NextRequest, NextResponse } from "next/server";
import { Professor } from "@/models/Professor";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const data = await req.json();

  const imageUrl = data.image;
  const newName = data.name;

  // Atualizar nome e imagem no banco de dados
  try {
    const userId = session.user.id;
    const userAdministrador = await Administrador.findByPk(userId) as any;
    const userProfessor = await Professor.findByPk(userId) as any;
    if (userAdministrador && session.user.role == 'adm') {
      userAdministrador.nome = newName || userAdministrador.nome;
      userAdministrador.image = imageUrl || userAdministrador.image;
      await userAdministrador.save();

      const updatedSession = {
        ...session,
        userAdministrador: {
          ...session.user,
          name: userAdministrador.nome,
          image: userAdministrador.image,
        },
      };

      return NextResponse.json(updatedSession, { status: 200 });
    } else if(userProfessor && session.user.role == 'prof'){
      userProfessor.nome = newName || userProfessor.nome;
      userProfessor.image = imageUrl || userProfessor.image;
      await userProfessor.save();

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          name: userProfessor.nome,
          image: userProfessor.image,
        },
      };

      return NextResponse.json(updatedSession, { status: 200 });
    }
    else {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    return NextResponse.json({ message: "Erro ao atualizar o usuário" }, { status: 500 });
  }
}
