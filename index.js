 require('dotenv').config();
const { Command } = require('discord-akairo');
const Stonks = require('./core/client.js');
const client = new Stonks();
const Database = require("@replit/database");
const db = new Database();
const mySecret = process.env['TOKEN']
const Levels = require("discord-xp");
const mongoose = require('mongoose');
const mongoCurrency = require('discord-mongo-currency');
//const disbut = require('discord-buttons');
//disbut(client);
const Twit = require('twit');
const mySecretUrl = process.env['CONNECTION_URL']
//const { DiscordXpP: level} = require('./schemas/db-setup.js');
const  Discordvv  = require('./schemas/db-setup.js');
const level = new Discordvv();
console.log(Discordvv)
Discordvv.setURL(mySecretUrl)
let invites = new Map()
Levels.setURL(mySecretUrl)

mongoose.connect(mySecretUrl, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=> app.listen(PORT2, () => console.log(`Mongo Server running on port: ${PORT2}`)))
// .catch((error) => console.log(error.message));

mongoCurrency.connect(mySecretUrl);


let G_oldTime = new Date()

client.login(mySecret);

console.log("eiei32wh")

client.on("guildCreate", guild => {
  const channels = guild.channels.cache.filter(channel => channel.type == "text");

  channels.first().send("Hello there, thanks for adding me! Get a list of commands and their usage with `lca help`.\n" +
    "\nIf you ever need help or have suggestions, please don't hesitate to leave a comment in the support chat! " +
    " Use `lca help` for assistance").catch(e => console.log(e));
});


