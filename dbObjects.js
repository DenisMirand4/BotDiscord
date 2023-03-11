const Sequelize = require('sequelize');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

/*
 * Make sure you are on at least version 5 of Sequelize! Version 4 as used in this guide will pose a security threat.
 * You can read more about this issue on the [Sequelize issue tracker](https://github.com/sequelize/sequelize/issues/7310).
 */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	dialectOptions: {
		ssl: {
			ca: fs.readFileSync(path.join(__dirname, 'cacert.pem'))
		}
	}
});

const Jogadores = require('./models/tb_jogadores')(sequelize, Sequelize.DataTypes);
const Batalha = require('./models/tb_batalha')(sequelize, Sequelize.DataTypes);
const Monstros = require('./models/tb_monstros')(sequelize, Sequelize.DataTypes);

module.exports = { Jogadores, Batalha, Monstros, sequelize};