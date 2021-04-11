'use strict';
const Duration = require('humanize-duration')
module.exports = async (client, message) => {
    if (message.channel.type === 1) return;

    const data = message.content;
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        const args = data.slice(config[0].prefix.length).trim().split(/ +/g);
        if (message.author.bot) return;

        client.emit("antiSpam", (client, message));
        client.emit("antiPub", (client, message));

        if (data.startsWith(config[0].prefix)) {

            const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
            if (!command) return;

            if (command.perms !== 'everyone') {
                if (command.perms === "serverOwner") {
                    if (message.author.id !== message.guild.ownerID) return message.channel.createMessage({
                        embed: {
                            color: 0xF14343,
                            description: `${client.refused} **${message.author.mention} you must be the owner of the server to run this command.**`,
                            author: {
                                name: message.author.username + '#' + message.author.discriminator,
                                icon_url: message.author.avatarURL
                            }
                        }
                    })
                } else if (!message.member.permission.has(command.perms)) return message.channel.createMessage({
                    embed: {
                        color: 0xF14343,
                        description: `${client.refused} **${message.author.mention} you must have permission \`\`${command.perms}\`\` to execute this command.**`,
                        author: {
                            name: message.author.username + '#' + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        }
                    }
                });
            }
            if (command.botperms[0]) {

                command.botperms.forEach(perm => {
                    if (!client.guilds.find(g => g.id === message.guildID).members.find(u => u.id === client.user.id).permission.has(perm)) {
                        return message.channel.createMessage({
                            embed: {
                                color: 0xF14343,
                                description: `${client.refused} **${message.author.mention} it seems that my permissions are insufficient on the server so that I can correctly execute this command, add me the permission \`\`${command.botperms}\`\`.**`,
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator,
                                    icon_url: message.author.avatarURL
                                }
                            }
                        });

                    }
                })
            }


            try {
                if(client.cooldown.get(message.author.id)) {
                    return message.channel.createMessage({
                        embed: {
                            color: 0x2F3136,
                            description: `**Cooldown: \`\`${Duration(client.cooldown.get(message.author.id) - Date.now(), { units: ['s'], round: true})}\`\`**`
                        }
                    })
                } else {
                    command.run(client, message, args)
                    client.cooldown.set(message.author.id, Date.now() + 5000)
                    setTimeout(() => {
                        client.cooldown.delete(message.author.id);
                    }, 5000);
                }
            } catch (err) {
               console.log(err);
            }
        }
    })
};