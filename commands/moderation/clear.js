'use strict';

const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'clear',
            category: 'mod',
            description: 'This command clears messages on the server!',
            usage: 'clear <number>',
            example: ['clear 350'],
            aliases: ['purge', 'delete'],
            perms: 'manageMessages',
            botperms: ['manageMessages']
        });
    }


    async run(client, message, args, db) {


                    if (!args[1]) {
                        return message.channel.createMessage({
                            embed: {
                                color: 0xF14343,
                                description: `${client.refused} **${message.author.mention} please indicate the number of messages to delete**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        })
                    }
        await message.delete()
                    await message.channel.purge(args[1]).then(async (count) => {
                        await message.channel.createMessage({
                            embed: {
                                color: 0x52FC6F,
                                description: `${client.green} **${message.author.mention} I deleted ${count} messages.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        }).then(m => {
                            setTimeout(function (){
                                m.delete()
                            }, 5000)
                        })
                    })
    }
}
module.exports = new Clear;