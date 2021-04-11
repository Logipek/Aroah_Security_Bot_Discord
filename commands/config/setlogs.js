'use strict';

const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'setlogs',
            category: 'config',
            description: "This command is used to modify the log lounge!",
            usage: ['setlogs [mention channel]'],
            example: ['setlogs', 'setlogs #logs'],
            aliases: ['logs'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async (err, protect) => {
            if(!args[1]) {
                return message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${client.valide}️ **${message.author.mention} the current log lounge is in <#${protect[0].logs}>**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                })
            } else {
            if(!message.channelMentions) return message.channel.createMessage("no channel mentioned")
                client.db.query(`UPDATE server SET logs = '${message.channelMentions[0]}' WHERE serverID = '${message.guildID}'`)

                message.channel.createMessage({
                    embed: {
                        color: 0x2F3136,
                        description: `${client.valide}️ **${message.author.mention} The log lounge has been changed to: ${args[1]}**`,
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