require('dotenv').config();
const { Listener } = require('discord-akairo');
const Twit = require('twit');



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
