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
    }

    async exec(message) {
        if (!('951655353035157504' === message.channel.id)) return;
        if (message.author.bot) {
            if (message.content === 'Staring QOTD') {
                console.log(message.content);
                this.started = true;
                console.log('timeoutpr390395 09080ne');
                timeChecker();
                setInterval(timeChecker, 86400000);
            } else if (message.content === 'Stopping QOTD') {
                console.log(message.content);
            }
        }
    }
    pause() {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, 1500);
        });
    }

    async qotd() {
        
        const delay = 1000;
        console.log('timeouerrt i99ttdone');
        PromiseTimers.setTimeout(delay).then(function (args) {
            // this refers to timeout
            console.log(args);
            console.log('timeout 09080ne');
            pause();
        });
    }

    timeChecker() {
        var oldTime = this.G_oldTime || new Date(),
            newTime = new Date(),
            timeDiff = newTime - oldTime;
        console.log(this.G_oldTime);
        this.G_oldTime = newTime;

        if (Math.abs(timeDiff) >= 800) {
            // day second leniency
            if (this.started) {
                console.log(timeDiff);
                qotd();
            }
        }
    }
};
