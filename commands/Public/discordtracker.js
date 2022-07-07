const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');

class DiscordtrackCommand extends Command {
    constructor() {
        super('dstrack', {
            aliases: ['dstrack', 'disc'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'track project discord online, members, etc..'
            },
            args: [
                {
                    id: 'discord'
                }
            ]
        });
    }

    async exec(message){

    }
}module.exports = DiscordtrackCommand ;