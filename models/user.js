const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ticketNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passportData: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Нет теста",
    },
    flightTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    pcrTestTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = User;
