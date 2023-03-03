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
        const log = Batalha.findAll({where: {nome_batalha: interaction.options.getString('nomedabatalhafim').toLowerCase().trim()}})
        .then(log => {
            log.forEach(log => {
                interaction.channel.send(`Batalha: ${log.nome_batalha} - ${log.data_batalha} - ${log.vencedor_batalha} - ${log.perdedor_batalha} - ${log.dano_batalha} - ${log.vida_batalha}`);
            })});

        Batalha.destroy({
            where:{nome_batalha: interaction.options.getString('nomedabatalhafim').toLowerCase().trim()}
        });
		await interaction.reply(`Batalha ${interaction.options.getString('nomedabatalhafim')} encerrada!`);
	},
};