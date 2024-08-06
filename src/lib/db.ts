import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT as string),
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  }
);

db.authenticate()
  .then(() => console.log('Database connected...'))

  .catch(err => console.error('Error: ' + err));

export { db };
