import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Materias } from "./Materias";
import { Professor } from "./Professor";
import { Laboratorio } from "./Laboratorio";
import { Equipamento } from "./Equipamento";
import { Vidrarias } from "./Vidrarias";
import { AgenteReajente } from "./Agente_reajente";

const Aula = db.define('aulas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    topico_aula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_inicio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_finalizacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'in progress'
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const MateriaAula = db.define('MateriaAula', {
    id_materia: {
        type: DataTypes.INTEGER,
        references: {
            model: Materias,
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    }
});

//relacionamentos muitos para muito - materia/aula
Materias.belongsToMany(Aula, {
    through: MateriaAula, 
    foreignKey: 'id_materia',
    otherKey: 'id_aula',
    as: 'materiaAulas',
});

Aula.belongsToMany(Materias, {
    through: MateriaAula,
    foreignKey: 'id_aula',
    otherKey: 'id_materia',
    as: 'materias'
});

const ProfessorAula = db.define('ProfessorAula', {
    id_professor: {
        type: DataTypes.INTEGER,
        references: {
            model: Professor,
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    }
});

//relacionamentos muitos para muito - professor/aula
Professor.belongsToMany(Aula, {
    through: ProfessorAula, 
    foreignKey: 'id_professor',
    otherKey: 'id_aula',
    as: 'professorAulas',
});

Aula.belongsToMany(Professor, {
    through: ProfessorAula,
    foreignKey: 'id_aula',
    otherKey: 'id_professor',
    as: 'professores'
});

const LaboratorioAula = db.define('LaboratorioAula', {
    id_laboratorio: {
        type: DataTypes.INTEGER,
        references: {
            model: Laboratorio,
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    }
});

//relacionamentos muitos para muito - laboratorio/aula
Laboratorio.belongsToMany(Aula, {
    through: LaboratorioAula, 
    foreignKey: 'id_laboratorio',
    otherKey: 'id_aula',
    as: 'laboratorioAulas',
});

Aula.belongsToMany(Laboratorio, {
    through: LaboratorioAula,
    foreignKey: 'id_aula',
    otherKey: 'id_laboratorio',
    as: 'laboratorios'
});

const EquipamentoAula = db.define('EquipamentoAula', {
    id_equipamento: {
        type: DataTypes.INTEGER,
        references: {
            model: Laboratorio,
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Equipamento.belongsToMany(Aula, {
    through: EquipamentoAula, 
    foreignKey: 'id_equipamento',
    otherKey: 'id_aula',
    as: 'equipamentoAulas',
});

Aula.belongsToMany(Equipamento, {
    through: EquipamentoAula,
    foreignKey: 'id_aula',
    otherKey: 'id_equipamento',
    as: 'equipamentos'
});

const VidrariaAula = db.define('VidrariaAula', {
    id_vidraria: {
        type: DataTypes.INTEGER,
        references: {
            model: Vidrarias,
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Vidrarias.belongsToMany(Aula, {
    through: VidrariaAula, 
    foreignKey: 'id_vidraria',
    otherKey: 'id_aula',
    as: 'VidrariaAulas',
});

Aula.belongsToMany(Vidrarias, {
    through: VidrariaAula,
    foreignKey: 'id_aula',
    otherKey: 'id_vidraria',
    as: 'vidrarias'
});

const AgenteReajenteAula = db.define('AgenteReajenteAula', {
    id_agentereajente: {
        type: DataTypes.INTEGER,
        references: {
            model: AgenteReajente, 
            key: 'id'
        }
    },
    id_aula: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

AgenteReajente.belongsToMany(Aula, {
    through: AgenteReajenteAula,  // Ensure this is correct
    foreignKey: 'id_agentereajente',
    otherKey: 'id_aula',
    as: 'agenteReajenteAulas',
});

Aula.belongsToMany(AgenteReajente, {
    through: AgenteReajenteAula,
    foreignKey: 'id_aula',
    otherKey: 'id_agentereajente',
    as: 'agentes_reajentes'
});

Aula.sync({ alter: true });
MateriaAula.sync({ alter: true });
ProfessorAula.sync({ alter: true });
LaboratorioAula.sync({ alter: true });
EquipamentoAula.sync({alter: true});
VidrariaAula.sync({alter: true});
AgenteReajenteAula.sync({alter: true});

export { Aula, MateriaAula, ProfessorAula, LaboratorioAula, EquipamentoAula, VidrariaAula, AgenteReajenteAula };
