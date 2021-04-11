'use strict';

const Command = require("../../structure/Command.js");

class Maxban extends Command {
    constructor() {
        super({
            name: 'setmaxban',
            category: 'security',
            description: 'Cette commande permet de modifier le niveau de detection de raid baThis command allows to modify the detection level of raid ban (user who ban massively over 10 seconds)!n (utilisateur qui ban massivement sur 10 secondes) !',
            usage: ['setmaxban [arguments]'],
            example: ['setmaxban', 'setmaxban 10'],
            aliases: ['maxban'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, protect) => {

            if(!args[1]) {
                let status = client.red
                if(protect[0].maxban <= 5) status = client.yellow
                if(protect[0].maxban <= 2) status = client.green
            return message.channel.createMessage({
                embed: {
                    color: 0x2F3136,
                    description: `${status} **${message.author.mention} The current configuration of max ban is \`\`${protect[0].maxban}\`\`**`,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
        } else {
            if(isNaN(args[1])) return message.channel.createMessage({
                embed: {
                    color: 0xF14343,
                    description: `${client.refused}️ **${message.author.mention} \`\`${args[1]}\`\` is not a number**`,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
            let number = Math.round(args[1])
                let status2 = client.red
                if(number <= 5) status2 = client.yellow
                if(number <= 2) status2 = client.green
            client.db.query(`UPDATE config SET maxban = '${number}' WHERE serverID = '${message.guildID}'`)

            return message.channel.createMessage({
                embed: {
                    color: 0x2F3136,
                    description: `${status2} **${message.author.mention} The configuration of max ban has been changed to: \`\`${number}\`\`**`,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
        }
        })
    }
}
module.exports = new Maxban;