'use strict';
const {autologs} = require('../function/logs');

module.exports = async(client, message) => {

        let user = message.guild.members.get(client.user.id)
        const roles = message.member.roles.map(id => user.guild.roles.get(id));
        const bot = user.roles.map(id => user.guild.roles.get(id));
        let r = roles.sort((a, b) => a.position > b.position ? -1 : 1);
        let b = bot.sort((a, b) => a.position > b.position ? -1 : 1);
        if(!b[0]) b = 0
        if(b[0]) b = b[0].position
        if(!r[0]) r = 0
        if(r[0]) r = r[0].position
        if (r >= b || message.author.id === message.guild.ownerID) return

    client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async(err, config) => {
        if ((config.length < 1) || (config[0].dlinks === "no")) return
        const de = message.content.replace(/\n/g, ' ').split(/ +/g);
        for (let f = 0; f < de.length; f++) {
            if (de[f].match('discord.com/invite/') !== null || de[f].match('discordapp.com/invite/') !== null || de[f].match('discord.gg') !== null) {
                message.delete()

                message.channel.createMessage({
                    embed: {
                        color: 0xF14343,
                        description: `<:n_:739464034063089704> **${message.author.mention} discord links are prohibited on this server.**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL,
                        }
                    }
                });
                if (config[0].securitylvl === "low") {

                    await client.db.query(`UPDATE config SET cases = '${config[0].cases + 1}' WHERE serverID = '${message.guildID}'`)
                    client.db.query(`INSERT INTO moderation (server_id, user_id, reason, modd, cases, actions) VALUES ('${message.guildID}', '${message.author.id}', 'Self-moderation (AntiLink Discord)', '725322713375309886', '${config[0].cases}', 'Warn')`)
                    message.author.getDMChannel().then(chan => chan.createMessage({
                        embed: {
                            color: 0xFCF610,
                            description: `***Server:*** ${message.guild.name}\n***Mod:*** Aroah (Self-moderation)\n***Action:*** Warn\n***Reason:*** Self-moderation (AntiLink Discord)\n***ID number:*** ${config[0].cases}`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL,
                            }
                        }
                    }))


                } else if(config[0].securitylvl === "medium") {
                    await client.db.query(`UPDATE config SET cases = '${config[0].cases + 1}' WHERE serverID = '${message.guildID}'`)
                    client.db.query(`INSERT INTO moderation (server_id, user_id, reason, modd, cases, actions) VALUES ('${message.guildID}', '${message.author.id}', 'Self-moderation (AntiLink Discord)', '725322713375309886', '${config[0].cases}', 'Kick')`)
                    await message.author.getDMChannel().then(chan => chan.createMessage({
                        embed: {
                            color: 0xE78030,
                            description: `***Server:*** ${message.guild.name}\n***Mod:*** Aroah (Self-moderation)\n***Action:*** Kick\n***Reason:*** Self-moderation (AntiLink Discord)\n***ID number:*** ${config[0].cases}`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL,
                            }
                        }
                    }))
                    message.member.kick("AntiLink Discord")
                    let user = message.author;
                    let type = "Kick Pour Pub"
                    let number = config[0].cases
                    let colors = 0xE78030
                    return autologs(client, message, user,type, number, colors);

                } else if(config[0].securitylvl === "high") {
                    await client.db.query(`UPDATE config SET cases = '${config[0].cases + 1}' WHERE serverID = '${message.guildID}'`)
                    client.db.query(`INSERT INTO moderation (server_id, user_id, reason, modd, cases, actions) VALUES ('${message.guildID}', '${message.author.id}', 'Self-moderation (AntiLink Discord)', '725322713375309886', '${config[0].cases}', 'Ban')`)
                    await message.author.getDMChannel().then(chan => chan.createMessage({
                        embed: {
                            color: 0xEC3535,
                            description: `***Server:*** ${message.guild.name}\n***Mod:*** Aroah (Self-moderation)\n***Action:*** Ban\n***Reason:*** Self-moderation (AntiLink Discord)\n***ID number:*** ${config[0].cases}`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL,
                            }
                        }
                    }))
                    message.member.ban(0, "AntiLink Discord")
                    let user = message.author;
                    let type = "Ban For Pub"
                    let number = config[0].cases
                    let colors = 0xEC3535
                    return autologs(client, message, user,type, number, colors);
                } else return

                }
        }
    })
    return;
}