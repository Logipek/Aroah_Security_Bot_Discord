'use strict';

const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'setprefix',
            category: 'config',
            description: "This command is used to modify the bot prefix!",
            usage: ['setprefix [nouveau prefix]'],
            example: ['setprefix', 'setprefix /'],
            aliases: ['prefix', 'sp'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async (err, protect) => {
            if(!args[1]) {
                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${client.valide}️ **${message.author.mention} the current prefix is \`\`${protect[0].prefix}\`\`**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                })
            } else if (args[1].startsWith === ['<@', '@everyone', '@here']) {
                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${client.refused}️ **${message.author.mention} you cannot prefix a mention**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                })
            } else {
                client.db.query(`UPDATE server SET prefix = '${args[1]}' WHERE serverID = '${message.guildID}'`)

                message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${client.valide}️ **${message.author.mention} The prefix has been changed to: \`\`${args[1]}\`\`**`,
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
module.exports = new Clear;