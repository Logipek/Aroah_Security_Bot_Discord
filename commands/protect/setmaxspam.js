'use strict';

const Command = require("../../structure/Command.js");

class Maxspam extends Command {
    constructor() {
        super({
            name: 'setmaxspam',
            category: 'security',
            description: 'This command allows you to modify the level of spam message detection (users who send massively messages over 10 seconds)!',
            usage: ['setmaxspam [arguments]'],
            example: ['setmaxspam', 'setmaxspam 10'],
            aliases: ['maxspam'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, protect) => {
            if(!args[1]) {
                let status = client.red
                if(protect[0].maxraid <= 8) status = client.yellow
                if(protect[0].maxraid <= 6) status = client.green
                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${status} **${message.author.mention} The antispam is fixed at \`\`${protect[0].maxspam}\`\`messages/10secondes**`,
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
                if(number <= 8) status2 = client.yellow
                if(number <= 6) status2 = client.green
                client.db.query(`UPDATE config SET maxspam = '${number}' WHERE serverID = '${message.guildID}'`)

                message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${status2} **${message.author.mention} The antispam has just been modified \`\`${number}\`\`messages/10secondes**`,
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
module.exports = new Maxspam;