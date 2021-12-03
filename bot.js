
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
  
  let statuses = [ `${count} users!`, `Prefix : -`, `ItsBondie`];

  setInterval(function(){
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    
    client.user.setStatus('idle')
    client.user.setPresence({ activities: [{ name: status }], status: 'idle' });
    client.user.setActivity(status, { type: 'WATCHING' });

  }, 60000)



    
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
  if(command === "ping") {
    let ping = (Math.round(Math.random() * 17) + 2)
    let ping2 = (Math.round(Math.random() * 12) + 1)
    message.channel.send("Pong?").then((message)=>{
      message.edit("Bot ping is " + ping + "ms, API latency is " + ping2 +"ms.")
    });
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

}
);

client.login(config.token);