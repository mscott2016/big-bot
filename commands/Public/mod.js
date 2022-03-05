const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Levels = require("discord-xp");
const  Discordvv  = require('../../schemas/db-setup.js');

class ModCommand extends Command {
    constructor() {
        super('mod', {
            aliases: ['mod', 'md', 'mod-app'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'application to become a mod'
            }
        });
    }

    async exec(message){
        let user = await Discordvv.fetch(message.author.id, message.guild.id);
        if (user.level >= 1 && user.invites >= 1){
            message.author.send("https://forms.gle/CheGJXNDEuYxtuy38");
        }
        else {
            message.channel.send(`${message.author}  you need to be LVL 1 with at least 1 invite`)
        }
       
    }
}

module.exports = ModCommand;
