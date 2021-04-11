'use strict';

const Command = require("../../structure/Command.js");

class Massban extends Command {
    constructor() {
        super({
            name: 'massban',
            category: 'mod',
            description: 'This order massively bans server members! ',
            usage: 'massban <@member> <@member2> <other member>',
            example: ['massban @Louchetop @Enil'],
            aliases: ['massifban'],
            perms: 'serverOwner',
            botperms: ['banMembers']
        });
    }


    async run(client, message, args, db) {

        let mentiont = message.mentions
        if(!mentiont[0]) return message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: `${client.refused}️ **${message.author.mention} Please mention all the users you want to ban at once.**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })
        if(mentiont.length > 10) return message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: `${client.refused}️ **${message.author.mention} You cannot ban more than 10 people at a time.**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })
        message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                title: "Ban in progress..."
            }
        }).then(async (msg) => {
            let embed = {
                color: 0x2F3136,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                footer: {
                    text: `Massive ban result`
                },
                fields: []
            };
            await message.mentions.forEach(async(member) => {



                try {
                    let mg = message.guild.members.get(member.id)
                    const roles = message.member.roles.map(id => mg.guild.roles.get(id));
                    const bot = mg.roles.map(id => mg.guild.roles.get(id));
                    let r = roles.sort((a, b) => a.position > b.position ? -1 : 1);
                    let b = bot.sort((a, b) => a.position > b.position ? -1 : 1);
                    if (!b[0]) b = 0
                    if (b[0]) b = b[0].position
                    if (!r[0]) r = 0
                    if (r[0]) r = r[0].position
                    if (b >= r || member.id === message.guild.ownerID) {
                        embed.fields.push({
                            name: client.refused + member.username + "#" + member.discriminator + " (" + member.id + ") ",
                            value: "Has not been banned because you do not have permission to ban this user."
                        });
                    } else {
                        await member.getDMChannel().then(chan => chan.createMessage({
                            embed: {
                                color: 0xF14343,
                                description: `***Server:*** ${message.guild.name}\n***Moderator:*** ${message.author.username}\n***Action:*** Massif Ban `,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        }))
                        mg.ban()

                        embed.fields.push({
                            name: client.valide + member.username + "#" + member.discriminator + " (" + member.id + ") ",
                            value: "Has been properly banned"
                        });

                    }
                }
                catch
                    {
                        embed.fields.push({
                            name: member.username + "#" + member.discriminator + " (" + member.id + ") ",
                            value: "Could not be banned, probably due to a lack of permission."
                        });
                    }

                    msg.edit({
                        embed: embed
                    });


            })
        })
    }
}
module.exports = new Massban;