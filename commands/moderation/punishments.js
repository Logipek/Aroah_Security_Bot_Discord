'use strict';

const Command = require("../../structure/Command.js");

class Punishments extends Command {
    constructor() {
        super({
            name: 'punishments',
            category: 'mod',
            description: 'This command shows you the punishments of a member!',
            usage: 'punishments [member]',
            example: ['punishments', 'punishments @Louchetop'],
            aliases: ['punish'],
            perms: 'manageMessages',
        });
    }

    async run(client, message, args, db) {

        const member = message.mentions[0] || message.author;
        const punishments = {
            color: 0x5291DD,
            author: {
                name: message.author.username + '#' + message.author.discriminator,
                icon_url: message.author.avatarURL
            },
            footer: {
                text: `Sanction page of ${member.username}`
            },
            fields: []
        };
        client.db.query(`SELECT * FROM moderation WHERE user_id = '${member.id}' AND server_id = '${message.guildID}'`, async (err, res) => {
            if (err) throw err;
            if (res.length < 1) {
                return message.channel.createMessage({
                    embed: {
                        color: 0x5291DD,
                        description: `**${message.author.mention} has no sanctions**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        },
                        footer: {
                            text:  `Sanction page of ${member.username}`
                        }
                    }
                })
            } else {
                for (let i = 0; i < res.length; i++) {
                    let cases = res[i].cases
                    let reason = res[i].reason
                    let action = res[i].actions
                    punishments.fields.push({
                        name: `ID: #${cases} - ${action}`,
                        value: reason
                    });
                }
                message.channel.createMessage({
                    embed: punishments
                });
            }
        })
    }
}
module.exports = new Punishments;