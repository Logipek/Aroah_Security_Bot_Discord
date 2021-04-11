'use strict';

const Command = require("../../structure/Command.js");
class Invite extends Command {
    constructor() {
        super({
            name: 'invite',
            category: 'utils',
            description: 'This command gives you a link to add the bot!',
            usage: 'invite',
            example: ['invite'],
            aliases: ['add']
        });
    }

    async run(client, message) {
        message.channel.createMessage({
            embed: {
                color: 0x2F3136,
                description: "Oh do you want to add the bot? Thank you very much for supporting us! For that, here is your link:\n**[Click here](https://discord.com/oauth2/authorize?client_id=725322713375309886&scope=bot&permissions=8)**"
            }
        })

    }
}

module.exports = new Invite;