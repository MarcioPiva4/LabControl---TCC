import { getServerSession } from "next-auth";
import { promises as fs } from "fs";
import path from "path";
import { authOptions } from "@/utils/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json({ message: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const userFolder = session?.user?.id.toString();
  const uploadsDir = path.join(process.cwd(), "public/uploads", userFolder);

  try {
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${(file as any).name}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ imageUrl: `/uploads/${userFolder}/${fileName}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao salvar a imagem" }, { status: 500 });
  }
}
