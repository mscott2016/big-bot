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
        let mems = ['955002146460409876','947576814333726741','881226743787159585','597461780427571250','806605471242911804']
        if(!message.member.hasPermission(`${ownerID}`) || mems.includes(message.author.id)) return message.reply('Only Owners have Access to This Command!')
        if (args.tag === '-s'){
        const channel = message.client.channels.cache.get('951655353035157504');
        channel.send(`Starting QOTD`);
        }
        else {
            const channel = message.client.channels.cache.get('951655353035157504');
            channel.send(`Stoping QOTD`);
        }
    }
}

module.exports = QotdCommand;