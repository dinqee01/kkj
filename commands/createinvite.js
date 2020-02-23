const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let color = botconfig.color;

exports.run = async (anko, message, args, color) => {
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.RichEmbed()
    .setColor(color)
    .setDescription(`**Invite Link**: ${invite}`);
    message.channel.send(embed);
  });
}

exports.help = {
  name: 'createinv',
}