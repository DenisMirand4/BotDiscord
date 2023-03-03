const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cura')
		.setDescription('Cura um jogador')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser curado')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('hp')
            .setDescription('Insira o HP a ser curado')
            .setRequired(true)),
        
        

	async execute(interaction) {
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
        // await Batalha.create({id_batalha: batalha.id_batalha, nome_batalha: batalha.nome_batalha, nome_mestre: batalha.nome_mestre, id_player: random, nome: interaction.options.getString('monstro'), hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca'), iniciativa: interaction.options.getInteger('iniciativa')});
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} curado!`);
	},
};