import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Fornecedor } from "./Fornecedor";

const Equipamento = db.define('equipamentos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    equipamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero_serie: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    marca_modelo: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    localizacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

const FornecedorEquipamentos = db.define('FornecedorEquipamentos', {
    id_fornecedor: {
        type: DataTypes.INTEGER,
        references: {
            model: Fornecedor,
            key: 'id'
        }
    },
    id_equipamentos: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipamento,
            key: 'id'
        }
    }
});

// Relacionamento Muitos-para-Muitos
Fornecedor.belongsToMany(Equipamento, {
    through: FornecedorEquipamentos,
    foreignKey: 'id_fornecedor',
    otherKey: 'id_equipamentos',
    as: 'equipamentos'
});

Equipamento.belongsToMany(Fornecedor, {
    through: FornecedorEquipamentos,
    foreignKey: 'id_equipamentos',
    otherKey: 'id_fornecedor',
    as: 'fornecedores'
});

Equipamento.sync({alter: true});
FornecedorEquipamentos.sync();

export { Equipamento, FornecedorEquipamentos };