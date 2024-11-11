import { AgenteReajenteItems } from "./agente_reajente";
import { EquipamentoItems } from "./equipamento";
import { LaboratorioItems } from "./laboratorio";
import { MateriaItems } from "./materia";
import { ProfessorItems } from "./professor";
import { VidrariaItems } from "./vidraria";

export interface AulaReq {
    status: string;
    data: [
        AulaItems
    ];
}

export interface AulaItems {
    id: number;
    topico_aula: string;
    horario_inicio: string;
    horario_finalizacao: string;
    data: string;
    status: string;
    observacoes: string;
    createdAt: string;
    updatedAt: string;
    professores: [ProfessorItems],
    materias: [MateriaItems],
    laboratorios: [LaboratorioItems],
    equipamentos: [EquipamentoItems],
    vidrarias: [VidrariaItems],
    agentes_reajentes: [AgenteReajenteItems]
}