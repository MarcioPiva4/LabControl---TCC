import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Materias } from "./Materias";
import { Professor } from "./Professor";
import { Laboratorio } from "./Laboratorio";

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

Aula.sync();
MateriaAula.sync();
ProfessorAula.sync();
LaboratorioAula.sync();

export { Aula, MateriaAula, ProfessorAula, LaboratorioAula };
