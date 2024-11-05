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
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_contratacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING,
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
    defaultValue: 0, // Valor padrão para novo administrador
  },
});

// Administrador.sync({ force: true });
export { Administrador };
