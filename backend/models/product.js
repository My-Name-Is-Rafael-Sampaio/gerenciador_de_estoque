const Sequelize = require('sequelize');
const db = require('./db');

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    purchasePrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    salePrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Cria a tabela
// Product.sync();

// Atualiza a tabela
// Product.sync({ alter: true });

module.exports = Product;