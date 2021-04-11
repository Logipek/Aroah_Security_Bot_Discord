'use strict';
module.exports = async (client, messageDelete) => {
    if(messageDelete.author.bot) return
    client.db.query(`SELECT * FROM server WHERE serverID = '${messageDelete.guildID}'`, (err, chan) => {
        if (chan.length < 1) return
        if (chan[0].logs === 'no') return
        messageDelete.guild.channels.get(chan[0].logs).createMessage({
            embed: {
                color: 0xF14343,
                description: `**Author:** ${messageDelete.author.mention}\n**Channel:**${messageDelete.channel.mention}\n**Content:** \`\`${messageDelete.content}\`\``,
                author: {
                    name: "🛠️ Message Deleted",
                },
                footer: {
                    text: `Message ID ${messageDelete.id}`
                },
                timestamp: new Date(),
            }
        });
    })
}