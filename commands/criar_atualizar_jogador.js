const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar_atualizar_jogador')
		.setDescription('Atualiza um jogador')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser adicionado')
            .setRequired(true))       
        .addIntegerOption(option => option
            .setName('hp')
            .setDescription('Insira o HP do jogador')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('ca')
            .setDescription('Insira o CA do jogador')
            .setRequired(true)),
        

	async execute(interaction) {
        const jogador = await Jogadores.findOne({where: {id: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await Jogadores.create({id: interaction.options.getUser('jogador').id, nome: interaction.options.getUser('jogador').username, hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca')});
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} criado!`);
            return;
        }
        await Jogadores.destroy({where: {id: interaction.options.getUser('jogador').id}});
        await Jogadores.create({id: interaction.options.getUser('jogador').id, nome: interaction.options.getUser('jogador').username, hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca')});
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} atualizado!`);
	},
};