
const Sequelize = require('sequelize');
const db = require('../database');
const User = require('../models/User');

 
const Exam = db.define('Exam', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    examtype: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    medic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    
})

Exam.belongsTo(User, {as: 'Medic', foreignKey : 'medic_id'});
Exam.belongsTo(User, {as: 'Patient', foreignKey : 'patient_id'});
 
module.exports = Exam;