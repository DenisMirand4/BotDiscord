const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

try{
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

const Jogadores = require('./models/tb_jogadores')(sequelize, Sequelize.DataTypes);
const Batalha = require('./models/tb_batalha')(sequelize, Sequelize.DataTypes);
const Monstros = require('./models/tb_monstros')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force });