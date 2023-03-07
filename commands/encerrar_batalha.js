const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, sequelize} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('encerrar_batalha')
		.setDescription('Encerra uma batalha!')
        .addStringOption(option => option
            .setName('nomedabatalhafim')
            .setDescription('Insira o nome da batalha que deseja encerrar')),

	async execute(interaction) {
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomedabatalhafim').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha: ${interaction.options.getString('nomedabatalhafim')} não encontrada!`);
            return;
        }
        Batalha.destroy({
            where:{nome_batalha: interaction.options.getString('nomedabatalhafim').toLowerCase().trim()}
        });
		await interaction.reply(`Batalha ${interaction.options.getString('nomedabatalhafim')} encerrada!`);
	},
};