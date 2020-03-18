const sequelize = require("sequelize");
const db = require("../config/database");

const Expense = db.define(
  "expense",
  {
    mem_count: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    you_paid: {
      type: sequelize.FLOAT,
      allowNull: false
    },
    you_lent: {
      type: sequelize.FLOAT,
      allowNull: false
    },
    on_month: {
      type: sequelize.STRING,
      allowNull: false
    },
    on_date: {
      type: sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

Expense.associate = models => {
  Expense.hasMany(models.Friends, {
    foreignKey: "expense_id"
  });
};

module.exports = Expense;
