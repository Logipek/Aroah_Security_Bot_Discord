'use strict';
const moment = require('moment')
module.exports = async(client, guild, user) => {
    let us = guild.members.get(client.user.id)
    if (!client.guilds.find(g => g.id === guild.id).members.find(u => u.id === client.user.id).permission.has("viewAuditLogs")) return
    client.db.query(`SELECT * FROM config WHERE serverID = '${guild.id}'`, async(err, config) => {
        if (config.length < 1) {
        } else if (config[0].maxraid === 0) {
        } else {
            guild.getAuditLogs(1).then(async (audit) => {
                if(audit.entries[0].actionType !== 22) return
                let userr = audit.entries[0].user
                const roles = guild.members.get(userr.id).roles.map(id => us.guild.roles.get(id));
                const bot = us.roles.map(id => us.guild.roles.get(id));
                let r = roles.sort((a, b) => a.position > b.position ? -1 : 1);
                let b = bot.sort((a, b) => a.position > b.position ? -1 : 1);
                if ((r[0].position >= b[0].position) || (userr.id === client.user.id)) return
                function co() {
                    client.bans.remove(userr);
                }
                if (!client.bans.get(userr.id)) {
                    client.bans.set(userr.id, {
                        _id: userr.id,
                        membre: [],
                        bannumber: 0,

                    });
                    client.bans.get(userr.id).membre.push(user)
                    client.bans.get(userr.id).bannumber += 1
                    setTimeout(co, 10000);

                } else {
                    client.bans.get(userr.id).membre.push(user)
                    client.bans.get(userr.id).bannumber += 1
                }

                if (client.bans.get(userr.id).bannumber === config[0].maxban) {
                    try {

                        moment.locale('fr')
                        let own = await client.getRESTUser(guild.ownerID)

                        if (config[0].securitylvl === "low") {
                            const banner = {
                                color: 0xF3FC00,
                                title: '⚠ Your server is possibly in the process of being banned. These individuals were banned within 10 seconds:',
                                author: {
                                    name: guild.name,
                                    icon_url: guild.iconURL,
                                },
                                fields: []
                            };

                            client.bans.get(userr.id).membre.forEach(async (use) => {
                                banner.fields.push({
                                    name: `${use.username} (${use.username}#${use.discriminator} | ${use.id}).`,
                                    value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                                });
                            })

                            own.getDMChannel().then(chan => chan.createMessage({
                                embed: banner
                            }));


                        } else if (config[0].securitylvl === "medium") {

                            const banner = {
                                color: 0xF3FC00,
                                title: '⚠ Your server is possibly in the process of banning. These individuals were banned within 10 seconds (unban done):',
                                author: {
                                    name: guild.name,
                                    icon_url: guild.iconURL,
                                },
                                fields: []
                            };

                            client.bans.get(userr.id).membre.forEach(async (use) => {
                                guild.unbanMember(use.id,"Mass Ban Detected")
                                banner.fields.push({
                                    name: `${use.username} (${use.username}#${use.discriminator} | ${use.id}).`,
                                    value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                                });
                            })

                            own.getDMChannel().then(chan => chan.createMessage({
                                embed: banner
                            }));


                        } else if (config[0].securitylvl === "high") {

                            const banner = {
                                color: 0xF3FC00,
                                title: `⚠ Your server is possibly in the process of being banned. These individuals were banned within 10 seconds (unban done + user ban ${userr.username}):`,
                                author: {
                                    name: guild.name,
                                    icon_url: guild.iconURL,
                                },
                                fields: []
                            };
                            guild.banMember(userr.id, 0, "Anti Ban Raid")
                            client.bans.get(userr.id).membre.forEach(async (use) => {
                                guild.unbanMember(use.id,"Mass Ban Detected")

                                banner.fields.push({
                                    name: `${use.username} (${use.username}#${use.discriminator} | ${use.id}).`,
                                    value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                                });
                            })

                            own.getDMChannel().then(chan => chan.createMessage({
                                embed: banner
                            }));

                        }
                    } catch (err){
                        console.log(err)
                    }

                }
            })
        }
    })

}