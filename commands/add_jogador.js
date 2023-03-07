const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, sequelize} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_jogador')
		.setDescription('Adiciona jogador a uma batalha')
        .addStringOption(option => option
            .setName('nomeb')
            .setDescription('Insira o nome da batalha'))
        .addUserOption(option => option
            .setName('jogador')
            .setDescription('Jogador a ser adicionado'))
        .addIntegerOption(option => option
            .setName('iniciativa')
            .setDescription('Iniciativa do jogador')),

	async execute(interaction) {
        const jogador = await Jogadores.findOne({where: {id: interaction.options.getUser('jogador').id}});
        if (!jogador) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} não encontrado!`);
            return;
        }
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomeb').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha: ${interaction.options.getString('nomeb')} não encontrada!`);
            await interaction.followUp(`Use /comeca_batalha para criar uma nova batalha!`);
            return;
        }
        const user = await Batalha.findOne({where: {id_player: interaction.options.getUser('jogador').id}});
        if (user) {
            await interaction.reply(`Jogador ${interaction.options.getUser('jogador').username} já esta na batalha ${user.nome_batalha} !`);
            await interaction.followUp(`Use /encerra_batalha para encerrar a batalha que o jogador esta`);
            return;
        } else {
            await Batalha.create({
                id_batalha: batalha.id_batalha,
                nome_batalha: batalha.nome_batalha,
                nome_mestre: batalha.nome_mestre,
                id_player: jogador.id,
                nome: jogador.nome,
                hp: jogador.hp,
                hp_base: jogador.hp,
                ca: jogador.ca,
                iniciativa: interaction.options.getInteger('iniciativa'),
                tipo: 1
            });
            await interaction.reply(`Adicionando ${interaction.options.getUser('jogador').username} a batalha!`);
            return;
        }
	},
};