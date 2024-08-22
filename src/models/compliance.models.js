const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig/dbConfig.js');
const User = require('./user.models.js');

const Compliance = sequelize.define('Compliance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    report_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',  
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'compliance',
    timestamps: true,
});


User.belongsToMany(Compliance, {
    through: 'UserCompliance',
    foreignKey: 'user_id',
    otherKey: 'compliance_id'
});

Compliance.belongsToMany(User, {
    through: 'UserCompliance',
    foreignKey: 'compliance_id',
    otherKey: 'user_id'
});

module.exports = Compliance;
