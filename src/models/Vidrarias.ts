import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Fornecedor } from "./Fornecedor";

const Vidrarias = db.define('vidrarias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    vidraria: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    capacidade: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantidade_float: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    preco_compra: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const FornecedorVidrarias = db.define('FornecedorVidrarias', {
    id_fornecedor: {
        type: DataTypes.INTEGER,
        references: {
            model: Fornecedor,
            key: 'id'
        }
    },
    id_vidraria: {
        type: DataTypes.INTEGER,
        references: {
            model: Vidrarias,
            key: 'id'
        }
    }
});

Fornecedor.belongsToMany(Vidrarias, {
    through: FornecedorVidrarias,
    foreignKey: 'id_fornecedor',
    otherKey: 'id_vidraria',
    as: 'vidrarias'
});

Vidrarias.belongsToMany(Fornecedor, {
    through: FornecedorVidrarias,
    foreignKey: 'id_vidraria',
    otherKey: 'id_fornecedor',
    as: 'fornecedores'
});

Vidrarias.sync({alter: true});
FornecedorVidrarias.sync({alter: true});

export { Vidrarias, FornecedorVidrarias };