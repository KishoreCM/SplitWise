"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    //User hasMany Groups
    return (
      queryInterface
        .addColumn("groups", "user_id", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        })
        //Groups hasMany Friends
        .then(() => {
          return queryInterface.addColumn("friends", "groups_id", {
            type: Sequelize.INTEGER,
            references: {
              model: "groups",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          });
        })
        //Groups hasMany Expenses
        .then(() => {
          return queryInterface.addColumn("expense", "groups_id", {
            type: Sequelize.INTEGER,
            references: {
              model: "groups",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          });
        })
        //Friends belongsTo Expenses
        .then(() => {
          return queryInterface.addColumn("friends", "expense_id", {
            type: Sequelize.INTEGER,
            references: {
              model: "expense",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          });
        })
    );
  },

  down: (queryInterface, Sequelize) => {
    //remove User hasMany Groups
    return (
      queryInterface
        .removeColumn("groups", "user_id")
        //remove Groups hasMany Friends
        .then(() => {
          return queryInterface.removeColumn("friends", "groups_id");
        })
        //remove Groups hasMany Expenses
        .then(() => {
          return queryInterface.removeColumn("expense", "groups_id");
        })
        //remove Friends belongsTo Expenses
        .then(() => {
          return queryInterface.removeColumn("friends", "expense_id");
        })
    );
  }
};
