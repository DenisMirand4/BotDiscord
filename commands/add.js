const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, sequelize} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
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
            await interaction.reply(`Use /comeca_batalha para criar uma nova batalha!`);
            return;
        }
        let [user, created] = await Batalha.findOrCreate({
            where: {id_player: jogador.id},
            defaults: {
                id_batalha: batalha.id_batalha,
                nome_batalha: batalha.nome_batalha,
                nome_mestre: batalha.nome_mestre,
                id_player: jogador.id,
                nome: jogador.nome,
                hp: jogador.hp,
                ca: jogador.ca,
                iniciativa: interaction.options.getInteger('iniciativa')
            }
        });
        if(!created){
            await user.update({
                id_batalha: batalha.id_batalha,
                nome_batalha: batalha.nome_batalha,
                nome_mestre: batalha.nome_mestre,
                nome: jogador.nome,
                hp: jogador.hp,
                ca: jogador.ca,
                iniciativa: interaction.options.getInteger('iniciativa')
            });
        }
        
        const teste = await Batalha.findAll({group: 'id_batalha'});
        console.log(teste);
        await interaction.reply(`Adicionando ${interaction.options.getUser('jogador').username} a batalha!`);

	},
};