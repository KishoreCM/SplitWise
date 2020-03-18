const sequelize = require("sequelize");
const db = require("../config/database");

const Friends = db.define("friends", {
  from_expense: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  tot_owes: {
    type: sequelize.FLOAT,
    allowNull: false
  }
});

Friends.associate = models => {
  Friends.belongsTo(models.Expense, {
    foreignKey: "expense_id"
  });
};

module.exports = Friends;
