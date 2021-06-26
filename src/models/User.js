
const Sequelize = require('sequelize');
const db = require('../database');

 
const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: Sequelize.STRING
    },

    cpf:{
        type: Sequelize.BIGINT
    },

    phone:{
        type: Sequelize.BIGINT
    },

    usertype:{
        type: Sequelize.INTEGER,
        defaultValue: 0, // 0: admin, funcionario | 1: medico | 2: paciente
        allowNull: false,
    }
    
})
 
module.exports = User;