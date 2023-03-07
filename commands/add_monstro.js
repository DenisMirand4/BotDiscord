const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_monstro')
		.setDescription('Insere um monstro')
        .addIntegerOption(option => option
            .setName('monstro')
            .setDescription('ID do monstro a ser adicionado')
            .setRequired(true))
        .addStringOption(option => option
            .setName('nomeb')
            .setDescription('Insira o nome da batalha')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('iniciativa')
            .setDescription('Insira a iniciativa do monstro')
            .setRequired(true)),
        

	async execute(interaction) {
        const monstro = await Monstros.findOne({where: {id: interaction.options.getUser('monstro')}});
        if (!monstro) {
            await interaction.reply(`Monstro não encontrado!`);
            return;
        }
        const batalha = await Batalha.findOne({where: {nome_batalha: interaction.options.getString('nomeb').toLowerCase().trim()}});
        if (!batalha) {
            await interaction.reply(`Batalha ${interaction.options.getString('nomeb')} não existe!`);
            return;
        }
        const user = await Jogadores.findOne({where: {user_id: interaction.user.id}});
        if (user) {
            await interaction.reply(`Monstro já está em uma batalha!`);
            return;
        } else {
            await Batalha.create({
                id_batalha: batalha.id_batalha,
                nome_batalha: batalha.nome_batalha,
                nome_mestre: batalha.nome_mestre,
                id_player: monstro.id,
                nome: monstro.nome,
                hp: monstro.hp,
                hp_base: monstro.hp,
                ca: monstro.ca,
                iniciativa: interaction.options.getInteger('iniciativa')
            });
		    await interaction.reply(`Monstro ${interaction.options.getString('monstro')} adicionado a batalha!`);
            return;
        }
	},
};