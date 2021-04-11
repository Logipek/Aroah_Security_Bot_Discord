'use strict';
const moment = require('moment')
const {antijoinlogs} = require('../function/logs');

module.exports = async (client,member) => {
let guild = member.guild

    let user = guild.members.find(u => u.id === member.id);
    client.db.query(`SELECT * FROM config WHERE serverID = '${guild.id}'`, async(err, config) => {
        if(config.length < 1) return
        if(config[0].raidmode === 'on') {
            await user.user.getDMChannel().then(chan => chan.createMessage({
                    embed: {
                        color: 0xF14343,
                        description: `<:n_:739464034063089704> **you were kicked by ${member.guild.name} because the server has enabled raidmode. please try again later.**`,
                        author: {
                            name: guild.name,
                            icon_url: guild.iconURL,
                        }
                    }
                })
            )
            user.kick("Raid Mode Active")

            return;
        }
            if(config[0].antiraid === "no") return
        function co() {
            client.joins.remove(member.guild);
        }

            if (!client.joins.get(member.guild.id)) {
                client.joins.set(member.guild.id, {
                    _id: member.guild.id,
                    membre: [],
                    joinsn: 0,

                });
                client.joins.get(member.guild.id).membre.push(member)
                client.joins.get(member.guild.id).joinsn += 1
                setTimeout(co, 10000);

            } else {
                
                client.joins.get(member.guild.id).membre.push(member)
                client.joins.get(member.guild.id).joinsn += 1
            }



            if (client.joins.get(member.guild.id).joinsn === config[0].maxraid) {
                try {

                    moment.locale('fr')
                    let own = await client.getRESTUser(member.guild.ownerID)

                    if (config[0].securitylvl === "low") {
                        const raideur = {
                            color: 0xF3FC00,
                            title: '⚠ Your server is possibly raid. These individuals are likely to be bots:',
                            author: {
                              name: member.guild.name,
                              icon_url: member.guild.iconURL,
                            },
                            fields: []
                        };

                        client.joins.get(member.guild.id).membre.forEach(async (use) => {
                            raideur.fields.push({
                                name: `${use.user.username} (${use.user.username}#${use.user.discriminator} | ${use.user.id}).`,
                                value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                            });
                        })

    own.getDMChannel().then(chan => chan.createMessage({
        embed: raideur
    }));


                    } else if (config[0].securitylvl === "medium") {
                        if(config[0].autoraidmode === 'yes') client.db.query(`UPDATE config SET raidmode = 'on' WHERE serverID = '${member.guild.id}'`)

                        const raideur = {
                            color: 0xF3FC00,
                            title:'⚠ Your server is possibly doing this raid. These individuals are likely to be bots, so anti-raid kicked users and set raidmode:',
                            author: {
                                name: member.guild.name,
                                icon_url: member.guild.iconURL,

                            },
                            fields: []
                        };
                        client.joins.get(member.guild.id).membre.forEach(async (use) => {
                            let type = "Kick For Suspicion Of Raid"
                            let colors = 0xEC3535
                            antijoinlogs(client, use,type, colors);
                            use.kick("AntiRaid")
                            raideur.fields.push({
                                name: `${use.user.username} (${use.user.username}#${use.user.discriminator} | ${use.user.id}).`,
                                value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                            });
                        })
                        own.getDMChannel().then(chan => chan.createMessage({
                            embed: raideur
                        }));



                    } else if (config[0].securitylvl === "high") {

                        if(config[0].autoraidmode === 'yes') client.db.query(`UPDATE config SET raidmode = 'on' WHERE serverID = '${member.guild.id}'`)

                        const raideur = {
                            color: 0xF3FC00,
                            title:'⚠ Your server is possibly doing this raid. These individuals are likely to be bots, so anti-raid has banned users and set raidmode:',
                            author: {
                                name: member.guild.name,
                                icon_url: member.guild.iconURL,

                            },
                            fields: []
                        };

                        client.joins.get(member.guild.id).membre.forEach(async (use) => {
                            use.ban(0, "AntiRaid");
                            raideur.fields.push({
                                name: `${use.user.username} (${use.user.username}#${use.user.discriminator} | ${use.user.id}).`,
                                value: `Account created on: ${moment.utc(use.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                            });
                            let user = use.user;
                            let type = "Ban For Suspicion Of Raid";
                            let colors = 0xEC3535;
                            return antijoinlogs(client, user,type, colors);

                        })
                        own.getDMChannel().then(chan => chan.createMessage({
                            embed: raideur
                        }));



                    } else {
                        let user = client.user;
                        let type = "ANTI-RAID failed";
                        let colors = 0xEC3535;
                        return antiraidlogs(client, message, user,type, colors);
                    }
                } catch (err){
                    let user = client.user;
                    let type = "ANTI-RAID failed";
                    let colors = 0xEC3535;
                    return antiraidlogs(client, message, user,type, colors);

                }
            }

    })
    return;


}