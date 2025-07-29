const { Structures, Guild } = require('discord.js');
const { defaultPrefix } = require('../config.js');

// Returns the Guild prefix
// <Guild>.prefix
Object.defineProperty(Guild.prototype, 'prefix', {
    get() {
        return this.get('prefix', defaultPrefix);
    }
});

// The following methods are all namespaced by Guild ID.
// Examples:
// <Guild>.get('loggingChannelID', [fallback]);
// <Guild>.set('loggingChannelID', '383430486506340352')
Guild.prototype.get = function(key, fallback) {
    return this.client.db.get(`${this.id}_${key}`) || fallback;
};

Guild.prototype.set = function(key, data) {
    return this.client.db.set(`${this.id}_${key}`, data);
};

Guild.prototype.delete = function(key) {
    return this.client.db.delete(`${this.id}_${key}`);
};
