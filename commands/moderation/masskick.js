'use strict';

const Command = require("../../structure/Command.js");

class Masskick extends Command {
    constructor() {
        super({
            name: 'masskick',
            category: 'mod',
            description: 'This command massively kicks server members!',
            usage: 'massbkick <@member> <@member2> <other member>',
            example: ['masskick @Louchetop @Enil'],
            aliases: ['massifkick'],
            perms: 'serverOwner',
            botperms: ['kickMembers']
        });
    }


    async run(client, message, args, db) {
        if(message.author.id !== message.guild.ownerID) return message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: `${client.refused}️ **${message.author.mention} you do not have permission to execute this command.*`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })
        let mentiont = message.mentions
        if(!mentiont[0]) return message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: `${client.refused}️ **${message.author.mention} Please mention all the users you want to kick at once.**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })
        if(mentiont.length > 10) return message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: `${client.refused}️ **${message.author.mention} You cannot kick more than 10 people at a time.-**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })
        message.channel.createMessage({
    embed: {
        title: "Kick in progress...",
        color: 0x2F3136
    }
}).then(async (msg) => {
            let embed = {
                color: 0x2F3136,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                footer: {
                    text: `Massive kick result`
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
                        value: "Was not kicked because you do not have permission to kick this user."
                    });
                } else {
                    await member.getDMChannel().then(chan => chan.createMessage({
                        embed: {
                            color: 0xF14343,
                            description: `***Server:*** ${message.guild.name}\n***Moderator:*** ${message.author.username}\n***Action:*** Massif Kick `,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    }))
                    mg.kick()

                    embed.fields.push({
                        name: client.valide + " " + member.username + "#" + member.discriminator + " (" + member.id + ") ",
                        value: "Has been kicked correctly"
                    });
                }
    } catch (e){
                console.log(e)
                embed.fields.push({
                    name: client.refused + " " + member.username + "#" + member.discriminator + " (" + member.id + ") ",
                    value: "Couldn't be kicked, probably had to a lack of permission."
                });
    }
            msg.edit({
                embed: embed
            });
})
    })
    }
}
module.exports = new Masskick;