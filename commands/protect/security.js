'use strict';

const Command = require("../../structure/Command.js");
class securitylvl extends Command {
    constructor() {
        super({
            name: 'security',
            category: 'security',
            description: 'This command allows you to modify the security level of your server!',
            usage: ['security [arguments]'],
            example: ['security', 'security low', 'security medium', 'security high', 'security no'],
            aliases: ['securitylvl'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {

        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, chan) => {

                if (!args[1]) {
                    if(chan[0].securitylvl === 'no') {
                        message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.red} **${message.author.mention} server security is not activated! to activate it, please use the command \`\`securitylvl <low | medium | high>\`\`.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    } else {
                        let em = client.red
                        if(chan[0].securitylvl === "medium") em = client.yellow
                        if(chan[0].securitylvl === "high") em = client.green
                        message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${em} **${message.author.mention} server security is in ${chan[0].securitylvl} ! to modify the security level, please use the command \`\`securitylvl <low | medium | high | no>\`\`.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    }
                } else if (args[1] === 'no') {
                    client.db.query(`UPDATE config SET securitylvl = 'no' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.red} **${message.author.mention} server security has been disabled.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                } else if (args[1] === 'low') {
                    client.db.query(`UPDATE config SET securitylvl = 'low' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.red} **${message.author.mention} server security is upgraded \`\`low\`\`.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                }else if (args[1] === 'medium') {
                        client.db.query(`UPDATE config SET securitylvl = 'medium' WHERE serverID = '${message.guildID}'`)
                        return message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `${client.yellow} **${message.author.mention} server security is upgraded \`\`medium\`\`.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                }else if (args[1] === 'high') {
                    client.db.query(`UPDATE config SET securitylvl = 'high' WHERE serverID = '${message.guildID}'`)
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `${client.green} **${message.author.mention} server security is upgraded \`\`high\`\`.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                }else {
                    return message.channel.createMessage({
                        embed: {
                            color: 0xF3FC00,
                            description: `${client.refused}️ **${message.author.mention} the argument entered is not correct, to modify the security level, please use the command \`\`securitylvl <low | medium | high | no> \`\`.**`,
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
module.exports = new securitylvl;