'use strict';

const Command = require("../../structure/Command.js");
const {unban} = require('../../function/logs');

class UnbanId extends Command {
    constructor() {
        super({
            name: 'unbanid',
            category: 'mod',
            description: 'This command allows you to deban a user from your server thanks to his discord id!',
            usage: 'unbanid <id>',
            example: ['unbanid 294716504036081664'],
            aliases: ['unban'],
            perms: 'banMembers',
            botperms: ['banMembers']
        });
    }


    async run(client, message, args, db) {

        try {
            await client.getRESTUser(args[1])
        } catch {
            return message.channel.createMessage({
                embed: {
                    color: 0xF3FC00,
                    description: `${client.refused}️ **${message.author.mention} I can't find any user with this id**`,
                    author: {
                        name: message.author.username + "#" + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
        }
let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reasons given"
        const bannedMember = await client.getRESTUser(args[1])
        message.guild.getBan(bannedMember.id).then(async (userBan) => {

            await message.guild.unbanMember(bannedMember.id, "Unban By " + message.author.username)
            message.channel.createMessage({
                embed: {
                    color: 0x52FC6F,
                    description: `${client.valide} **${bannedMember.username + "#" + bannedMember.discriminator} just unban from the server.**`,
                    author: {
                        name: message.author.username + "#" + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
            return unban(client, message, bannedMember, reason);

        }).catch(err => {

                message.channel.createMessage({
                    embed: {
                        color: 0xF3FC00,
                        description: `${client.refused}️ **${message.author.mention} I couldn't find the user in the bans.**`,
                        author: {
                            name: message.author.username + "#" + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                })

                return

        })
    }
}
module.exports = new UnbanId;