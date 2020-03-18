const sequelize = require("sequelize");
const db = require("../config/database");

const Users = db.define("users", {
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: sequelize.BIGINT,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
});

Users.associate = models => {
  Users.hasMany(models.Groups, {
    foreignKey: "user_id"
  });
};

module.exports = Users;
