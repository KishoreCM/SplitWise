const sequelize = require("sequelize");
const db = require("../config/database");

const Groups = db.define("groups", {
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  mem_count: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  created_by: {
    type: sequelize.STRING,
    allowNull: false
  },
  tot_owed: {
    type: sequelize.FLOAT,
    allowNull: false
  }
});

Groups.associate = models => {
  Groups.hasMany(models.Friends, {
    foreignKey: "groups_id"
  });
  Groups.hasMany(models.Expense, {
    foreignKey: "groups_id"
  });
};

module.exports = Groups;
