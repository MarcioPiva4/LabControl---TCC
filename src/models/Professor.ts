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
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
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
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
});

Professor.sync({alter: true});

export { Professor };