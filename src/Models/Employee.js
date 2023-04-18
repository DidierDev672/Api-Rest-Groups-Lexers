const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Employee = sequelize.define(
  "employees",
  {
    code: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
    nif: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    last_name1: { type: DataTypes.STRING, allowNull: false },
    last_name2: { type: DataTypes.STRING, allowNull: false },
    code_section: { type: DataTypes.NUMBER, allowNull: false },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Employee;
