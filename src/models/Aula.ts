import { db } from "@/lib/db";
import { DataTypes } from "sequelize";

const Aula = db.define('aula', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    materia: { //chave estrangeira
        type: DataTypes.STRING,
        allowNull: false,
    },
    professor: {//chave estrangeira
        type: DataTypes.STRING,
        allowNull: false,
    },
    topico_aula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_inicio:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_finalizacao:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    data:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});