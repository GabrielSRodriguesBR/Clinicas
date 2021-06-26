
const Sequelize = require('sequelize');
const db = require('../database');
 
const Test = db.define('Test', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: Sequelize.STRING
})
 
module.exports = Test;