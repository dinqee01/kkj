const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
      if (!message.channel.nsfw) return message.reply("NSFW komanda ne radi u NSFW kanalu!");
  else{
  randomPuppy('ass')
            .then(url => {
                const embed = new Discord.RichEmbed()

                  .setAuthor("Tu je tvoj ass :tongue:")
                .setImage(url)
                .setColor("random")
                .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp ()
    return message.channel.send({ embed });
            })
  }
}
module.exports.help = {
    name: "ass",
  aliases: []
}