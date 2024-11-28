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
    id: number | string;
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

export interface AulaItemsRelationships {
    id: number | string;
    topico_aula: string;
    horario_inicio: string;
    horario_finalizacao: string;
    data: string;
    status: string;
    observacoes: string;
    createdAt: string;
    updatedAt: string;
    professores: [ProfessoresRelationshipsItems],
    materias: [MateriasRelationshipsItems],
    laboratorios: [LaboratorioRelationshipsItems],
    equipamentos: [EquipamentosRelationshipsItems],
    vidrarias: [VidrariasRelationshipsItems],
    agentes_reajentes: [AgenteReajenteRelationshipsItems]
}

export interface AgenteReajenteRelationshipsItems {
    AgenteReajenteAula: {
        id_agentereajente: number;
        id_aula: number;
        quantidade: string;
        medida_quantidade: string;
        createdAt: string;
        updatedAt: string;
    }
    nome: string;
}

export interface EquipamentosRelationshipsItems {
    EquipamentoAula: {
        id_equipamento: number;
        id_aula: number;
        quantidade: string;
        createdAt: string;
        updatedAt: string;
    }
    equipamento: string;
}

export interface VidrariasRelationshipsItems {
    VidrariaAula: {
        id_vidraria: number;
        id_aula: number;
        quantidade: string;
        createdAt: string;
        updatedAt: string;
    }
    vidraria: string;
}

export interface ProfessoresRelationshipsItems {
    ProfessorAula: {
        id_professor: number | string;
        id_aula: number;
        createdAt: string;
        updatedAt: string;
    }
    nome: string;
}

export interface MateriasRelationshipsItems {
    MateriaAula: {
        id_materia: number | string;
        id_aula: number;
        createdAt: string;
        updatedAt: string;
    }
    nome: string;
}

export interface LaboratorioRelationshipsItems {
    LaboratorioAula: {
        id_laboratorio: number | string;
        id_aula: number;
        createdAt: string;
        updatedAt: string;
    }
    nome: string;
}

