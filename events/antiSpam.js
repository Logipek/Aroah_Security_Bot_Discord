'use strict';
const {autologs} = require('../function/logs');


module.exports = async (client, message) => {

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
        if((config.length < 1) || (config[0].antispam === "no")) {} else {
            if (!client.spam.get(message.author.id)) {
                client.spam.set(message.author.id, {
                    _id: message.author.id,
                    msg: 1,
                });

                function co() {
                    client.spam.remove(message.author);
                }

                setTimeout(co, 10000);
            } else {
                let mss = client.spam.get(message.author.id).msg + 1
                client.spam.set(message.author.id, {
                    id: message.author.id,
                    msg: mss
                })
            }


            if (client.spam.get(message.author.id).msg === config[0].maxspam) {
                message.author.getDMChannel().then(chan => chan.createMessage(`You're kicked from **${client.guilds.find(g => g.id === message.guildID).name}** for **SPAM**`));
                
                try {

                    if (config[0].securitylvl === "low") {
                        const filterr = msg => msg.author.id === message.author.id
                        await message.channel.purge(client.spam.get(message.author.id).msg, filterr)
                        message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `**${message.author.mention} spam is not allowed on this server.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    } else if (config[0].securitylvl === "medium") {

                        const filterr = msg => msg.author.id === message.author.id
                        await message.channel.purge(client.spam.get(message.author.id).msg, filterr)
                        await message.member.kick(`Spam in ${message.channel.name}`)
                        message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `**${message.author.mention} was kicked for spam.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                        
                        let user = message.author;
                        let type = "Kick for Spam"
                        let number = config[0].cases
                        let colors = 0xE78030
                        return autologs(client, message, user,type, number, colors);

                    } else if (config[0].securitylvl === "high") {

                        const filterr = msg => msg.author.id === message.author.id
                        await message.channel.purge(client.spam.get(message.author.id).msg, filterr)
                        await message.member.ban(6,`Spamming in ${message.channel.name}`)
                        message.channel.createMessage({
                            embed: {
                                color: 0x2F3136,
                                description: `**${message.author.mention} has been banned for spam.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                        let user = message.author;
                        let type = "Ban for Spam"
                        let number = config[0].cases
                        let colors = 0xEC3535
                        return autologs(client, message, user,type, number, colors);
                    } else return message.channel.createMessage({
                        embed: {
                            color: 0xE78030,
                            description: `**${message.author.mention} spam is not allowed on this server.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })

                } catch (err){
                    console.log(err)
                    message.channel.createMessage({
                        embed: {
                            color: 0xE78030,
                            description: `**${message.author.mention} spam is not allowed on this server.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })

                }
            }
        }
        })
        return;


}