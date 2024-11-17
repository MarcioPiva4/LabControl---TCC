import { Logs } from "@/models/Log";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

let lastSentLogs: any[] = []; // Para armazenar os logs enviados anteriormente

export async function GET(req: Request) {
    try {
        const stream = new ReadableStream({
            start(controller) {
                // Criando uma função que envia os novos logs de forma contínua.
                const notifyNewLogs = async () => {
                    try {
                        const logs = await Logs.findAll() as any;

                        // Verificar se houve alteração nos logs
                        const newLogs = logs.filter((log: any) => !lastSentLogs.some(lastLog => lastLog.id === log.id));

                        if (newLogs.length > 0) {
                            lastSentLogs = logs; // Atualiza o estado dos logs enviados
                            // Enviar apenas os logs novos
                            controller.enqueue(`data: ${JSON.stringify({ status: 'success', data: newLogs })}\n\n`);
                        }
                    } catch (error) {
                        controller.enqueue(`data: ${JSON.stringify({ status: 'error', message: 'Erro ao buscar os logs' })}\n\n`);
                    }
                };

                // Invoca a função imediatamente e a cada 5 segundos para verificar novas alterações
                const interval = setInterval(notifyNewLogs, 5000);
                notifyNewLogs(); // Primeira execução imediata

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
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: `Erro ao processar a solicitação: ${error}`, code: 500 }, { status: 500 });
    }
}
