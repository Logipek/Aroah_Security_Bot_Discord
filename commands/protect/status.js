'use strict';

const Command = require("../../structure/Command.js");

class Status extends Command {
    constructor() {
        super({
            name: 'status',
            category: 'security',
            description: 'Cette commande permet de verifier le status de sécurité du serveur !',
            usage: ['status'],
            example: ['status'],
            aliases: ['serverinfo', 'si'],
            perms: 'administrator',
        });
    }


    async run(client, message, args, db) {
        client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async (err, protect) => {
            let antispam = client.red
            let antiraid = client.red
            let raidmode = client.yellow
            let securitylvl = client.red
            let maxban = client.red
            let maxkick = client.red
            let maxspam = client.red
            let dlinks = client.yellow
            if(protect[0].antispam === "yes") antispam = client.green
            if(protect[0].antiraid === "yes") antiraid = client.green
            if(protect[0].raidmode === "on") raidmode = client.green
            if(protect[0].securitylvl === "high") securitylvl = client.green
            if(protect[0].securitylvl === "medium") securitylvl = client.yellow
            if(protect[0].maxban < 3) maxban = client.green
            if(protect[0].maxkick < 3) maxkick = client.green
            if(protect[0].maxspam < 5) maxspam = client.green
            if(protect[0].dlinks === "yes") dlinks = client.green

            message.channel.createMessage({
                embed: {
                    title: `**Security status of the server ${message.guild.name}**`,
                    color: 0x2F3136,
                    thumbnail: {
                        url: message.guild.iconURL
                    },
                    fields: [
                        {
                            name: `**AntiSpam:** \`\`${protect[0].antispam}\`\``,
                            value: antispam
                        },
                        {
                            name: `**AntiRaid:** \`\`${protect[0].antiraid}\`\``,
                            value: antiraid
                        },
                        {
                            name: `**RaidMode:** \`\`${protect[0].raidmode}\`\``,
                            value: raidmode
                        },
                        {
                            name: `**Security Level:** \`\`${protect[0].securitylvl}\`\``,
                            value: securitylvl
                        },
                        {
                            name: `**Max ban:** \`\`${protect[0].maxban}ban/30s\`\``,
                            value: maxban
                        },
                        {
                            name: `**Max kick:** \`\`${protect[0].maxkick}kick/30s\`\``,
                            value: maxkick
                        },
                        {
                            name: `**Max spam:** \`\`${protect[0].maxspam}messages/10s\`\``,
                            value: maxspam
                        },
                        {
                            name: `**AntiPub Discord:** \`\`${protect[0].dlinks}\`\``,
                            value: dlinks
                        },
                    ]
                }
            })
        })
    }
}
module.exports = new Status;