client.on("message", message => {
  if (message.author.bot) return false;
  //ex(message)
  // exLI(message)
  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;


  if (message.mentions.has(client.user.id)) {
    let ping = new Date().getTime() - message.createdTimestamp;
    if (Math.sign(ping) === -1) { ping = ping * -1; }
    message.channel.send('Whassssuuup?! ' + "<@!" + message.author.id + ">" + ' (`Ping:' + ping + " ms`)");
    message.channel.send('https://media.giphy.com/media/kigKjAJryWTZK/giphy.gif')
  };
  if (message.content === 'gm local culture' || message.content === 'Good morning local culture' || message.content === 'goodmorning local culture' || message.content === 'good morning local culture') {
    message.channel.send("Good Morning! " + "<@!" + message.author.id + ">")
  };
  if (message.content === 'w local culture' || message.content === 'local culture w' || message.content === 'W local culture' || message.content === 'local culture W') {
    // message.channel.send("F's in the chat boys " + "https://i.kym-cdn.com/photos/images/original/000/858/776/f2e.jpg_large")
    const respect = {
      title: "W's in the chat",
      description: 'W to pay respect',
      image: {
        url: 'https://memegenerator.net/img/instances/81758796.jpg',
      },
    };
    message.channel.send({ embed: respect });
  };

  function exLI(message) {
    const randomNumber = Math.floor(Math.random() * 10) + 15;
    const ee = Levels.appendXp(message.author.id, message.guild.id, randomNumber);
    if (ee) {
      const usr = Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`${message.member} ---- ${usr.level}`)
    }
  }
  function ex(message) {
    if (message.author.bot) return
    console.log(" fhnj")
    const randomNumber = Math.floor(Math.random() * 10) + 15;
    db.set(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
    db.set(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)

    var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1

    var lae;
    db.get(`guild_${message.guild.id}_xptotal_${message.author.id}`).then(value => {
      console.log(` \n ${level} p  \n`)
      return value;
    });

    let xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`).then(value => {
      console.log(` \n ${value} m \n`);
      lae = value;
      return value;
    });
    console.log(` \n ${lae}  mm vo\n`)
    var xpNeeded = level * 50;

    if (xpNeeded < xp) {
      var newLevel = db.set(`guild_${message.guild.id}_level_${message.author.id}`, `${randomNumber}`)

      db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
      message.channel.send(`Congrats ${message.author}, you leveled up, you are now level ${newLevel}`)
    }
  }


});

client.on("ready", () => {
  
  
  client.channels.cache.get('935648492326649857').messages.fetch("963860501752852560").then(msg => {
    let totalReactionsCount = msg.reactions.cache.map(reaction => reaction.count).reduce(function(tot, arr) {
      
      console.log(`heyr boy  -- ${tot + arr}`);
      return tot + arr ;
    },0);
    console.log(` done-- ${totalReactionsCount}`);
    
  });
  
  
  //setInterval(timeChecker, 86400000);
  setInterval(memberUpdate, 10000);
  client.guilds.cache.forEach(async (guild) => {
    // Fetch all Guild Invites
    const firstInvites = await guild.fetchInvites();
    // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
    invites.set(guild.id, new Map(firstInvites.map((invite) => [invite.code, invite.uses])));
  });

  const T = new Twit({
    consumer_key: `${process.env['TWITCONKEY']}`,
    consumer_secret: `${process.env['TWITCONSEC']}`,
    access_token: `${process.env['TWITACCTOK']}`,
    access_token_secret: `${process.env['TIWTACCSEC']}`,
    timeout_ms: 60 * 1000,
    strictSSL: true,
  });

  var stream = T.stream('statuses/filter', { follow: [process.env['TWITID']] });

  //    var stream = T.stream('statuses/sample')
  //console.log(stream)
  stream.on('tweet', function (tweet) {
    //console.log(tweet)
    //    only show owner tweets
    if (tweet.user.id == process.env['TWITID']) {
      //console.log("ndeeedn")
      var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
      try {
        console.log(`${url}`);
        client.channels.fetch('935647726291546203').then(channel => {
          channel.send(url)
        }).catch(err => {
          console.log("ndki493dn")
          console.log(err)
        })
      }
      catch (error) {
        //  console.log("nde88444dn")
        console.error(error);
      }
    }
  });
  memberUpdate()
});

client.on('guildMemberRemove',  member => {
   memberUpdate()
});

client.on('guildMemberAdd',  member => {
  // To compare, we need to load the current invite list.
  if (member.user.bot){
    memberUpdate();
  return;
}
  member.guild.fetchInvites().then(async (newInvites) => {
    // This is the *existing* invites for the guild.
    
    //level.setURL(mySecretUrl);
    const oldInvites = invites.get(member.guild.id);
    // Look through the invites, find the one for which the uses went up.
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    
    const inviter = client.users.cache.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    console.log(invite.code)
    const logChannel = member.guild.channels.cache.get('935663398492962866');
    const randomAmountOfXp = Math.floor(Math.random() * 3) + 1; // Min 1, Max 30

    await Discordvv.appendXp(inviter.id, member.guild.id, randomAmountOfXp);
    await Discordvv.createUser(member.user.id, member.guild.id);
     await Discordvv.appendInviter(member.user.id, member.guild.id, inviter.id );
    
     await Discordvv.appendInvitee(inviter.id, member.guild.id,member.user.id , 1 );
    //fuck
    memberUpdate()
    // A real basic message with the information we need. 
    inviter
      ? logChannel.send(`${member.user.tag} was invited by ${inviter.tag}. `)
      : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
  });
});

function qotd() {  // question of the day
  // Whatever
  
}
function timeChecker() {
  var oldTime = G_oldTime || new Date(),
      newTime = new Date(),
      timeDiff = newTime - oldTime;
      console.log(G_oldTime)
      G_oldTime = newTime;

  if (Math.abs(timeDiff) >= 800) { // day second leniency
    qotd();
    //console.log(timeDiff)
  }
}

//setInterval(timeChecker, 2000);

function memberUpdate (){
  function pause() {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, 1500);
    });
  }
  const PromiseTimers = require('promise-timers');
  const delay = 10000;
 
  
   //const wait = require("timers/promises").setTimeout;
  
    PromiseTimers.setTimeout(delay).then(function (args) {
    // this refers to timeout
    //console.log(args);

    client.guilds.cache.forEach(async (guild) => {
      // Fetch all Guild Invites
      
      var userCount = guild.memberCount;
      var onlineCount = guild.members.fetch(m => m.presence.status === 'online').size
      let chan = client.channels.cache.get('940422111661547570');
      chan.setName(`All Members:${userCount}`)
      //console.log(onlineCount, userCount)
      await pause();
    }) 
    pause();
  });
  
}