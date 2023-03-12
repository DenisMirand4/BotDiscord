const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dano')
		.setDescription('Causa dano a um alvo')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser ferido')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('dano')
            .setDescription('Insira o dano a ser causado')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('id')
            .setDescription('Insira o id do monstro')),
        
        

	async execute(interaction) {
        if(interaction.options.getInteger('id') != null) {
            const monstro = await Batalha.findOne({where: {id_player: interaction.options.getInteger('id')}});
            if (!monstro) {
                await interaction.reply(`Monstro não existe!`);
                return;
            }
            monstro.hp = monstro.hp - interaction.options.getInteger('dano');
            await monstro.save();
            await interaction.reply(`Monstro ${monstro.nome} atingido em ${interaction.options.getInteger('dano')} HP!`);
            return;
        }

        const jogador = await Batalha.findOne({where: {id_player: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} não existe!`);
            return;
        }
        sleep(250);
        await Batalha.update({hp: jogador.hp - interaction.options.getInteger('dano')},{
            where: {
                id_player: interaction.options.getUser('jogador').id
            }
        });
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} atingido em ${interaction.options.getInteger('dano')} HP!`);
	},
};