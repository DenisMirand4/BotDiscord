const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lista_monstros')
		.setDescription('Lista os monstros'),
        

	async execute(interaction) {
        const monstros = await Monstros.findAll();
        let lista = '';
        for (const monstro of monstros) {
            lista += `ID: ${monstro.id} - NOME: ${monstro.nome} - HP: ${monstro.hp} - CA: ${monstro.ca}\n`;
        }
        await interaction.reply(`Monstros:\n${lista}`);
    }
};