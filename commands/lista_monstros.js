const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lista_monstros')
		.setDescription('Lista os monstros'),
        

	async execute(interaction) {
        const monstros = await Monstros.findAll();
        let aspas = "```";
        let lista = new Array();
        for (const monstro of monstros) {
            lista += `ID: ${monstro.id} - NOME: ${monstro.nome} - HP: ${monstro.hp} - CA: ${monstro.ca} - DES: ${monstro.des==null?0:monstro.des} - FOR: ${monstro.frc==null?0:monstro.frc} - INT: ${monstro.ntl==null?0:monstro.ntl} - SAB: ${monstro.sab==null?0:monstro.sab} - CAR: ${monstro.car==null?0:monstro.car} - CON: ${monstro.con==null?0:monstro.con} - OBS: ${monstro.obs==null?'':monstro.obs}\n`;
        }
        await interaction.reply(`Monstros:\n${aspas + lista + aspas}`);
    }
};