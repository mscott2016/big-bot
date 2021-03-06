const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Levels = require("discord-xp");
const  Discordvv  = require('../schemas/db-setup.js');
const { ownerID } = require('../config.js');

//
module.exports = class AntiSpamListener extends Listener {
    constructor() {
        super('antispam', {
            emitter: 'client',
            event: 'message',
        });
    }
 
   async exec(message) {
    if (message.author.bot) return;
    if (message.author.id === ownerID) return;
    const usersMap = new Map();
    const LIMIT = 10;
    const TIME = 7000;
    const DIFF = 3000;

     if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            console.log('Cldfffeared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from m555555ap.')
                
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            console.log('Removeyyd fromjj m555555ap.')
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
                message.channel.send('You have been muted!');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('You have been unmuted!')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from maprrr rrr.')
            
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
    }
  
};

