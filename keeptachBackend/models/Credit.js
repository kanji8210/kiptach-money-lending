import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Credit = sequelize.define('Credit', {
  creditId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  applicationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  approvalDate: {
    type: DataTypes.DATE,
  },
  disbursementDate: {
    type: DataTypes.DATE,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  repaymentDate: {
    type: DataTypes.DATE,
  },
  principal: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  interestRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  penaltyRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
  },
  processingFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'disbursed', 'repaid'),
    defaultValue: 'pending',
  },
});

export default Credit;