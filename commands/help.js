const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lista todos os comandos disponíveis'),

	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Comandos disponíveis')
            .setDescription('Lista de comandos disponíveis')
            .addFields({name: '/add_jogador', value: 'Adiciona um jogador a batalha'})
            .addFields({name: '/add_monstro', value: 'Adiciona um monstro a batalha'})
            .addFields({name: '/att_jogador', value: 'Atualiza ou cria um jogador'})
            .addFields({name: '/att_monstro', value: 'Atualiza ou cria um monstro'})
            .addFields({name: '/del_jogador', value: 'Remove um jogador da batalha'})
            .addFields({name: '/cria_batalha', value: 'Cria uma batalha'})
            .addFields({name: '/comeca_batalha', value: 'Começa uma batalha'})
            .addFields({name: '/encerra_batalha', value: 'Encerra uma batalha'})
            .addFields({name: '/prox_turno', value: 'Avança para o próximo turno'})
            .addFields({name: '/dano', value: 'Aplica dano a um jogador ou monstro'})
            .addFields({name: '/cura', value: 'Aplica cura a um jogador ou monstro'})
            .addFields({name: '/lista_jogadores', value: 'Lista os jogadores da batalha'})
            .addFields({name: '/lista_monstros', value: 'Lista os monstros da batalha'})            

        await interaction.reply({embeds: [embed]});




        
	},
};