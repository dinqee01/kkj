const Discord = require("discord.js");
const lang = require("../lang.json");
const nouser = lang.NoUserFound;
let coins = require("../coinsystem.json");

module.exports.run = async (bot, message, args) => {
    if(!args[0])
        message.reply("You have " + coins[message.author.id].coins + " coins");
    else {
        let user = message.mentions.users.first();
        if(!user) return message.reply(`${nouser}`);
        let uCoins = coins[user.id].coins;
        if(!coins) uCoins = 0;
        message.channel.send(user + " has " + uCoins + " coins");
    }
    };

module.exports.help = {
    name: "coins",
}
