import { db } from "@/lib/db";
import { DataTypes } from "sequelize";

const Fornecedor = db.define('fornecedores', {
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
    cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Fornecedor.sync({alter: true});

export { Fornecedor };