const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const botconfig = require("../botconfig.json")
exports.run = (bot, message, args) => {

      let prefix = botconfig.prefix;
  if (!message.content.startsWith(prefix)) return;
  
    if (!message.channel.nsfw) return message.channel.send(":underage: NSFW Command | Odi u NSFW kanal kako bi mogao koristiti ovu komandu.")

    var subreddits = [
        'milf',
        'amateur_milfs',
        'NotTeenNotMilf'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 2))];

    randomPuppy(sub)
        .then(url => {
            request.get(url).then(r => {
                fs.writeFile(`milf.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./milf.jpg`)
            })
        })
}
module.exports.help = {
  name:"milf"
}