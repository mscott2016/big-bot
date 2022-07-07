const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');
//const  Discordvv  = require('../../schemas/db-setup.js'); database 

class TwittertrackCommand extends Command {
    constructor() {
        super('twittrack', {
            aliases: ['twittrack', 'twitter', 'twit'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'track project twitter activity, likes, follows, etc..'
            },
            args: [
                {
                    id: 'twitter'
                }
            ]
        });
    }

    async exec(message){

    }
}module.exports = TwittertrackCommand ;