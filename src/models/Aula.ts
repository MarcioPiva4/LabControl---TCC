import { db } from "@/lib/db";
import { DataTypes } from "sequelize";

const Aula = db.define('aula', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});