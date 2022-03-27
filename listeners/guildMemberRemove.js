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
        try{
        let usrLeave = await Discordvv.fetch(member.user.id,member.guild.id);
        console.log(usrLeave,member.user.id,member.guild.id);
        if (usrLeave === false){
            console.log(
                `${member.user.tag} not saved ${member.guild.name}`
            ); 
            return;
        }
        await Discordvv.removeInvitee(usrLeave.inviter, member.guild.id, member.user.id,1);
        const randomAmountOfXp = Math.floor(Math.random() * 3) + 1; 
        await Discordvv.subtractXp( usrLeave.inviter, member.guild.id, randomAmountOfXp);
        await Discordvv.deleteUser(member.user.id,member.guild.id)
        }
        catch (error) {
        console.error(error);
        }

       
        console.log(
            `${member.user.tag} has been unbanned in ${member.guild.name}`
        );
    }
};
