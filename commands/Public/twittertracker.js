const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');
const Twit = require('twit');
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
        const T = new Twit({
            consumer_key: `${process.env['TWITCONKEY']}`,
            consumer_secret: `${process.env['TWITCONSEC']}`,
            access_token: `${process.env['TWITACCTOK']}`,
            access_token_secret: `${process.env['TIWTACCSEC']}`,
            timeout_ms: 60 * 1000,
            strictSSL: true,
          });

          
          T.get('favorites/list', {  screen_name:"localcultureart", count: 100 }, function(err, data, response) {
            console.log(data, response)
          })
           
        //    const channel = message.client.channels.cache.get('935671934488830013');
          //935671934488830013
          //channel.send(atta)
    }
}module.exports = TwittertrackCommand ;