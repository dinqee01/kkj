const Discord = module.require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

//console.log(args[0]);// user
//console.log(args[1]);// role
//console.log(args[2]);//time

  if(message.member.hasPermission("ADMINISTARTOR")) {
            let member2 = message.mentions.members.first();
            if(!member2) return message.reply(":x: " + "| You need to mention a user/member!");

            let muted = message.mentions.roles.first();
            if(!muted) return message.reply(":x: " + `| There is no such role!`);
            
            let time2 = args[2];
            if(!time2) {
              member2.addRole(muted.id);
              message.channel.send(member2 + ` you have been given the permanent role: ` + muteRole2.name);
            }else {
              member2.addRole(muted.id);
              message.channel.send(member2 + ` you have been given the role: ` + muteRole2.name + ` for: ${ms(ms(time2), {long: true})}`);

              setTimeout(function(){
                member2.removeRole(muted.id);
                message.channel.send(member2 + ` you role has been taken off of you your glory lasted: ${ms(ms(time2), {long: true})}`)

              }, ms(time2));

              };
              }else {
                return message.reply(":x: " + "| You Don't have permissions !")
              };
}

module.exports.help = {
    name: "mute"
}