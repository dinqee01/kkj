const Discord = require("discord.js");
let cooldown = new Set();
const cooldownSeconds = 10;
const botconfig = require("../botconfig.json");
const color = botconfig.color;
const bugchannel = botconfig.bugreportschannel;
const lang  = require("../lang.json");
const footer = lang.BugReportEmbedFooter;
const nobug = lang.NoBugFound;
const reported = lang.BugReportedReplyMessage;
const reportcooldown = lang.BugReportCooldownMessage;

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!cooldown.has(message.author.id)){
        let bchannel = message.guild.channels.find(`name`, `${bugchannel}`);
        if(!bchannel) return message.channel.send(`Can not find ${bugchannel} channel.`);
        let argument = args.join(" ");
        let botEmbed = new Discord.RichEmbed()
        .setAuthor(`New Bug Report From ${message.author.username}`)
        .setColor(color)
        .setDescription(argument)
        .setFooter(`${footer}`);
        if(!args[0]) return message.reply(`${nobug}`);
        bchannel.send(botEmbed)
        message.reply(`${reported}`)

        cooldown.add(message.author.id);
        setTimeout(function(){
          cooldown.delete(message.author.id);
        }, 5*60*1000)
} else message.reply(`${reportcooldown}`)
};
module.exports.help = {
  name: "bugreport"
};
