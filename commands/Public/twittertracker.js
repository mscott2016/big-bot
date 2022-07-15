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

    async exec(message, args){
        console.log(args);
        const T = new Twit({
            consumer_key: `${process.env['TWITCONKEY']}`,
            consumer_secret: `${process.env['TWITCONSEC']}`,
            access_token: `${process.env['TWITACCTOK']}`,
            access_token_secret: `${process.env['TIWTACCSEC']}`,
            timeout_ms: 60 * 1000,
            strictSSL: true,
          });
          let handle=args['twitter'];//.replace('@', '');
          let date = '2022-06-20';
          //console.log(args.id);
        //   String(message);
        //   console.log("Message Starts here");
        //   console.log(JSON.parse(message.innerText));
        //   console.log(typeof(message));
          // screen_name:"localcultureart" fields=public_metrics
          console.log(handle);
          T.get('search/tweets', {q:`from: ${handle}  since: ${date}` , count: 100 }, function(err, data, response) {
            console.log(data['statuses']);
            console.log(data);
            console.log(data.entities, data.user
                ,typeof(data),   Object.keys(data).length);
                for(var prop in data['statuses']){
                    //console.log(data);
                    console.log(data['statuses']);
                    
                    const params = {
                        'query': `from: ${handle}`,
                        'since': `${date}`
                    };

                    // let url = `https://api.twitter.com/2/tweets/${data['statuses'][prop].id}?tweet.fields=public_metrics,non_public_metrics`;
                    // const res = await needle('get', url, params, {
                    //     headers: {
                    //         "User-Agent": "v2RecentSearchJS",
                    //         "authorization": `Bearer ${process.env['beart']}`
                    //     }
                    // })
                
                    // if (res.body) {
                    //     console.log(res.body, res);
                    // } else {
                    //     throw new Error('Unsuccessful request');
                    // }
                    // let headeroauth = OAuth1(consumer_key, consumer_secret,access_token, access_token_secret, signature_type='auth_header')
                    // let r = requests.get(url, auth=headeroauth)
                    
                    // console.log(r.json())
                }

          })
           
        //    const channel = message.client.channels.cache.get('935671934488830013');
          //935671934488830013
          //channel.send(atta)
    }
}module.exports = TwittertrackCommand ;