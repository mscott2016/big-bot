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
            if (message.content === 'Starting QOTD') {
                console.log(message.content);

                this.started = false;

                this.mss =[];
                const filter = m => m.author.id !== message.author.bot;
                var userCount = message.guild.memberCount;
                this.collector = new Discord.MessageCollector(message.channel,filter, {  time:  89900000, max: userCount + 6 , maxProcessed: userCount + 6});
                this.channelll = message.client.channels.cache.get('951655353035157504');
                this.post_chan = message.client.channels.cache.get('951654574920458350');
                await this.qotd(this.collector);
                // .then(()=> {
                //     console.log('tij80395 0ne');
                //     setTimeout(function(){return function() { this.qotd(this.collector) }}, 86400000);
                //     console.log('timeoutpr390395 09080ne');
                // });
               
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
           this.collector.handleDispose(collected);
           // send who one in q chat with q
       
        });
        this.collector.resetTimer({ time: 40000});
       // this.mss.forEach()this.collector.dispose()
        //clear  mss
       
       const filter = m => !m.author.bot ;
       const h = new Discord.MessageCollector(this.channelll,filter, {  time: 40000, max: 2000 , maxProcessed: 2000});
       this.mss = []; 
       this.collector= new Discord.MessageCollector(this.channelll,filter, {  time: 40000, max: 2000 , maxProcessed: 2000});
    }

    winner(msgList){
        
        if (msgList.length > 0 && msgList.length <= 5){
            this.post_chan.send(`QOTD: ${this.qss}: \n
             1: ${msgList[0].author.toString()}`);
        }
        else if ( msgList.length >13){
            this.post_chan.send(`QOTD: ${this.qss}: \n
             1: ${msgList[0].author.toString()} \n
             2: ${msgList[1].author.toString()}\n
             3: ${msgList[2].author.toString()}\n
             4: ${msgList[3].author.toString()}\n
             5: ${msgList[4].author.toString()}\n`);
        }
        else {
            this.post_chan.send(`QOTD: ${this.qss}: \n
            1: ${msgList[0].author.tag} \n
            2: ${msgList[1].author.tag}\n
            3: ${msgList[2].author.tag}\n`);

        }
        }

    async qotd(collector) {
      
        const delay = 1000;
        await this.sheets.readQuestions();
        console.log('timeouerrt i99ttdone');
        this.qss = await this.sheets.getLastQuestion();
        console.log(`${ this.qss}`);
        this.channelll.send(`\n QOTD: ${this.qss}  @everyone`);
       // this.callCollector();
        //this.endCollecter();
        this.started = true;

        collector.on('collect', m => {
            this.mss.push( m)
            
             console.log(`Collddected ${m.id}`);
         });
         
        
         
         collector.on('end', collected => {
             // send end message 
             this.channelll.send(`Ending question of the day!! THE most reactions wins !!`);
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
            collector.handleDispose(collected);
            // send who one in q chat with q
        
         });
         collector.resetTimer({ time: 467009000});
        // this.mss.forEach()this.collector.dispose()
        //clear  mss
        
     
        this.mss = []; 
    
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
        console.log( Math.abs(timeDiff), timeDiff);
        if (Math.abs(timeDiff) >= 10) {
            console.log( `${Math.abs(timeDiff)} s ifjv ${timeDiff}`);
            // day second leniency
            if (this.started) {
                console.log(" --- uuuuuu vb");
                this.qotd();
                console.log(" hhhj  uuuuuu vb");
            }
            else {
                return;
            }
        }
    }
};
