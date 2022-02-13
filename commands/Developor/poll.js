const { Command } = require('discord-akairo');
const { ownerID } = require('../../config');
const util = require('util');
const { MessageEmbed } = require('discord.js');
class PollCommand extends Command {
  constructor() {
    super('poll', {
      aliases: ['poll'],
      channel: 'guild',
      category: 'Developer Commands',
      description: {
        content: 'Poll for the people'
      },
      args: [
        {
          id: 'question',
          type: 'string'

        },
        {
          id: 'responces',
          type: 'string'

        }
      ]

    });
  }


  async exec(message, args, client) {
    if (!message.member.hasPermission(`${ownerID}`)) return message.util.reply('Only Owners have Access to This Command!')

    let pollreactions = { // For Multiple Choices
      1: '🇦',
      2: '🇧',
      3: '🇨',
      4: '🇩',
      5: '🇪',
      6: '🇫',
      7: '🇬',
      8: '🇭',
      9: '🇮',
      10: '🇯',
      11: '🇰',
      12: '🇱',
      13: '🇲',
      14: '🇳',
      15: '🇴',
      16: '🇵',
      17: '🇶',
      18: '🇷',
      19: '🇸',
      20: '🇹',
    }

    var questionRegex = /`(.*)`/gmi // Regex, So We Can Take Question For Multiple Poll Options
    const stroo = args.question

    // const questionOriginal = args.question.join(' ').match(questionRegex) // Question Of Poll
    const questionEdited = args.question.replace(/'/g, "").replace(/(\|)/g, " "); // To 
    //Remove `` From Question
    console.log(typeof (questionEdited), questionEdited)
    //if (!questionOriginal || !questionEdited) return message.reply(`No Question Provided`) // If No Question Is Provided
    
    let options = args.responces.split('|') // To Seperate Every Answer
    let result = ''
    console.log(typeof (questionEdited), options)
    if (options.length <= 1) { // If Only Question Is Provided Without Answer
      result += ':ballot_box_with_check: Yes\n'
      result += ':no_entry_sign: No'
      const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
**${questionEdited}**
:ballot_box_with_check: Yes
:no_entry_sign: No  
            `)
       message.channel.bulkDelete(1);

      message.channel.send(embed).then(msg => {
        console.log('gh fhfjg ', questionEdited)
        msg.react("✅"); // React To Message
       
        msg.react("🚫");// React To Message
      })
    } else {
      if (options.length > 20) return message.reply(`You Can't Have More Then 20 Options`) // Discord Limits
      result = options.map((c, i) => {
        return `${pollreactions[i + 1]} ${c}` // To Keep Description
      })

      const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
**${questionEdited}**
${result.join('\n')}
            `)
      message.channel.bulkDelete(1);
      message.channel.send(embed).then(msg => {
        options.map(async (c, x) => {
          msg.react(pollreactions[x + 1]) // React To Message
        })

      })
    }
  }

}

module.exports = PollCommand