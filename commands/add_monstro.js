const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_monstro')
		.setDescription('Insere um monstro')
        .addStringOption(option => option
            .setName('monstro')
            .setDescription('Monstro a ser adicionado')
            .setRequired(true))
        .addStringOption(option => option
            .setName('nomeb')
            .setDescription('Insira o nome da batalha')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('hp')
            .setDescription('Insira o HP do monstro')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('ca')
            .setDescription('Insira o CA do monstro')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('iniciativa')
            .setDescription('Insira a iniciativa do monstro')
            .setRequired(true)),
        

	async execute(interaction) {
        let random = Math.floor(Math.random() * 1000);
        let existe = await Batalha.findOne({where: {id_player: random}});
        while (existe) {
            random = Math.floor(Math.random() * 1000);
            existe = await Batalha.findOne({where: {id_player: random}});
        }
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomeb').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha ${interaction.options.getString('nomeb')} não existe!`);
            return;
        }
        await Batalha.create({id_batalha: batalha.id_batalha, nome_batalha: batalha.nome_batalha, nome_mestre: batalha.nome_mestre, id_player: random, nome: interaction.options.getString('monstro'), hp: interaction.options.getInteger('hp'),hp_base: 0, ca: interaction.options.getInteger('ca'), iniciativa: interaction.options.getInteger('iniciativa')});
		await interaction.reply(`Monstro ${interaction.options.getString('monstro')} adicionado a batalha!`);
	},
};