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
            .setName('id')
            .setDescription('Insira o ID do monstro'))
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
        if(interaction.options.getInteger('id') != null){
            const monstro = await Monstros.findOne({where: {id: interaction.options.getInteger('id')}});
            if (!monstro) {
                await interaction.reply(`Monstro com ID ${interaction.options.getInteger('id')} não encontrado!`);
                return;
            }
            await Monstros.destroy({where: {id: interaction.options.getInteger('id')}});
            await Monstros.create({
                id: monstro.id, 
                nome: interaction.options.getString('monstro') == null ? monstro.nome:interaction.options.getString('monstro'), 
                hp: interaction.options.getInteger('hp') == null ? monstro.hp:interaction.options.getInteger('hp'), 
                ca: interaction.options.getInteger('ca') == null ? monstro.ca:interaction.options.getInteger('ca'), 
                des: interaction.options.getInteger('des') == null ? monstro.des:interaction.options.getInteger('des'), 
                for: interaction.options.getInteger('for') == null ? monstro.for:interaction.options.getInteger('for'), 
                con: interaction.options.getInteger('con') == null ? monstro.con:interaction.options.getInteger('con'), 
                int: interaction.options.getInteger('int') == null ? monstro.int:interaction.options.getInteger('int'), 
                sab: interaction.options.getInteger('sab') == null ? monstro.sab:interaction.options.getInteger('sab'), 
                car: interaction.options.getInteger('car') == null ? monstro.car:interaction.options.getInteger('car'), 
                obs: interaction.options.getString('obs') == null ? monstro.obs:interaction.options.getString('obs')
            }); 
            await interaction.reply(`Monstro: ID:${monstro.id} - ${interaction.options.getString('monstro')} atualizado!`);
            return;
        }
        await Monstros.create({
            nome: interaction.options.getString('monstro'), 
            hp: interaction.options.getInteger('hp'), 
            ca: interaction.options.getInteger('ca'), 
            des: interaction.options.getInteger('des'), 
            for: interaction.options.getInteger('for'), 
            con: interaction.options.getInteger('con'), 
            int: interaction.options.getInteger('int'), 
            sab: interaction.options.getInteger('sab'), 
            car: interaction.options.getInteger('car'), 
            obs: interaction.options.getString('obs')
        });
        const result = await Monstros.findOne({
            order: [
                ['id', 'DESC']
            ]
        });
        interaction.reply(`Monstro: ID: ${result.id} - ${interaction.options.getString('monstro')} criado!`);
        
	},
};