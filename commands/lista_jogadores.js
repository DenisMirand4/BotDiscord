const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lista_jogadores')
		.setDescription('Lista os jogadores'),
        

	async execute(interaction) {
        const jogadores = await Jogadores.findAll();
        let lista = '';
        for (const jogador of jogadores) {
            lista += `${jogador.nome} - HP: ${jogador.hp} - CA: ${jogador.ca}\n`;
        }
        await interaction.reply(`Jogadores:\n${lista}`);
    }
};