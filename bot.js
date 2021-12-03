var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./config.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
	var name = "https://github.com/BondieDev/Bondie";
	bot.setPresence({
    	game: {
        	name,
}});
    logger.info('Connected');
    logger.info('Logged in as: '+bot.username + ' - (' + bot.id + ')');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {


    if (message.substring(0, 1) == '-') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                                    
                });

            case 'test':
            	bot.sendMessage({
            		to: channelID,
            		message: 'bruh u really gotta test ur bot lmfao'
            	})

            case 'stink':
            	bot.sendMessage({
            		to: channelID,
            		message: 'you are a stinky'
            	})

            break;
            // Just add any case commands if you want to..
         }
     }
});