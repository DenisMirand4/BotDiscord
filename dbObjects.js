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

// Reflect.defineProperty(Jogadores.prototype, 'addJogador', {
//     value: async function addJogador(jogador) {
//         return Jogadores.create({id: Jogadores.id, nome: jogador.nome, hp: jogador.hp, ca: jogador.ca});
//     },
// });

module.exports = { Jogadores, Batalha, sequelize};