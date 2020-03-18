"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "expense",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        mem_count: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        you_paid: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        you_lent: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        on_month: {
          type: Sequelize.STRING,
          allowNull: false
        },
        on_date: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        freezeTableName: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("expense");
  }
};
