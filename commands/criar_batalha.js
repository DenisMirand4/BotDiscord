const { SlashCommandBuilder } = require('discord.js');
const gerador = require('uuid');
const {Jogadores, sequelize, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar_batalha')
		.setDescription('Começa uma nova batalha!')
        .addUserOption(option => option
            .setName('mestre')
            .setDescription('Quem será o mestre da batalha?')
            .setRequired(true))
        .addStringOption(option => option
            .setName('nomedabatalha')
            .setDescription('Insira o nome da batalha')
            .setRequired(true)),

	async execute(interaction) {
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomedabatalha').toLowerCase().trim()}});
        if (batalha) {
            await interaction.reply(`Batalha: ${interaction.options.getString('nomedabatalha')} já existe!`);
            return;
        }
        let guid = gerador.v4();
        let random = Math.floor(Math.random() * 100);
        console.log(guid);
        await Batalha.create({id_batalha: guid, nome_batalha: interaction.options.getString('nomedabatalha').toLowerCase().trim(), nome_mestre: interaction.options.getUser('mestre').username, id_player: random, nome: null, hp: 0, ca: 0, iniciativa: 0});
		await interaction.reply(`Batalha ${interaction.options.getString('nomedabatalha')} criada!`);
        
	},
};