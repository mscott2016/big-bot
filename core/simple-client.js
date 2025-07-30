const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { ownerID, defaultPrefix } = require('../config.js');
const Utils = require('./utils.js');

require('../structures/Guild.js');

class SimpleClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildPresences
            ],
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.User,
                Partials.GuildMember
            ]
        });

        this.ownerID = ownerID;
        this.defaultPrefix = defaultPrefix;
        this.Utils = new Utils(this);
    }
}

module.exports = SimpleClient;
