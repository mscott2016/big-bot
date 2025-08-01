const path = require('path');
const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const { 
    GatewayIntentBits, 
    Partials 
} = require('discord.js');
const { ownerID, defaultPrefix } = require('../config.js');
// const db = require('quick.db'); // COMMENTED OUT: Database not needed
const Utils = require('./utils.js');

require('../structures/Guild.js');
// require('../structures/GuildMember.js'); // COMMENTED OUT: Structure extensions disabled

module.exports = class Stonks extends AkairoClient {
    constructor() {
        super(
            {
                ownerID,
                disableEveryone: true
            },
            {
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.GuildMembers,
                    GatewayIntentBits.MessageContent,
                    GatewayIntentBits.GuildInvites,
                    GatewayIntentBits.GuildPresences
                ],
                partials: [
                    Partials.Channel,
                    Partials.Message,
                    Partials.User,
                    Partials.GuildMember
                ]
            }
        );

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '..', 'commands/'),
            prefix: message =>
                message.guild ? message.guild.prefix : defaultPrefix,
            commandUtil: true
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '..', 'listeners/')
        });
       
        // this.db = db; // COMMENTED OUT: Database not needed
        this.Utils = new Utils(this);
    }

    async login(token) {
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        return super.login(token);
    }
};