'use strict';
const moment = require('moment')
const {antiraidlogs} = require('../function/logs');

module.exports = async(client, user, member) => {
	if((user.id === "727543937962868738") || (user.id === "264445053596991498") || (user.id === "446425626988249089") || (user.id === "450100127256936458")|| (user.id === "501017909389295616")) return
    if (!client.guilds.find(g => g.id === user.id).members.find(u => u.id === client.user.id).permission.has("viewAuditLogs")) return 
    client.db.query(`SELECT * FROM config WHERE serverID = '${user.id}'`, async(err, config) => {
        if (config.length < 1) {
        } else if (config[0].maxkick === 0) {
        } else {
            member.guild.getAuditLogs(1).then(async (audit) => {
                if(audit.entries[0].actionType !== 20) return
                let userr = audit.entries[0].user
                if(userr.id === client.user.id) return
                function co() {
                    client.kicks.remove(userr);
                }
                if (!client.kicks.get(userr.id)) {
                    client.kicks.set(userr.id, {
                        _id: userr.id,
                        membre: [],
                        kicknumber: 0,

                    });
                    client.kicks.get(userr.id).membre.push(member)
                    client.kicks.get(userr.id).kicknumber += 1
                    setTimeout(co, 10000);

                } else {
                    client.kicks.get(userr.id).membre.push(member)
                    client.kicks.get(userr.id).kicknumber += 1
                }

                if (client.kicks.get(userr.id).kicknumber === config[0].maxkick) {
                    try {

                        moment.locale('fr')
                        let own = await client.getRESTUser(user.ownerID)

                        if (config[0].securitylvl === "low") {
                            const banner = {
                                color: 0xF3FC00,
                                title: '⚠ Your server is possibly doing this kick raid. These individuals were kicked within 10 seconds:',
                                author: {
                                    name: member.guild.name,
                                    icon_url: member.guild.iconURL,
                                },
                                fields: []
                            };

                            client.kicks.get(userr.id).membre.forEach(async (use) => {
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
                                title: `⚠ Your server is possibly doing this kick raid. These individuals were kicked within 10 seconds (kick from responsible user ${userr.username}):`,
                                author: {
                                    name: user.name,
                                    icon_url: user.iconURL,
                                },
                                fields: []
                            };

                            client.kicks.get(userr.id).membre.forEach(async (use) => {
                                banner.fields.push({
                                    name: `${use.username} (${use.username}#${use.discriminator} | ${use.id}).`,
                                    value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                                });
                            })

                            own.getDMChannel().then(chan => chan.createMessage({
                                embed: banner
                            }));
                            member.guild.kickMember(userr.id, 0, "Anti Kick Raid")


                        } else if (config[0].securitylvl === "high") {

                            const banner = {
                                color: 0xF3FC00,
                                title: `⚠ Your server is possibly doing this kick raid. These individuals were kicked within 10 seconds (ban of the user responsible ${userr.username}):`,
                                author: {
                                    name: user.name,
                                    icon_url: user.iconURL,
                                },
                                fields: []
                            };
                            member.guild.banMember(userr.id, 0, "Anti Kick Raid")

                            client.kicks.get(userr.id).membre.forEach(async (use) => {
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