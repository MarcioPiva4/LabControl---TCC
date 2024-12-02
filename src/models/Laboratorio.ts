import { db } from "@/lib/db";
import { DataTypes } from "sequelize";

const Laboratorio = db.define('laboratorios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    predio: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    andar: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    bloco: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    sala: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    responsavel: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

Laboratorio.sync({alter: true});
export { Laboratorio };