'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')
class Userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'This command gives information about users!',
            usage: 'userinfo [@user]',
            example: ['userinfo', 'userinfo @user'],
            aliases: ['ui']
        });
    }

    async run(client, message, args) {
        moment.locale('fr')
        let membre
        if(!args[1]) membre = message.author;
        if(message.mentions[0]) membre = message.mentions[0]
        if((args[1]) && (!message.mentions[0])) try {
            await client.getRESTUser(args[1])
        } catch {
return message.channel.createMessage({
    embed: {
        color: 0xF14343,
        description: `<:n_:739464034063089704> **${message.author.mention} No user was found**`,
        author: {
            name: message.author.username + '#' + message.author.discriminator,
            icon_url: message.author.avatarURL
        }
    }
})
        }
        if((args[1]) && (!message.mentions[0])) membre = await client.getRESTUser(args[1])
        const ui = {
            color: 0x2F3136,
            title: `User statistics **${membre.username}#${membre.discriminator}**`,
            thumbnail: {
                url: membre.avatarURL
            },
            fields: [
                {
                    name: 'ID :',
                    value: membre.id
                },
                {
                    name: 'Created the :',
                    value: `${moment(membre.createdAt).format('dddd Do MMMM YYYY à HH:mm:ss')}`
                },
            ],
            footer: {
                text: `User information ${membre.username}`
            }
        };
        let gmember = message.guild.members.get(membre.id)
        if(gmember) {
            ui.fields.push({
                name: `Join the:`,
                value: moment.utc(message.member.joinedAt).format('dddd Do MMMM YYYY à HH:mm:ss'),
            });
        }
        message.channel.createMessage({
            embed: ui
        });

    }
}

module.exports = new Userinfo();