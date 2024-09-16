import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Fornecedor } from "./Fornecedor";

const AgenteReajente = db.define('agentes_reajentes', {
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
    formula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso_molecular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cas: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    data_compra: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_validade: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    concentracao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    armazenamento_recomendado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_fornecedor: {
        type: DataTypes.INTEGER, 
        references: {
            model: Fornecedor,
            key: 'id',
        }
    },
});

const FornecedorAgenteReajente = db.define('FornecedorReajentes', {
    id_fornecedor: {
        type: DataTypes.INTEGER,
        references: {
            model: Fornecedor,
            key: 'id'
        }
    },
    id_agente_reajente: {
        type: DataTypes.INTEGER,
        references: {
            model: AgenteReajente,
            key: 'id'
        }
    }
});

// Relacionamento Muitos-para-Muitos
Fornecedor.belongsToMany(AgenteReajente, {
    through: FornecedorAgenteReajente,
    foreignKey: 'id_fornecedor',
    otherKey: 'id_agente_reajente',
    as: 'agentes_reajentes'
});

AgenteReajente.belongsToMany(Fornecedor, {
    through: FornecedorAgenteReajente,
    foreignKey: 'id_agente_reajente',
    otherKey: 'id_fornecedor',
    as: 'fornecedores'
});

AgenteReajente.sync({alter: true});
FornecedorAgenteReajente.sync({alter: true});

export { AgenteReajente, FornecedorAgenteReajente };