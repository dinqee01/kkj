const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nemas permisiju za tu komandu.");
  if(!args[0]) return message.channel.send("Napisi broj poruka koje zelis izbrisat");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`${args[0]} poruka je izbrisano.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear",
  aliases: []
}