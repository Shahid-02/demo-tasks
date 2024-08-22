const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig/dbConfig.js'); 
const User = require('./user.models.js');

const UserProfile = sequelize.define('UserProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    }
},{
    tableName: 'userProfiles',
    timestamps: true
});

User.hasOne(UserProfile, {
    foreignKey: 'user_id',
    as: 'userProfile'
});

module.exports = UserProfile;
