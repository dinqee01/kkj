const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("**Can't find user!**");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTARTOR")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("ADMINISTARTOR")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Info")
    .setColor("#FF0000")
    .addField("Banovan", `${bUser} with ID ${bUser.id}`)
    .addField("Banned Od", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned U", message.channel)
    .addField("Vreme", message.createdAt)
    .addField("Razlog", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "︱❌︱punishments");
    if(!incidentchannel) return message.channel.send("Can't find ︱❌︱punishments channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
