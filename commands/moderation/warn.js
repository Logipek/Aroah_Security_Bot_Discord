'use strict';

const Command = require("../../structure/Command.js");
const {warnlogs} = require('../../function/logs');

class Warn extends Command {
    constructor() {
        super({
            name: 'warn',
            category: 'mod',
            description: 'This command warn server members!',
            usage: 'warn <@member> [raison]',
            example: ['warn @Louchetop Test'],
            aliases: ['warner'],
            perms: 'manageMessages',
        });
    }


    async run(client, message, args, db) {

        const membre = message.mentions
        let guildd = client.guilds.get(message.guildID)

        if (!membre[0]) return message.channel.createMessage({
            embed: {
                color: 0xF14343,
                description: `${client.refused}️ **${message.author.mention} mention the person to warn**`,
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
                description: `${client.refused} **${message.author.mention} you can't warn that person**`,
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
            client.db.query(`INSERT INTO moderation (server_id, user_id, reason, modd, cases, actions) VALUES ('${message.guildID}', '${membre[0].id}', '${reason}', '${message.author.id}', '${config[0].cases}', 'Warn')`)
            user.user.getDMChannel().then(chan => chan.createMessage({
                embed: {
                    color: 0xFCF610,
                    description: `***Server:*** ${guildd.name}\n***Moderator:*** ${message.author.username}\n***Action:*** Warn\n***Reason:*** ${reason}\n***ID number:*** ${config[0].cases}`,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    },
                }
            }))


            message.channel.createMessage({
                embed: {
                    color: 0x52FC6F,
                    description: `**${user.mention}** was warn by ${message.author.mention}. ID number \`\`${config[0].cases}\`\``,
                    author: {
                        name: message.author.username + '#' + message.author.discriminator,
                        icon_url: message.author.avatarURL
                    }
                }
            })
            if (config[0].logs === 'no') {
                return
            }
            ;
            let number = config[0].cases
            return warnlogs(client, message, user, reason, number);
        })
    }
}

module.exports = new Warn;