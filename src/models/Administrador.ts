import { db } from "@/lib/db";
import { DataTypes } from "sequelize";

const Administrador = db.define("administradores", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  data_contratacao: {
    type: DataTypes.DATE,
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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loginCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
});

Administrador.sync({ alter: true });
export { Administrador };
