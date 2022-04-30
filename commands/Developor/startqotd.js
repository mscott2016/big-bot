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
            },
            args: [
                {
                    id: 'tag',
                    type: 'string'

                }
            ]
        });
    }

    async exec(message, args) {
        if(!message.member.hasPermission(`${ownerID}`)) return message.reply('Only Owners have Access to This Command!')
        if (args.tag === '-s'){
        const channel = message.client.channels.cache.get('951655353035157504');
        channel.send(`Staring QOTD`);
        }
        else {
            const channel = message.client.channels.cache.get('951655353035157504');
            channel.send(`Stoping QOTD`);
        }
    }
}

module.exports = QotdCommand;