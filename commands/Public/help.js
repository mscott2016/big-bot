const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const e = require('express');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'commands'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ],
            category: 'Public Commands',
            description: {
                content: 'Displays information about a command',
                usage: '[command]',
                examples: ['cat']
            }
        });
    }

    exec(message, { command }) {
        const prefix = this.handler.prefix;
        const embed = new MessageEmbed().setColor('PURPLE');

        if (command) {
            embed
                .setColor('PURPLE')
                .addField(
                    '❯ Description:',
                    command.description.content || 'No Description provided'
                )
                .addField(
                    '❯ Usage:',
                    `\`lca ${command.aliases[0]} ${command.description.usage ? command.description.usage : ''
                    }\``
                );

            if (command.aliases.length > 1) {
                embed.addField('❯ Aliases Available:', `\`${command.aliases.join('`, `')}\``);
            }
            if (command.description.examples && command.description.examples.length) {
                embed.addField(
                    '❯ Example:',
                    `\`${command.aliases[0]} ${command.description.examples.join(
                        `\`\n\`${command.aliases[0]} `
                    )}\``
                );
            }
        } else {
            embed
                .setTitle(`${this.client.user.username}'s Help Interface`)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setDescription(
                    stripIndents`
                    These are the available commands to use in \`${message.guild.name}\`,
                    The prefix for ${this.client.user.username} is \`lca\`
                    The commands usage is generally \`lca <command> <parameter>\``
                )
                .setFooter(
                    'For more info on a command, use lca help <command>',
                    this.client.user.displayAvatarURL()
                );

            for (const category of this.handler.categories.values()) {
             if (category.id === 'Utilities' || category.id === 'Developer Commands')
             {
               console.log(" hf")
               continue;

             }
              
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase())}:`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(' , ')}`
                );
            }
            embed.addField(`__Nexus__`, [
                `[website](https://localculture.art) | [tiktok](https://vm.tiktok.com/TTPdhaSvLF/) | [twitter](https://twitter.com/localcultureart) |`
            ]);
            // embed.addField("Field title", "Your text here: [link](http://example.com)")
            // embed.addField(`\`Notice:\` The \`mc\` command has been fixed! try it`)

        }

        return message.util.send(embed);
    }
}

module.exports = HelpCommand;