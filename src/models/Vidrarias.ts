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
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    preco_compra: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_fornecedor: {
        type: DataTypes.INTEGER, 
        references: {
            model: Fornecedor,
            key: 'id',
        }
    },
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

// Relacionamento Muitos-para-Muitos
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

FornecedorVidrarias.sync();
Vidrarias.sync();

export { Vidrarias };