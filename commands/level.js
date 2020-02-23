const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const color = botconfig.color;

let xp = require("../experience.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
  xp[message.author.id] = {
  xp: 0,
  level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 5000;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(color)
  .setThumbnail("http://pixelartmaker.com/art/0fc29bffe9ca6e5.png")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP required to level up!`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed);

}

module.exports.help = {
  name: "level"
}
