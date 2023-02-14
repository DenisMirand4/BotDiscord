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
            await interaction.reply(`Batalha: ${interaction.options.getInteger('nomedabatalhafim')} não encontrada!`);
            return;
        }
        let dbBatalha = `batalha_${interaction.options.getString('nomedabatalhafim').toLowerCase().trim()}`;
        console.log(dbBatalha);
        console.log(sequelize.models[dbBatalha]);
        // batalha.drop();
		await interaction.reply(`Batalha ${interaction.options.getUser('nomedabatalhafim').username} encerrada!`);
	},
};