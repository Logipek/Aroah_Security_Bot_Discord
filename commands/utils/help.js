'use strict';

const Command = require("../../structure/Command.js");
class Ping extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'utils',
            description: 'This command will show you the commands present on the bot!',
            usage: ['help [nom de commande]'],
            example: ['help', 'help ping'],
            aliases: ['h', 'aide']
        });
    }

    async run(client, message, args) {
        if (!args[1]) {
            await message.channel.createMessage({
                embed: {
                    color: 0xEC6C2E,
                    title: `:pushpin: **List of commands**`,
                    description: `To have the description and use of a command, do:\n.help <command name>\nThe <> are not to be included in the order!`,
                    thumbnail: {
                        url: client.user.avatarURL
                    },
                    fields: [
                        {
                            name: "🛡️ Protection",
                            value: client.commands.filter((command) => command.category === "security").map((command) => `\`${command.name}\``).join(', '),
                        },
                        {
                            name: "⚙️️ Configuration",
                            value: client.commands.filter((command) => command.category === "config").map((command) => `\`${command.name}\``).join(', '),
                        },
                        {
                            name: "🛠️ Modération",
                            value: client.commands.filter((command) => command.category === "mod").map((command) => `\`${command.name}\``).join(', '),
                        },
                        {
                            name: "📯 Utility",
                            value: client.commands.filter((command) => command.category === "utils").map((command) => `\`${command.name}\``).join(', '),
                        },

                        {
                            name: '🔗 Other',
                            value: `**[Add Aroah](https://discord.com/oauth2/authorize?client_id=725322713375309886&scope=bot&permissions=8) • [Upvote](https://top.gg/bot/725322713375309886) • [Support](${client.support})**`
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            })
        } else if (args[1]) {
            const command = client.commands.get(args[1]);
            if (!command) return message.channel.createMessage(`This is not a valid order`);
            let send = "";
            command.example.forEach(use => {
                send += '!' + use + '\n'
            })
            let sendA = "";

            command.aliases.forEach(use => {
                sendA += '!' + use + '\n'
            })

            await message.channel.createMessage({
                embed: {
                    color: 0xEC6C2E,
                    description: `**:pushpin: Using the command \`\`${args[1]}\`\`**\n<> Are required arguments \ nThe [] are optional arguments`,
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: client.user.username
                    },
                    timestamp: new Date(),
                    fields: [
                        {
                            name: "Description",
                            value: !command.description ? 'No description' : command.description,
                        },
                        {
                            name: "Use",
                            value: !command.usage ? "No use" : '!' + command.usage,
                        },
                        {
                            name: "Examples",
                            value: !command.example ? `No examples` : send,
                        },
                        {
                            name: "Aliases",
                            value: !command.aliases[0] ? `No aliases` : sendA,
                        },
                        {
                            name: "Permission required",
                            value: command.perms,
                        }]
                }
            })
        }

    }
}

module.exports = new Ping;