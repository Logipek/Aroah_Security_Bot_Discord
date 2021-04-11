'use strict';

const Command = require("../../structure/Command.js");

class Maxraid extends Command {
    constructor() {
        super({
            name: 'setmaxraid',
            category: 'security',
            description: 'This command allows you to modify the level of detection of raid join (users who join massively over 10 seconds)!',
            usage: ['setmaxraid [arguments]'],
            example: ['setmaxraid', 'setmaxraid 10'],
            aliases: ['maxraid'],
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
                        description: `${status} **${message.author.mention} The maximum number of people who can join in an interval of 10 seconds is fixed at \`\`${protect[0].maxraid}\`\`**`,
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
                if(number <= 9) status2 = client.yellow
                if(number <= 7) status2 = client.green
                client.db.query(`UPDATE config SET maxraid = '${number}' WHERE serverID = '${message.guildID}'`)

                message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${status2} **${message.author.mention} The maximum number of people who can join in a 10-second interval has been changed to \`\`${number}\`\`**`,
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
module.exports = new Maxraid;