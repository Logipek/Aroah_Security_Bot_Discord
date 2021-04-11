'use strict';

const Command = require("../../structure/Command.js");
const {removecase} = require('../../function/logs');

class Removecase extends Command {
    constructor() {
        super({
            name: 'removecase',
            category: 'mod',
            description: 'This command will allow you to remove a punishment from a member!',
            usage: 'removecase <punishments id>',
            example: ['removecase 25'],
            aliases: ['rc'],
            perms: 'manageMessages',
        });
    }

    async run(client, message, args, db) {
        if (!args[1]) {
            return message.channel.createMessage({
                embed: {
                    color: 0xF14343,
                    description: `${client.refused} **${message.author.mention} please enter the number of an ID to delete**`,
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
            const filterr = msg => msg.author.id === message.author.id

            message.channel.createMessage({
                content:`${message.author.mention} Are you sure you want to withdraw this punishment? (answer yes / no)`,
                embed: {
                    color: 0xFCF610,
                    description: `**Member:** ${user.username}#${user.discriminator} (${user.id})\n**Action:** ${cases[0].actions}\n**Reason:** ${cases[0].reason}`,
                    author: {
                        name: mod.username + '#' + mod.discriminator,
                        icon_url: mod.avatarURL
                    },
                    footer: {
                        text: `ID number ${args[1]}`
                    }
                }
            }).then(channel => { //logs
                message.channel.awaitMessages({
                    filter: filterr,
                    count: 1,
                }).then(collected => {
                    collected.collected.forEach(res => {
                        if((res.content === "yes") || (res.content === "yes")) {
                            client.db.query(`DELETE FROM moderation WHERE server_id = '${message.guild.id}' AND cases = '${args[1]}'`)
                            message.channel.createMessage({
                                embed: {
                                    color: 0x52FC6F,
                                    description: `${client.valide} **${message.author.mention} punishment number \`\`${args[1]}\`\` has been correctly removed to ${user.mention}.**`,
                                    author: {
                                        name: message.author.username + '#' + message.author.discriminator,
                                        icon_url: message.author.avatarURL
                                    }
                                }
                            })
                        } else if((res.content === "no") || (res.content === "no")) {
                            return message.channel.createMessage({
                                embed: {
                                    color: 0xF14343,
                                    description: `${client.refused} **${message.author.mention} punishment number ${args[1]} was not removed from ${user.mention}**`,
                                    author: {
                                        name: message.author.username + '#' + message.author.discriminator,
                                        icon_url: message.author.avatarURL
                                    }
                                }
                            })
                        }
                    })
                    let argss = args[1]

                    return removecase(client, message, user, mod, argss);

                    })
                })
            })

    }
}
module.exports = new Removecase;
