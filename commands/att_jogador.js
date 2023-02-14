const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('att_jogador')
		.setDescription('Atualiza um jogador')
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser adicionado'))
        .addIntegerOption(option => option
            .setName('hp')
            .setDescription('Insira o HP do jogador'))
        .addIntegerOption(option => option
            .setName('ca')
            .setDescription('Insira o CA do jogador')),
        

	async execute(interaction) {
        const jogador = await Jogadores.findOne({where: {id: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await Jogadores.create({id: interaction.options.getUser('jogador').id, nome: interaction.options.getUser('jogador').username, hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca')});
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} criado!`);
            return;
        }
        jogador.set({
            nome: interaction.options.getUser('jogador').username,
            hp: interaction.options.getInteger('hp'),
            ca: interaction.options.getInteger('ca')
        });
        await jogador.save();
		await interaction.reply(`Adicionando ${interaction.options.getUser('jogador').username} a batalha!`);
	},
};