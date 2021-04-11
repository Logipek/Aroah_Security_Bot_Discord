'use strict';

const Command = require("../../structure/Command.js");
const { loadavg, cpus, totalmem } = require('os');

class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
            category: 'utils',
            description: 'This command gives the stats of the bot!',
            usage: 'stats',
            example: ['stats'],
            aliases: ['botinfo','botstats', 'bi']
        });
    }

    async run(client, message) {
        let cpuCores = cpus().length;

                     function duration(ms) {
                            const sec = Math.floor((ms / 1000) % 60).toString()
                            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
                            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
                            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
                            return `${days.padStart(1, '0')} day(s), ${hrs.padStart(2, '0')} hour(s), ${min.padStart(2, '0')} min(s), ${sec.padStart(2, '0')} secondes.`
                        }


        await message.channel.createMessage({
                                embed: {
                                    title: client.user.username,
                                    color: 0x2F3136,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: client.user.avatarURL,
                                        text: client.user.username
                                    },
                                    thumbnail: {
                                        url: client.user.avatarURL
                                    },
                                    fields: [
                                        {
                                            name: "Number of server",
                                            value: "Server:" + `\`\`${client.guilds.size}\`\``,
                                            inline: true
                                        },
                                        {
                                            name: "Processor used",
                                            value: `${(loadavg()[0] / cpuCores).toFixed(2)}% / 100%`,
                                            inline: true
                                        },
                                        {
                                            name: "RAM used",
                                            value: `${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`,
                                            inline: true
                                        },
                                        {
                                            name: "Uptime",
                                            value: `${duration(client.uptime)}`,
                                            inline: true
                                        },
                                        {
                                            name: "Developers",
                                            value: `<@294716504036081664>\n<@733396325411979335>`,
                                            inline: true
                                        },
                                        {
                                            name: "Ping",
                                            value: `${Math.sqrt(((new Date() - message.timestamp)/(5*2))**2)} ms`,
                                            inline: true
                                        }
                                    ]
                                }
                            })
    }
}

module.exports = new Stats;