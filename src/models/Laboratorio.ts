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
        type: DataTypes.STRING,
        allowNull: false,
    },
    predio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    andar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bloco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sala: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

Laboratorio.sync({alter: true});
export { Laboratorio };