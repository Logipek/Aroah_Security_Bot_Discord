'use strict';

const Command = require("../../structure/Command.js");

class Maxkick extends Command {
    constructor() {
        super({
            name: 'setmaxkick',
            category: 'security',
            description: 'This command allows to modify the level of detection of raid kick (user who kick massively over 10 seconds)!',
            usage: ['setmaxkick [arguments]'],
            example: ['setmaxkick', 'setmaxkick 10'],
            aliases: ['maxkick'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, protect) => {
            if(!args[1]) {
                let status = client.red
                if(protect[0].maxkick <= 5) status = client.yellow
                if(protect[0].maxkick <= 2) status = client.green
                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${status} **${message.author.mention} The current max kick configuration is \`\`${protect[0].maxkick}\`\`**`,
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
                client.db.query(`UPDATE config SET maxkick = '${number}' WHERE serverID = '${message.guildID}'`)

                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${status2} **${message.author.mention} The max kick configuration has been changed to: \`\`${number}\`\`**`,
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
module.exports = new Maxkick;