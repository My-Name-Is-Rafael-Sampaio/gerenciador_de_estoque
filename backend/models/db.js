const Sequelize = require('sequelize');

const { dbInfo } = require('../.env');

const db = new Sequelize(dbInfo.database, dbInfo.user, dbInfo.password, {
    host: dbInfo.host,
    dialect: 'mysql'
});

db.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso.")
    })
    .catch(() => {
        console.log("Falha na conexão com o banco de dados.")
    })

module.exports = db;