
const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");
const fs = require("fs");

client.on("ready", () => {

	let serverlist = ''
	let count = 0; //<---
	client.guilds.cache.forEach((guild) => {
    count += guild.memberCount // <---

})
  
  console.log(`Bot has started, with ${client.guilds.cache.size} servers, ${client.channels.cache.size} channels and ${count} users.`); 
  
  let statuses = [ `over ${count} users!`];

  setInterval(function(){
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    
    client.user.setStatus('idle')
    client.user.setPresence({ activities: [{ name: status }], status: 'idle' });
    client.user.setActivity(status, { type: 'WATCHING' });

  }, 15000)



    
});

client.on("guildCreate", guild => {
  
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {

  console.log("[" + message.channel.name + "] " + message.member.user.tag + " > " + message.content);
  if(message.author.bot) return;  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Ping command
  // if(command === "ping") {
  //   let ping = (Math.round(Math.random() * 17) + 2)
  //   let ping2 = (Math.round(Math.random() * 12) + 1)
  //   message.channel.send("Pong?").then((message)=>{
  //     message.edit("Bot ping is " + ping + "ms, API latency is " + ping2 +"ms.")
  //   });
  // }

  if (command === "ping") {
 	message.channel.send("Pinging...").then(m =>{
          
            var ping = m.createdTimestamp - message.createdTimestamp;

          
            var embed = new Discord.MessageEmbed()
            .setAuthor(`Bot's latency is ${ping}ms`)
            .setColor("#6a0dad")
            
            
            m.edit(embed)
        });
  	  }


  if (command === "say"){
  	message.delete();
  	let MSG = message.content.split(" ");
  	let Query = MSG.slice(1).join("+");
  	let QueryD = MSG.slice(1).join(" ");
  	if (!Query) message.reply("Please specify something for me to say!")
  	else
  {
    message.channel.send(QueryD)
}
}

  if(command === "slap") {
    let userK = message.mentions.members.first();
    let userS = message.member.id;
    let number = Math.floor((Math.random() * 14) + 1);

    if (!userK) {
        message.channel.send("You can't slap nobody!")
        return;
   }

    message.delete();
    message.channel.send("<@"+userS+">  slapped " + "<@"+userK+">", {
        files: [
            "./pics/slap/slap"+number+".gif"
        ]});
  }

  if(command === "uptime") {
  	let totalSeconds = (client.uptime / 1000);
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	let uptime = `${days}d, ${hours}h, ${minutes}m and ${seconds}s`;
    message.channel.send("Current bot uptime: "+uptime);
  }

  // if(command === "curse"){
  // 	let curses = [ `fuck` , `shit` , `arse` , `crap` , `bloody` , `damn`,`piss off`,`dickhead`,`asshole`,`bitch`,`bastard`];

  //   let curse = curses[Math.floor(Math.random()*curses.length)];
  //   message.delete();
  //   message.channel.send(curse+"!")
 
  // }

});

//everything below this is wITHOUT PREFIX
  client.on("message", (message) => {
  if (message.content == "fuck u") {
    message.reply("no fuck you, piece of shit");
  }

  if (message.content == "no u") {
    message.reply("no you cunt");
  }

  if (message.content == "sus") {
    message.reply("bro stfu ur not 7 are you");
  }

  if (message.content == "smd") {
    message.reply("where");
  }

  if (message.content == "nigga") {
  	message.delete();
    message.reply("ayo we dont want no n words in here or crystal will get mad so stfu");
  }

  if (message.content == "nigger") {
  	message.delete();
    message.reply("ayo we dont want no n words in here, AYO U USED THE HARD R FUCK U");
  }
});

;

client.login(config.token);