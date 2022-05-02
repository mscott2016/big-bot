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
    }

    async exec(message) {
        if (!('951655353035157504' === message.channel.id)) return;
        if (message.author.bot) {
            if (message.content === 'Staring QOTD') {
                console.log(message.content);
                this.started = true;
                this.mss =[];
                const filter = m => m.channel.id.includes('951655353035157504');
                this.collector = new Discord.MessageCollector(message.channel,filter, {  time: 45000, max: 2000 , maxProcessed: 2000});
                console.log('timeoutpr390395 09080ne');
                this.timeChecker();
                
                setInterval(this.timeChecker, 800);
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
            let hi =this.mss.sort((a, b) => 
         a.reactions.cache.map(reaction => reaction.count).reduce(function(tot, arr) {
            console.log(`Collei${tot + arr}`);
            return tot + arr ;
          },0) -
           b.reactions.cache.map(reaction => reaction.count).reduce(function(tot, arr) {
            console.log(`Colle878bhbbhb77y7 i${tot + arr}`);
            return tot + arr ;
          },0));
            console.log(`${ this.mss } Colleceeted ${ hi.reverse()}`);
        });

       
           
      
    }

    async qotd() {
        
        const delay = 1000;
        await this.sheets.readQuestions();
        console.log('timeouerrt i99ttdone');
        let qss = await this.sheets.getLastQuestion();
        console.log(`${qss}`);
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
        var oldTime = this.G_oldTime || new Date(),
            newTime = new Date(),
            timeDiff = newTime - oldTime;
       
        this.G_oldTime = newTime;

        if (Math.abs(timeDiff) >= 800) {
            // day second leniency
            if (this.started) {
                console.log(timeDiff);
                this.qotd();
            }
        }
    }
};
