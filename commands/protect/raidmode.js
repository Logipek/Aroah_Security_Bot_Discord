'use strict';

const Command = require("../../structure/Command.js");
class Raidmode extends Command {
    constructor() {
        super({
            name: 'raidmode',
            category: 'security',
            description: "This command is used to activate / deactivate the raidmode!",
            usage: ['raidmode [arguments]'],
            example: ['raidmode', 'raidmode on', 'raidmode off'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {

        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, chan) => {

                if (!args[1]) {
                    if (chan[0].raidmode === 'on') {
                        client.db.query(`UPDATE config SET raidmode = 'off' WHERE serverID = '${message.guildID}'`)
                        return message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.yellow} **${message.author.mention} the raid mode has been deactivated.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    } else {
                        client.db.query(`UPDATE config SET raidmode = 'on' WHERE serverID = '${message.guildID}'`)
                        return message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.green} **${message.author.mention} the raid mode has been activated.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    }
                } else if (args[1] === 'on') {
                    client.db.query(`UPDATE config SET raidmode = 'on' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.green} **${message.author.mention} the raid mode has been activated**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                } else if (args[1] === 'off') {
                    client.db.query(`UPDATE config SET raidmode = 'off' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.yellow} **${message.author.mention} the raid mode has been deactivated.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                }else {
                    client.db.query(`UPDATE config SET raidmode = 'off' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.refused}️ **${message.author.mention} it looks like there is an error. please type the command again**`,
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
module.exports = new Raidmode;