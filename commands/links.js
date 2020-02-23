const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const color = botconfig.color;
const website = botconfig.website;
const store = botconfig.store;
const twitter = botconfig.Twitter;

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.RichEmbed()
    .setColor(color)
    .addField("**LINKS**", `All links related to the server\n \n**Website** ${website}\n**Store** ${store}\n**Twitter** ${twitter}`)
    message.channel.send(botembed)
}
module.exports.help = {
  name:"links"
}
