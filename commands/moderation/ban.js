-'use strict';

const Command = require("../../structure/Command.js");
const {banlogs} = require('../../function/logs');

class Ban extends Command {
    constructor() {
        super({
            name: 'ban',
            category: 'mod',
            description: 'This command bans server members!',
            usage: 'ban <@member> [raison]',
            example: ['ban @member Test'],
            aliases: ['bannir', 'banner'],
            perms: 'banMembers',
            botperms: ['banMembers']
        });
    }


    async run(client, message, args, db) {


        const membre = message.mentions
        let guildd = client.guilds.get(message.guildID)

        if (!membre[0]) return message.channel.createMessage({
            embed: {
                color: 0xF14343,
                description: `${client.refused}️ **${message.author.mention} mention the person banned**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })

        let user = message.guild.members.get(client.user.id)
        const roles = message.member.roles.map(id => user.guild.roles.get(id));
        const bot = user.roles.map(id => user.guild.roles.get(id));
        let r = roles.sort((a, b) => a.position > b.position ? -1 : 1);
        let b = bot.sort((a, b) => a.position > b.position ? -1 : 1);
        const mention = message.guild.members.get(membre[0].id)
        const mentionrole = mention.roles.map(id => user.guild.roles.get(id))
        let m = mentionrole.sort((a, b) => a.position > b.position ? -1 : 1)
        if(!m[0]) m = 0
        if(m[0]) m = m[0].position
        if(!b[0]) b = 0
        if(b[0]) b = b[0].position
        if(!r[0]) r = 0
        if(r[0]) r = r[0].position
        if (m >= b || m >= r || membre[0].id === message.guild.ownerID) return message.channel.createMessage({
            embed: {
                color: 0xF14343,
                description: `${client.refused} **${message.author.mention} you can't ban this person**`,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                }
            }
        })


                    let reason = args.slice(2).join(" ");
                    if (!reason) reason = "No reasons given"


                    client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, (err, config) => {
                        if (err) throw err;
                        client.db.query(`UPDATE config SET cases = '${config[0].cases + 1}' WHERE serverID = '${message.guildID}'`)
                        client.db.query(`INSERT INTO moderation (server_id, user_id, reason, modd, cases, actions) VALUES ('${message.guildID}', '${membre[0].id}', '${reason}', '${message.author.id}', '${config[0].cases}', 'Ban')`)
                        membre[0].getDMChannel().then(chan => chan.createMessage({
                            embed: {
                                color: 0xF14343,
                                description: `***Server:*** ${guildd.name}\n***Moderator:*** ${message.author.username}\n***Action:*** Ban\n***Reason:*** ${reason}\n***ID number:*** ${config[0].cases}`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })).then(() =>
                            message.guild.banMember(membre[0].id, 0, reason)
                        ).catch(err => console.log(err))


                        message.channel.createMessage({
                            embed: {
                                color: 0x52FC6F,
                                description: `**${membre[0].mention}** was banned by ${message.author.mention}. ID number ` + "``" + config[0].cases + "``",
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                        if (config[0].logs === 'no') {
                            return
                        }
                        let number = config[0].cases
                        return banlogs(client, message, user, reason, number);

                    })
    }
}


module.exports = new Ban;