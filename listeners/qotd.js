const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const chalk = require('chalk');
const Canvacord = require('canvacord');
const Discordvv = require('../schemas/db-setup.js');
const GoogleSheet = require('../sheets-class');
const PromiseTimers = require('promise-timers');

module.exports = class QotdListener extends Listener {
    constructor() {
        super('qotd', {
            emitter: 'client',
            event: 'message'
        });
        this.sheets = new GoogleSheet();
        this.started = false;
        this.G_oldTime = new Date();
        this.collector;
        this.mss =[];
        this.channelll;
        this.post_chan;
        this.qss;
    }

    async exec(message) {
        if (!('951655353035157504' === message.channel.id)) return;
        if (message.author.bot) {
            if (message.content === 'Staring QOTD') {
                console.log(message.content);
                this.started = true;
                this.mss =[];
                const filter = m => m.channel.id.includes('951655353035157504');
                this.collector = new Discord.MessageCollector(message.channel,filter, {  time: 40000, max: 2000 , maxProcessed: 2000});
                this.channelll = message.client.channels.cache.get('951655353035157504');
                this.post_chan = message.client.channels.cache.get('951654574920458350');
                this.qotd();
                console.log('timeoutpr390395 09080ne');
                setInterval(this.timeChecker, 55000);
            } else if (message.content === 'Stopping QOTD') {
                console.log(message.content);
                this.started = false;
            }
        }


    }

    pause(){
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, 150);
        });
    }

    callCollector(){
        this.collector.on('collect', m => {
           this.mss.push( m)
           
            console.log(`Collddected ${m.id}`);
        });
        
    }
    endCollecter(){
        
          
        
        this.collector.on('end', collected => {
            // send end message 
            this.channelll.send(`Ending question of the day most reactions wins !!`);
            let hi =this.mss.sort((a, b) => 
         a.reactions.cache.map(reaction => reaction.count).reduce(function(tot, arr) {
            console.log(`Collei${tot + arr}`);
            return tot + arr ;
          },0) -
           b.reactions.cache.map(reaction => reaction.count).reduce(function(tot, arr) {
            console.log(`Colle878bhbbhb77y7 i${tot + arr}`);
            return tot + arr ;
          },0));
            console.log(`${ this.mss } Colleceeted `);
           this.winner(hi.reverse());
        // send who one in q chat with q
       
        });
        //clear  mss
       this.mss = [];
           
      
    }

    winner(msgList){
        
        if (msgList.length > 0 && msgList.length <5){
            this.post_chan.send(`QOTD: ${this.qss}: \n
             1: ${msgList[0].author.tag}`);
        }
        else if ( msgList.length >13){
            this.post_chan.send(`QOTD: ${this.qss}: \n
             1: ${msgList[0].author.tag} \n
             2: ${msgList[1].author.tag}\n
             3: ${msgList[2].author.tag}\n
             4: ${msgList[3].author.tag}\n
             5: ${msgList[4].author.tag}\n`);
        }
        else {
            this.post_chan.send(`QOTD: ${this.qss}: \n
            1: ${msgList[0].author.tag} \n
            2: ${msgList[1].author.tag}\n
            3: ${msgList[2].author.tag}\n`);

        }
        }

    async qotd() {
      
        const delay = 1000;
        await this.sheets.readQuestions();
        console.log('timeouerrt i99ttdone');
        this.qss = await this.sheets.getLastQuestion();
        console.log(`${ this.qss}`);
        this.channelll.send(`QOTD: ${this.qss}`);
        this.callCollector();
        this.endCollecter();
       
        // PromiseTimers.setTimeout(delay).then(function (args) {
        //     // this refers to timeout
        //     console.log(args);
        //     console.log('timeout 09080ne');
        //    this.pause();
        // });
    }

    timeChecker() {
        console.log( "u7777780097 uuuuuu vb");
        var oldTime = this.G_oldTime || new Date(),
            newTime = new Date(),
            timeDiff = newTime - oldTime;
       
        this.G_oldTime = newTime;
       
        if (Math.abs(timeDiff) >= 800) {
            console.log( Math.abs(timeDiff), timeDiff);
            // day second leniency
            if (this.started) {
                console.log(timeDiff+ " hhhj  uuuuuu vb");
                this.qotd();
            }
            else {
                return;
            }
        }
    }
};
