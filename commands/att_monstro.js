const { SlashCommandBuilder } = require('discord.js');
const {Jogadores, Batalha, Monstros} = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('att_monstro')
		.setDescription('Atualiza um monstro')
        .addStringOption(option => option
            .setName('monstro')
            .setDescription('monstro a ser adicionado')
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
            .setName('des')
            .setDescription('Insira a destreza do monstro'))
        .addIntegerOption(option => option
            .setName('for')
            .setDescription('Insira a força do monstro'))
        .addIntegerOption(option => option
            .setName('con')
            .setDescription('Insira a constituição do monstro'))
        .addIntegerOption(option => option
            .setName('int')
            .setDescription('Insira a inteligência do monstro'))
        .addIntegerOption(option => option
            .setName('sab')
            .setDescription('Insira a sabedoria do monstro'))
        .addIntegerOption(option => option
            .setName('car')
            .setDescription('Insira a carisma do monstro'))
        .addStringOption(option => option
            .setName('obs')
            .setDescription('Insira uma observação sobre o monstro')),

        

	async execute(interaction) {
        const monstro = await Monstros.findOne({where: {nome: interaction.options.getString('monstro').toLowerCase().trim()}});
        if (!monstro) {
            await Monstros.create({nome: interaction.options.getString('monstro'), hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca'), des: interaction.options.getInteger('des'), for: interaction.options.getInteger('for'), con: interaction.options.getInteger('con'), int: interaction.options.getInteger('int'), sab: interaction.options.getInteger('sab'), car: interaction.options.getInteger('car'), obs: interaction.options.getString('obs')});
            await interaction.reply(`Monstro ${interaction.options.getString('monstro')} criado!`);
            return;
        }
        monstro_id = monstro.id;
        await Monstros.destroy({where: {nome: interaction.options.getString('monstro').toLowerCase().trim()}});
        await Monstros.create({id: monstro_id, nome: interaction.options.getString('monstro'), hp: interaction.options.getInteger('hp'), ca: interaction.options.getInteger('ca'), des: interaction.options.getInteger('des'), for: interaction.options.getInteger('for'), con: interaction.options.getInteger('con'), int: interaction.options.getInteger('int'), sab: interaction.options.getInteger('sab'), car: interaction.options.getInteger('car'), obs: interaction.options.getString('obs')});
		await interaction.reply(`Monstro ${interaction.options.getString('monstro')} atualizado!`);
	},
};