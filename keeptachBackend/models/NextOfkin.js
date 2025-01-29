import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const NextOfKin = sequelize.define('NextOfKin', {
  kinId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default NextOfKin;