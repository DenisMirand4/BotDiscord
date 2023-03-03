const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('del_jogador')
		.setDescription('Deleta um jogador')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser adicionado')
            .setRequired(true)),

	async execute(interaction) {
        const jogador = await Jogadores.findOne({where: {id: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} não encontrado!`);
            return;
        }
        await Jogadores.destroy({where: {id: interaction.options.getUser('jogador').id}});
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} deletado!`);
	},
};