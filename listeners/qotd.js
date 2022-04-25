const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const  Discordvv  = require('../schemas/db-setup.js');

module.exports = class QotdListener extends Listener {
    constructor() {
        super('qotd', {
            emitter: 'client',
            event: 'message',
        });
    }

   async exec(message) {
    console.log(message.channelId); 

    if(!('951655353035157504' === message.channelId)) return;
   
    if (message.author.bot) {
         console.log(message.content);

     }

     
    }
  
};

