'use strict';
module.exports = async (client, guild) => {
    client.db.query(`DELETE FROM config WHERE serverID = '${guild.id}'`)
    client.db.query(`DELETE FROM server WHERE serverID = '${guild.id}'`)

    client.guilds.get("725324178324193282").channels.get("759774198926671902").createMessage({
        embed: {
            color: 0xEB5254,
            author: {
                name: guild.name,
                icon_url: guild.iconURL
            },
            description: `${client.red} | <@${guild.ownerID}> removed me from the server **${guild.name}** wich contains **${guild.memberCount}** members.\nI am now on **${client.guilds.size}** servers`,
            timestamp: new Date(),
        }
    });

}