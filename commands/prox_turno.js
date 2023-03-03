const { SlashCommandBuilder } = require('discord.js');
const {Op} = require('sequelize');
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
        let respaux = new Array();
        let jogAux = new Array(10);

        // for (let index = 0; index < batalhaJogadores.length; index++) {
        //     jogAux[index] = await Jogadores.findOne({where: {nome: batalhaJogadores[index].nome}});
        //     console.log(index);
        //     console.log(jogAux[index]);
        // }
        await batalhaJogadores.forEach(async element => {
            // const aux = await Jogadores.findOne({where: {nome: element.nome}});
            if(element.hp >= (-element.hp_base*0.5)){
		        respaux[i] = `${i}-jogador ${element.nome} iniciativa: ${element.iniciativa} HP: ${element.hp} CA: ${element.ca} \n`;     
                console.log(respaux[i]);
                i++;       
            }
        });
        await sleep(2000);   
        i=0;
        var resp = aspas;
        resp+=`Turno encerrado! \n`;
        while(i < respaux.length){
            resp += respaux[i];
            i++;
        }
        resp += aspas;
        await interaction.reply(resp);

	},
};