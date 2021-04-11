'use strict';

const Command = require("../../structure/Command.js");
class Ping extends Command {
    constructor() {
        super({
            name: 'server',
            category: 'utils',
            description: 'This command gives the bot latency!',
            usage: 'ping',
            example: ['ping'],
            aliases: ['latance']
        });
    }
    async run(client, message) {
    const servers = message.client.guilds.cache.array().map(guild => {
        return `\`${guild.id}\` - **${guild.name}** - \`${guild.members.cache.size}\` members`;
    });

    const embed = new MessageEmbed()
        .setTitle('Server List')
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

    if (servers.length <= 10) {
        const range = (servers.length == 1) ? '[1]' : `[1 - ${servers.length}]`;
        message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(servers.join('\n')));
    } else {
        new ReactionMenu(message.client, message.channel, message.member, embed, servers);
    }
    }
}