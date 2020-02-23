const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
let coins = require("./coinsystem.json");
let xp = require("./experience.json");
let lang = require("./lang.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let color = botconfig.color;
let role = botconfig.joinrole;
let welcome = botconfig.welcome
let leave = botconfig.leave
let coinCooldown = new Set();
const coinCooldownSeconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
  console.log("Couldn't find commands.");
  return;
  }

  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded.`);
  bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("-help | Update", {type: "WATCHING"});

});


//Join message
bot.on('guildMemberAdd', member => {
let logChannel = member.guild.channels.find('name', '︱📔︱welcome');

  let logEmbed = new Discord.RichEmbed()
  .setDescription(member.user.username + " je ``usao`` na server. (" + member.user.id + ")")
  .setColor(color)
  .setFooter("Igrac se pridruzio", member.user.displayAvatarURL)
  .setTimestamp()
  logChannel.send(logEmbed);
})
bot.on('guildMemberRemove', member => {
let logChannel = member.guild.channels.find('name', '︱📔︱welcome');

  let logEmbed = new Discord.RichEmbed()
  .setDescription(member.user.username + " je ``izasao`` sa servera. (" + member.user.id + ")")
  .setFooter("Igrac je izasao", member.user.displayAvatarURL)
  .setColor(color)
  .setTimestamp()
  logChannel.send(logEmbed);
})

//Gives Role on Join
bot.on("guildMemberAdd", async member => {
  const botconfig = require("./botconfig.json");
  let onjoinrole = botconfig.joinrole;
  let role = member.guild.roles.find("name")(role);
    member.addRole(role);
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }


//Coins
  if(!coins[message.author.id]){
  coins[message.author.id] = {
  coins: 0
  };
  }
  let coinAmt = Math.floor(Math.random() * 1) + 10;
  let baseAmt = Math.floor(Math.random() * 1) + 10;
  if(coinAmt === baseAmt){
  if(!coinCooldown.has(message.author.id)){
  coins[message.author.id] = {
  coins: coins[message.author.id].coins + coinAmt
  };
  fs.writeFile("./coinsystem.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
  });
  coinCooldown.add(message.author.id);
  setTimeout(function(){
  coinCooldown.delete(message.author.id);
  }, coinCooldownSeconds*1000)
  }}


//Experience
  let xpAdd = Math.floor(Math.random() * 10) + 50;
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
  };
  }
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 5000;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;
  let lvlup = new Discord.RichEmbed()
  .setAuthor(`Congrats ${message.author.username}`, message.author.displayAvatarURL)
  .setTitle("You have leveled up!")
  .setThumbnail("https://i.imgur.com/lXeBiMs.png")
  .setColor(color)
  .addField("New Level", curlvl + 1);
  message.channel.send(lvlup);
  }
  fs.writeFile("./experience.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.member.hasPermission("ADMINISTRATOR"))






  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
 })

bot.login(botconfig.token);
