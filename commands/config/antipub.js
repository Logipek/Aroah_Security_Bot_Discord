'use strict';

const Command = require("../../structure/Command.js");
class Antipub extends Command {
    constructor() {
        super({
            name: 'antipub',
            category: 'config',
            description: "This command is used to activate / deactivate the anti advertisement!",
            usage: ['antipub [arguments]'],
            example: ['antipub', 'antipub yes', 'antipub no'],
            aliases: ['ap', 'antidlinks'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {

            client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, chan) => {

                if (!args[1]) {
                    if (chan[0].dlinks === 'yes') {
                        client.db.query(`UPDATE config SET dlinks = 'no' WHERE serverID = '${message.guildID}'`)
                        return message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.yellow} **${message.author.mention} the anti-invitation has been deactivated.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    } else {
                        client.db.query(`UPDATE config SET dlinks = 'yes' WHERE serverID = '${message.guildID}'`)
                        return message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.green} **${message.author.mention} the anti-invitation has been activated.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    }
                } else if (args[1] === 'yes') {
                    client.db.query(`UPDATE config SET dlinks = 'yes' WHERE server = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.green} **${message.author.mention} the anti-invitation has been activated.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                } else if (args[1] === 'no') {
                    client.db.query(`UPDATE config SET dlinks = 'no' WHERE server = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.yellow} **${message.author.mention} the anti-invitation has been activated.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                } else {
                    client.db.query(`UPDATE config SET dlinks = 'no' WHERE server = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0xF3FC00,
                            description: `${client.refused}️ **${message.author.mention} it looks like there is an error. please type the command again with the argument yes or no**`,
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
module.exports = new Antipub;