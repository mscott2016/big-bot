require('dotenv').config();
const { Listener } = require('discord-akairo');
// Twitter API v2 - will be configured in individual files as needed



module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });

    }

    exec() {
     
        let i = 0;
        setInterval(() => this.client.user.setActivity(`lca help for help`, { type: 'use' }), 3000);
        console.log(`${this.client.user.tag} is now ready!`);


    
    }
};
