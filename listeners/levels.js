const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Levels = require("discord-xp");
const  Discordvv  = require('../schemas/db-setup.js');


module.exports = class LevelListener extends Listener {
    constructor() {
        super('level', {
            emitter: 'client',
            event: 'message',
        });
    }

   async exec(message) {
     if (!message.guild) return;
     if (message.author.bot) return;

     const randomAmountOfXp = Math.floor(Math.random() * 1) + 1; // Min 1, Max 30
     const hasLeveledUp = await Discordvv.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
     if (hasLeveledUp) {

       const user = await Discordvv.fetch(message.author.id, message.guild.id);
       //console.log(`${message.member} -- ${user.level} `)
       message.channel.send(`Congrats ${message.member}, you leveled up, you are now level ${user.level}`);


     }
     else {
       const user = await Discordvv.fetch(message.author.id, message.guild.id);
       const requiredXp = await Discordvv.xpFor(parseInt(user.level) + 1)
       // message.channel.send(`Congrats ${message.member}, ytou leveled up, you are now level ${requiredXp} --${user.xp} `)
     }
    }
  
};

