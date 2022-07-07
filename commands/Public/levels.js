const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Levels = require("discord-xp");
const  Discordvv  = require('../../schemas/db-setup.js');

class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'lvl', 'xp','rank'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'level and xp gained from invites, activity, etc..'
            }
        });
    }

    async exec(message){
    const user = await Discordvv.fetch(message.author.id, message.guild.id);
     var usr = message.mentions.users.first() || message.author;
   // let invites = await guild.fetchInvites()

     const requiredXp = await Discordvv.xpFor(parseInt(user.level) + 1)
      const rankcard = new Canvacord.Rank()
        .setAvatar(usr.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(user.xp || 0)
        .setRequiredXP(requiredXp)
        .setStatus(usr.presence.status)
        .setLevel(user.level || 0)
       
        .setRank(user.invites, 'Invites', true)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(usr.username)
        .setDiscriminator(usr.discriminator)
       // .setBackground("COLOR", "#808080")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }
}

module.exports = LevelCommand;

