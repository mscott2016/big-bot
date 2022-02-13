const { Listener } = require('discord-akairo');
const  Discordvv  = require('../schemas/db-setup.js');

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
       let usrLeave = await Discordvv.fetch(member.user.id,member.guild.id);
       let usrInviter = await Discordvv.removeInvitee(usrLeave.inviter, member.guild.id, member.user.id,1 );
       const randomAmountOfXp = Math.floor(Math.random() * 3) + 1; // Min 1, Max 30
      await Discordvv.subtractXp( usrLeave.inviter, member.guild.id, randomAmountOfXp);
      await Discordvv.deleteUser(member.user.id,member.guild.id)

        console.log(
            `${member.user.tag} has been unbanned in ${member.guild.name}`
        );
    }
};
