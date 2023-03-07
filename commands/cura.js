const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cura')
		.setDescription('Cura um alvo')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser curado')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('hp')
            .setDescription('Insira o HP a ser curado')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('id')
            .setDescription('Insira o ID do monstro')),
        
        

	async execute(interaction) {
        if (interaction.options.getInteger('id') != null) {
            const monstro = await Monstros.findOne({where: {id: interaction.options.getInteger('id')}});
            if (!monstro) {
                await interaction.reply(`Monstro não existe!`);
                return; 
            }
            if (monstro.hp <= 0){
                await interaction.reply(`Monstro ${interaction.options.getInteger('id')} já está morto!`);
                return;
            }
            else {
                monstro.hp += interaction.options.getInteger('hp');
                await monstro.save();
                await interaction.reply(`Monstro ${monstro.nome} curado!`);
                return;
            }
        }
        const jogador = await Batalha.findOne({where: {id_player: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} não existe!`);
            return;
        }
        if (jogador.hp_base <= jogador.hp + interaction.options.getInteger('hp')) {
            jogador.hp = jogador.hp_base;
        }
        else {
            jogador.hp += interaction.options.getInteger('hp');
        }
        await jogador.save();
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} curado!`);
	},
};