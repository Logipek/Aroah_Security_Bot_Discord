'use strict';
module.exports = async (client, guild) => {
    client.db.query(`INSERT INTO server (serverID, logs, prefix, lang) VALUES ('${guild.id}', 'no', '.', 'en')`)
    client.db.query(`INSERT INTO config (serverID) VALUES ('${guild.id}')`)

        client.guilds.get("725324178324193282").channels.get("759774198926671902").createMessage({
            embed: {
                color: 0x22DB79,
                author: {
                    name: guild.name,
                    icon_url: guild.iconURL
                },
                description: `${client.green} | Thanks to  <@${guild.ownerID}> to welcome me on the server **${guild.name}** wich contains **${guild.memberCount}** members.\nI am now on **${client.guilds.size}** servers`,

                timestamp: new Date(),
            }
        });

}