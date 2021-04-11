'use strict';

const Command = require("../../structure/Command.js");

class Id extends Command {
    constructor() {
        super({
            name: 'id',
            category: 'mod',
            description: 'This command shows you the information of a punishment thanks to its id!',
            usage: 'id <punishments id>',
            example: ['id 25'],
            aliases: ['ids'],
            perms: 'manageMessages',
        });
    }


    async run(client, message, args, db) {

        if (!args[1]) {
            return message.channel.createMessage({
                embed: {
                    color: 0xF3FC00,
                    description: `${client.refused}️ **${message.author.mention} please enter an ID number.**`,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
        }

        client.db.query(`SELECT * FROM moderation WHERE server_id = '${message.guildID}' AND cases = '${args[1]}'`, async (err, cases) => {
            if (err) throw err;
            if (cases.length < 1) {
                return message.channel.createMessage({
                    embed: {
                        color: 0xF14343,
                        description: `${client.refused} **${message.author.mention} No ID found for ID number \`\`${args[1]}\`\`**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                })
            }
            let mod = await client.getRESTUser(cases[0].modd)
            let user = await client.getRESTUser(cases[0].user_id)
            message.channel.createMessage({
                embed: {
                    color: 0xFCF610,
                    description: (`**Member:** ${user.username}#${user.discriminator} (${user.id})\n**Action:** ${cases[0].actions}\n**Reason:** ${cases[0].reason}`),
                    author: {
                        name: mod.username,
                        icon_url: mod.avatarURL
                    },
                    footer: {
                        text: `ID ${cases[0].cases}`
                    }

                }
            })
        })
    }
}

module.exports = new Id;