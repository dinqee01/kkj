const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");
const color = botconfig.color;
const rankrequired = botconfig.setprefixcommandrequiredrank;

module.exports.run = async (bot, message, args) => {

  let role = message.guild.roles.find("name", `${rankrequired}`);
  if(!message.member.hasPermission("ADMINISTARTOR")) return errors.noPerms(message, "ADMINISTARTOR");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: -setprefix (prefix)");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor(color)
  .setTitle("Changed Prefix")
  .setDescription(`Prefix has been set to **${args[0]}**`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "setprefix"
}
