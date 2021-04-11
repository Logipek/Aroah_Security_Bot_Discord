'use strict';

module.exports = async(client, guild, member) => {
    if(member.bot) return
let guildd = guild
let memberr = member
    client.emit("antiRaid", (client,guildd,memberr))
}