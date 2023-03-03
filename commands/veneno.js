const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('veneno')
		.setDescription('Causa dano a um jogador')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser ferido')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('dano')
            .setDescription('Insira o dano a ser causado')
            .setRequired(true)),
        
        

	async execute(interaction) {
        const jogador = await Batalha.findOne({where: {id_player: interaction.options.getUser('jogador').id}});
        const jogadorDb = await Jogadores.findOne({where: {id_player: interaction.options.getUser('jogador').id}});
        if (!jogador || !jogadorDb) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} não existe!`);
            return;
        }
        jogador.hp = jogador.hp - interaction.options.getInteger('dano');        
        await jogador.save();
        // await Batalha.create({id_batalha: batalha.id_batalha, nome_batalha: batalha.nome_batalha, nome_mestre: batalha.nome_mestre, id_player: random, nome: interaction.options.getString('monstro'), hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca'), iniciativa: interaction.options.getInteger('iniciativa')});
		await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} atingido!`);
	},
};