const { SlashCommandBuilder } = require('discord.js');
const {Op} = require('sequelize');
const {Jogadores, sequelize, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comecar_batalha')
		.setDescription('Inicia a nova batalha!')
        .addStringOption(option => option
            .setName('nomedabatalha')
            .setDescription('Insira o nome da batalha')),

	async execute(interaction) {
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomedabatalha').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha: ${interaction.options.getString('nomedabatalha')} não encontrada!`);
            return;
        }
        const batalhaJogadores = await Batalha.findAll({
            where: {
                [Op.and]:[
                    {nome_batalha: interaction.options.getString('nomedabatalha').toLowerCase().trim()},
                    {nome: {[Op.ne]: null}}
                ]
            },
            order: [['iniciativa', 'DESC']]
        });
        let i = 0;
        aspas = "```";
        let respaux = new Array(batalhaJogadores.length);
		await interaction.reply(`Batalha ${interaction.options.getString('nomedabatalha')} iniciada!`);
        await batalhaJogadores.forEach(element => {
		    respaux[i] = (`${i}-jogador ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`);     
            i++;       
        });
        i=0;
        var resp = aspas;
        while(i < batalhaJogadores.length){
            resp += respaux[i];
            i++;
        }
        resp += aspas;
        await interaction.followUp(resp);

	},
};