import { db } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Professor } from "./Professor";

const Materias = db.define('materias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emenda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // id_professor: {
    //     type: DataTypes.INTEGER, 
    //     references: {
    //         model: Professor,
    //         key: 'id',
    //     }
    // },
});

// Professor.hasOne(Materias, {
//     foreignKey: 'id_professor',
//     as: 'materias',
// });

// Materias.belongsTo(Professor, {
//     foreignKey: 'id_professor',
//     as: 'professor',
// });

Professor.sync({ force: true });
Materias.sync({ force: true });

export { Materias };