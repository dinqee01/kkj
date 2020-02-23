const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let pEmbed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('Pong!')
        .addField('Ms' , `${Math.round(bot.ping)} ms`, false);
         message.channel.send(pEmbed);
}


module.exports.help = {
  name: "ping"
}
