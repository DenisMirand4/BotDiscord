const Sequelize = require('sequelize');

/*
 * Make sure you are on at least version 5 of Sequelize! Version 4 as used in this guide will pose a security threat.
 * You can read more about this issue on the [Sequelize issue tracker](https://github.com/sequelize/sequelize/issues/7310).
 */

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Jogadores = require('./models/tb_jogadores')(sequelize, Sequelize.DataTypes);
const Batalha = require('./models/tb_batalha')(sequelize, Sequelize.DataTypes);
const Monstros = require('./models/tb_monstros')(sequelize, Sequelize.DataTypes);

module.exports = { Jogadores, Batalha, Monstros, sequelize};