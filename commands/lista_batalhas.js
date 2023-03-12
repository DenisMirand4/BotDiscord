const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lista_batalhas')
		.setDescription('Lista as batalhas'),
        

	async execute(interaction) {
        const batalhas = await Batalha.findAll();
        let lista = '';
        let aspas = "```";
        let idJaListado = [];
        for (const batalha of batalhas) {
            if (idJaListado.includes(batalha.id_batalha)) {
                continue;
            }
            idJaListado.push(batalha.id_batalha);
            lista += `Nome: ${batalha.nome_batalha} - Mestre: ${batalha.nome_mestre}\n`;
        }
        await interaction.reply(`Batalhas:\n${aspas+lista+aspas}`);
      
    }
};