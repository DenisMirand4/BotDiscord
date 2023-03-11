const { SlashCommandBuilder } = require('discord.js');
const {Op, and} = require('sequelize');
const {Jogadores, sequelize, Batalha} = require('../dbObjects');

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prox_turno')
		.setDescription('Encerra o turno atual e inicia o próximo!')
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
        let aspas = "```";
        let respaux = new Array();
        let respaux2 = new Array();
        await batalhaMestre.forEach(async element => {
            if((element.hp >= (-element.hp_base*0.5)) && element.tipo == 1){
                respaux[i] = `${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`;
                i++;
            }
            if((element.hp > 0) && element.tipo == 2){
                respaux[i] = `${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ?????  CA: ????? \n`;
                i++;
            }
        });

        i=0;
        await batalhaMestre.forEach(async element => {
            if((element.hp >= (-element.hp_base*0.5 && element.tipo == 1)) || (element.hp > 0 && element.tipo == 2)){
                respaux2[i] = `${i+1} - ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`;
                i++;
            }
        });
        await sleep(500);
        i=0;
        var resp = aspas;
        resp+=`Turno encerrado! \n`;
        while(i < respaux.length){
            resp += respaux[i];
            i++;
        }
        resp += aspas;
        await interaction.reply(resp);

        i=0;
        var resp2 = aspas;
        resp2+=`Turno encerrado! \n`;
        while(i < respaux2.length){
            resp2 += respaux2[i];
            i++;
        }
        resp2 += aspas;
        await interaction.followUp({content: resp2 , ephemeral: true });
	},
};