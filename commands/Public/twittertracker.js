const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
const { TwitterApi } = require('twitter-api-v2');

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

    async exec(message, args) {
        if (!args.twitter) {
            return message.channel.send('Please provide a Twitter handle to track. Usage: `lca twittrack @username`');
        }

        try {
            // Initialize Twitter API v2 client
            const client = new TwitterApi({
                appKey: process.env['TWITCONKEY'],
                appSecret: process.env['TWITCONSEC'],
                accessToken: process.env['TWITACCTOK'],
                accessSecret: process.env['TIWTACCSEC'],
            });

            let handle = args.twitter.replace('@', '');
            console.log(chalk.green(`Twitter tracking requested by ${chalk.yellow(message.author.username)} for ${chalk.cyan(handle)}`));

            // Get user by username
            const user = await client.v2.userByUsername(handle, {
                'user.fields': ['public_metrics', 'description', 'profile_image_url', 'verified']
            });

            if (!user.data) {
                return message.channel.send(`❌ User @${handle} not found.`);
            }

            // Get recent tweets (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const tweets = await client.v2.userTimeline(user.data.id, {
                max_results: 100,
                'tweet.fields': ['public_metrics', 'created_at', 'text'],
                start_time: thirtyDaysAgo.toISOString()
            });

            // Calculate metrics
            let totalLikes = 0;
            let totalRetweets = 0;
            let totalReplies = 0;
            let totalQuotes = 0;

            if (tweets.data) {
                tweets.data.forEach(tweet => {
                    totalLikes += tweet.public_metrics.like_count;
                    totalRetweets += tweet.public_metrics.retweet_count;
                    totalReplies += tweet.public_metrics.reply_count;
                    totalQuotes += tweet.public_metrics.quote_count;
                });
            }

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(`🐦 Twitter Analytics for @${handle}`)
                .setThumbnail(user.data.profile_image_url)
                .addFields(
                    { name: '👤 User Info', value: `**Name:** ${user.data.name}\n**Verified:** ${user.data.verified ? '✅' : '❌'}\n**Followers:** ${user.data.public_metrics.followers_count.toLocaleString()}`, inline: true },
                    { name: '📊 30-Day Activity', value: `**Tweets:** ${tweets.data ? tweets.data.length : 0}\n**Likes:** ${totalLikes.toLocaleString()}\n**Retweets:** ${totalRetweets.toLocaleString()}`, inline: true },
                    { name: '📈 Engagement', value: `**Replies:** ${totalReplies.toLocaleString()}\n**Quotes:** ${totalQuotes.toLocaleString()}\n**Avg Likes/Tweet:** ${tweets.data && tweets.data.length > 0 ? Math.round(totalLikes / tweets.data.length) : 0}`, inline: true }
                )
                .setFooter({ text: 'Data from Twitter API v2', iconURL: 'https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc727a.png' })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error('Twitter API Error:', error);
            message.channel.send('❌ Error fetching Twitter data. Please check the handle and try again.');
        }
    }
}
module.exports = TwittertrackCommand;
