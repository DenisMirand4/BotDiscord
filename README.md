
# Discord RPG Bot

This is a Discord bot created for a role-playing game (RPG) community. The bot is built using Node.js and Discord.js library, and uses Sequelize ORM to interact with a SQLite database.

## Features

The bot has the following features:

- **Character creation:** Players can create a character by providing a name, HP(Hit Points), and CA(Armor class).
- **Monster creation:** Users can create a monster by providing a name, HP, CA and other optional infos.
- **Combat:** Players can engage in combat with monsters.
- **Shifts:** Master can handle the shifts easily with the bot providing infos every round.

## Installation

1. Clone the repository to your local machine.

2. Install Node.js and npm (the Node Package Manager).

3. Install the dependencies using the following command:
```
npm install
```
4. Set up your Discord bot and obtain your bot token.

5. Set up your database by running the following command:

```
npm install discord.js sequelize mysql
```
6. Edit the .env file and replace TOKEN with your bot token.

7. Run the bot using the following command:
```
node index.js
```

## Usage

The bot has several commands that can be used to interact with its various features. Some examples are:

/att_jogador - creates a new character
/comeca_batalha - starts a combat encounter
/dano - deals damage to a player or monster
For a full list of commands, type /help in a Discord channel where the bot is present.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

#### For more informations visit https://discordjs.guide



