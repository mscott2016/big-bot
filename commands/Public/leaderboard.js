const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
const Discordvv = require('../../schemas/db-setup.js');

class LeaderBoardCommand extends Command {
  constructor() {
    super('leaderBoard', {
      aliases: ['leader', 'leaderboard', 'lb'],
      channel: 'guild',
      category: 'Public Commands',
      description: {
        content: 'level and xp ranked from invites, activity, etc..'
      }
    });
  }

  async exec(message, client) {

      
    var usr = message.mentions.users.first() || message.author;
    var userCount = message.guild.memberCount;
    //
    const rankcard = new Canvacord.Rank()
    let returnAmount = 4;
    const usersl = await Discordvv.fetchLeaderboard(message.guild.id, returnAmount);
    //   { name: 'LEVEL', value: ' ', inline: true },
    //   { name: 'INVITES', value: ' ', inline: true },
    //   { name: 'XP', value: ' ', inline: true },
    // );
      

    function switchVal(val){
    let val_image =""
    switch(val){
      case 1:
        val_image = "🥇";
        break;
      case 2:
        val_image = "🥈";
        break;
      case 3:
        val_image = "🥉";
        break;
      case 4:
        val_image = "4️⃣";
        break;
      case 5:
        val_image = "5️⃣";
        break;
      case 6:
        val_image = "6️⃣";
        break;
      case 7:
        val_image = "7️⃣";
        break;
      case 8:
        val_image = "8️⃣";
        break;
      case 9:
        val_image = "9️⃣";
        break;
      case 10:
        val_image = "🔟";
        break;
      default:
        break;
    }
    return val_image;
  }
  let admins = ['197443508494270464','631629898322280448','597461780427571250','806605471242911804','662670691837149247']
  let use_learders = true;
  function calcUsers(){
    if (userCount <= 10 )
    {
      returnAmount = 3;
    }
    else if (userCount > 11){
       returnAmount = 5;
       use_learders = false 
    }
     else if (userCount > 19){
       returnAmount = 10;
       use_learders = false 
    }

  }

      const embed = new MessageEmbed().setColor('PURPLE');
      const attachment = new Discord.MessageAttachment('./commands/Public/local-culture-logosNOBGglobe-icon-white.png', 'local-culture-logosNOBGglobe-icon-white.png');
      embed.setTitle('THE LEADERS');
      embed.attachFiles(attachment)
      embed.setThumbnail('attachment://local-culture-logosNOBGglobe-icon-white.png');
      embed.addField('NAME\t\tLEVEL\t\tINVITES \t\t XP', '\u200b', true);

    for (const peeps of usersl) {
      if  ((! use_learders ) && !(admins.includes(`${peeps.userID}`)) ){
        let peep_user = message.client.users.cache.get(peeps.userID);
        const requiredXp = await Discordvv.xpFor(parseInt(peeps.level) + 1)


        embed.addField(` ${switchVal(usersl.indexOf(peeps) + 1)} \t ${peep_user.tag}`,'\u200b');
        embed.addField( ` stats \t\t\t lvl  ${peeps.level} \t\t\t invite  ${peeps.invites} \t\t  xp   ${peeps.xp}`,'\u200b');
      }
      else if (use_learders ) {
          
        let peep_user = message.client.users.cache.get(peeps.userID);
        const requiredXp = await Discordvv.xpFor(parseInt(peeps.level) + 1)
        embed.addField(` ${switchVal(usersl.indexOf(peeps) + 1)} \t ${peep_user.tag}`,'\u200b');
        embed.addField( ` stats \t\t\t lvl  ${peeps.level} \t\t\t invite  ${peeps.invites} \t\t  xp   ${peeps.xp}`,'\u200b');
        }

      else {
        continue;
      }
    }

   
message.util.send(embed);
  }
 

}

module.exports = LeaderBoardCommand;

