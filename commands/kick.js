const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("**Can't find user!**");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTARTOR")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("ADMINISTARTOR")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick Info")
    .setColor("#FF0000")
    .addField("Kickovan", `${kUser} with ID ${kUser.id}`)
    .addField("Kick Od", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kick U", message.channel)
    .addField("Razlog", kReason);

    let incidentchannel = message.guild.channels.find(`name`, "︱❌︱punishments");
    if(!incidentchannel) return message.channel.send("Can't find ︱❌︱punishments channel.");

    message.guild.member(kUser).kick(kReason);
    incidentchannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
