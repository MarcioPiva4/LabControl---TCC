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
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    formula: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    peso_molecular: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING(100),
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
    medida_quantidade: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    armazenamento_recomendado: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
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