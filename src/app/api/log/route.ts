import { Logs } from "@/models/Log";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const stream = new ReadableStream({
            start(controller) {
                // Função para emitir dados a cada 5 segundos (ou conforme necessário)
                const interval = setInterval(async () => {
                    const logs = await Logs.findAll();
                    controller.enqueue(`data: ${JSON.stringify({ status: 'success', data: logs })}\n\n`);
                }, 5000); // Envia dados a cada 5 segundos

                // Caso o cliente desconecte, limpamos o intervalo
                req.signal.addEventListener('abort', () => {
                    clearInterval(interval);
                    controller.close();
                });
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `erro ao fazer a solicitação: ${error}`, code: 400 }, { status: 400 });
    }
}
