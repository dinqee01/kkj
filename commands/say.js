const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const color = botconfig.color;
const rankrequired = botconfig.saycommandrequiredrank;
const lang = require("../lang.json");
const noperms = lang.NoPermission;
const noarguments = lang.NoArgumentsFound;

module.exports.run = async (bot, message, args) => {

  message.delete();
  let role = message.guild.roles.find("name", `${rankrequired}`);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let argument = args.join(" ");
      if(!args[0]) return message.reply(`${noarguments}`);
  let botEmbed = new Discord.RichEmbed()
  .setColor(color)
  .setDescription(argument);
  message.channel.send(botEmbed);
}

module.exports.help = {
  name: "say"
}
