"use strict";/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define : {
    timestamps: true, // Adds createdAt and updatedAt fields
    underscored: true, // Uses snake_case for table and column names
    freezeTableName: true, // Prevents Sequelize from pluralizing table names
    createAt : 'created_at', // Custom name for createdAt field
    updatedAt : 'updated_at', // Custom name for updatedAt field
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
