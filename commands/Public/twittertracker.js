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

          // screen_name:"localcultureart" fields=public_metrics
          T.get('search/tweets', {q:"from:localcultureart  since:2022-06-20" , count: 100 }, function(err, data, response) {
            console.log(data.entities, data.user
                ,typeof(data),   Object.keys(data).length)
                for(var prop in data['statuses']){
                    console.log(data['statuses'][prop].id);
                    url = `https://api.twitter.com/2/tweets/${data['statuses'][prop].id}?tweet.fields=public_metrics,non_public_metrics`;

                    headeroauth = OAuth1(consumer_key, consumer_secret,access_token, access_token_secret, signature_type='auth_header')
                    r = requests.get(url, auth=headeroauth)
                    
                    print(r.json())
                }

          })
           
        //    const channel = message.client.channels.cache.get('935671934488830013');
          //935671934488830013
          //channel.send(atta)
    }
}module.exports = TwittertrackCommand ;