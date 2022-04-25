const { Command } = require('discord-akairo');
const { ownerID } = require('../../config');
const util = require('util');
class QotdCommand extends Command {
    constructor() {
        super('qotd', {
            aliases: ['qotd','qqt'],
            channel: 'guild',
            category: 'Developer Commands',
            description: {
                content: 'start qotd'
            }
        });
    }

    async exec(message) {
        if(!message.member.hasPermission(`${ownerID}`)) return message.reply('Only Owners have Access to This Command!')
        const channel = message.client.channels.cache.get('951655353035157504');
        channel.send(`Staring QOTD`);
    }
}

module.exports = QotdCommand;