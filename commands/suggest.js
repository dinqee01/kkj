const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let cooldown = new Set();
const cooldownSeconds = 10;
module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!cooldown.has(message.author.id)){
        //add to cooldown and send embed to #suggestions
        let suggestchannel = message.guild.channels.find(`name`, "「▪」suggestions");
        let argument = args.join(" ");
        let botEmbed = new Discord.RichEmbed()
        .setColor("#098aed")
        .setAuthor(`Suggestion From ${message.author.username}`, message.author.displayAvatarURL)
        .setDescription(argument)
        if(!args[0]) return message.reply("You didn't add a suggestion.");
        suggestchannel.send(botEmbed).then(async (msg) => {
          msg.react("✅").then(r => msg.react("❎"))
   });

        message.channel.send(`✅ ${message.author} Your Suggestion Has Been Added!`)
        cooldown.add(message.author.id);
        setTimeout(function(){
          cooldown.delete(message.author.id);
        }, 15*60*1000)
} else message.channel.send(`${message.author} Please wait 15 minutes before adding another suggestion.`)
};
module.exports.help = {
  name: "suggest"
};
