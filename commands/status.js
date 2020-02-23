const Discord = require("discord.js");
const rp = require("request-promise");
const botconfig = require("../botconfig.json");
const color = botconfig.color;
const statusconfig = require("../statusconfig.json");
const serverone = statusconfig.GamemodeNameOne;
const urlone = statusconfig.GamemodeOneURL;
const queryone = statusconfig.GamemodeOneQueryURL;
const server1url= statusconfig.Gamemode1url;
const servername = statusconfig.ServerName
///add your servers here with both ip and port do not use ":"
const exp1url = `${server1url}`
const servers = [
     ///make sure not to use the same names  - change the links to match your ip and port - change the links to match your server ip and queryport
    {"name":`${serverone}`,"url":`${urlone}`, "queryURL":`${queryone}`},
]
module.exports.run = async (bot, message, args) => {
    if(args.length >= 1){
        let players;
        let total;
        let found = false;
        for(let i = 0; i < servers.length; i++){
            if(servers[i].name.toLowerCase() == args[0].toLowerCase()){
                found = true;
                await rp(servers[i].queryURL).then((html) => {
                    const json = JSON.parse(html);
                    if(json.error) players = "Offline";
                    else {
                        total = json.Players
                        if(!json.Playerlist) players = "None"
                        else players = json.Playerlist.join("\n")
                    }
                })
            }
        }
        if(!found) return message.reply("That is not a valid server!")
        //Embed for playerlist
        let embed = await new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`${servername} - ${args[0]}\n\n**Players Online:** \`\`${total}\`\`\n\n${players}`);
        
        await message.channel.send(embed);
    } else {
        let description = "";
        let rdesc = "Server Status\n\n"
        rp(`${server1url}`).then((html) => {
            const json = JSON.parse(html);
            rdesc += "**Players Online:** ``" + json.players.online + "``\n\n";
        });

        for(let i = 0; i < servers.length; i++){
        await rp(servers[i].url).then((html) => {
        const json = JSON.parse(html);
        if(json.error) description += `**${servers[i].name}:**\`\`Offline\`\``;
        else {
        const playerCount = json.players.online;
        description += `**${servers[i].name}:**\`\`${playerCount} players\`\`\n`;
                }
            })
        }
        let embed = new Discord.RichEmbed()
        .setColor(color)
        .setFooter("Player and Server Status", bot.user.avatarURL)
        .setDescription(rdesc + description)
        message.channel.send(embed);
    }
}
module.exports.help = {
    name: "status"
}