import { db } from "@/lib/db";
import { Sequelize, DataTypes } from "sequelize";

const Professor = db.define('professores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

export { Professor };