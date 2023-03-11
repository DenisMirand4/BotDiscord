const { SlashCommandBuilder } = require('discord.js');
const {Op} = require('sequelize');
const {Jogadores, sequelize, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comecar_batalha')
		.setDescription('Inicia a nova batalha!')
        .addStringOption(option => option
            .setName('nomedabatalha')
            .setDescription('Insira o nome da batalha')
            .setRequired(true)),

	async execute(interaction) {
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomedabatalha').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha: ${interaction.options.getString('nomedabatalha')} não encontrada!`);
            return;
        }
        const batalhaMestre = await Batalha.findAll({
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
        let respaux = new Array();
        let respaux2 = new Array();
        await batalhaMestre.forEach(async element => {
            if((element.hp >= (-element.hp_base*0.5)) && element.tipo == 1){
                respaux[i] = `${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`;
                i++;
            }
            if((element.hp > 0) && element.tipo == 2){
                respaux[i] = `${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ????? CA: ????? \n`;
                i++;
            }
        });
		
        i=0;
        var resp = aspas;
        while(i < batalhaMestre.length){
            resp += respaux[i];
            i++;
        }
        resp += aspas;
        await interaction.reply(resp);
        i=0;
        await batalhaMestre.forEach(element => {
            respaux2[i] = (`${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`);
            i++;
        });
        i=0;
        resp = aspas;
        while(i < batalhaMestre.length){
            resp += respaux2[i];
            i++;
        }
        resp += aspas;
        await interaction.followUp({content: resp, ephemeral: true});
	},
};