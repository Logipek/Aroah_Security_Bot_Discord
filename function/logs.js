exports.warnlogs = async(client, message, user, reason, number) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: 0xFCF610,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username}#${user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: `Warn`,
                    },
                    {
                        name: '**Reason :**',
                        value: reason,
                    },
                    {
                        name: '**ID :**',
                        value: number,
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL,
                },
            }
        })
    })
}
exports.banlogs = async(client, message, user, reason, number) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: 0xEC3535,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username}#${user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: `Ban`,
                    },
                    {
                        name: '**Reason :**',
                        value: reason,
                    },
                    {
                        name: '**ID :**',
                        value: number,
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL,
                },
            }
        })
    })
}
exports.kicklogs = async(client, message, user, reason, number) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color:  0xE78030,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username}#${user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: `Kick`,
                    },
                    {
                        name: '**Reason :**',
                        value: reason,
                    },
                    {
                        name: '**ID :**',
                        value: number,
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL,
                },
            }
        })
    })
}
exports.unban = async(client, message, bannedMember, reason) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color:  0x30E779,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: bannedMember.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${bannedMember.username}#${bannedMember.discriminator} (${bannedMember.id})`
                    },
                    {
                        name: '**Action :**',
                        value: `Unban`,
                    },
                    {
                        name: '**Reason :**',
                        value: reason,
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL,
                },
            }
        })
    })
}

exports.removecase = async(client, message, user, mod, argss) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: 0xFCF610,
                author: {
                    name: message.author.username + '#' + message.author.discriminator,
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: mod.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username + "#" + user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: `Remove ID`,
                    },
                    {
                        name: '**ID number :**',
                        value: argss,
                    }
                ],
                timestamp: new Date(),
            }
        })

    })
}

exports.autologs = async(client, message, user, type, number, colors) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: colors,
                author: {
                    name: client.user.username + '#' + client.user.discriminator + " (Self-moderation)",
                    icon_url: client.user.avatarURL
                },
                thumbnail: {
                    url: client.user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username + "#" + user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: type,
                    },
                    {
                        name: '**ID number :**',
                        value: number,
                    }
                ],
                timestamp: new Date(),
            }
        })

    })
}
exports.antiraidlogs = async(client, message, user, type, colors) => {
    client.db.query(`SELECT * FROM server WHERE serverID = '${message.guildID}'`, async(err, config) => {
        await message.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: colors,
                author: {
                    name: client.user.username + '#' + client.user.discriminator + " (Self-moderation)",
                    icon_url: client.user.avatarURL
                },
                thumbnail: {
                    url: client.user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${user.username + "#" + user.discriminator} (${user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: type,
                    },
                ],
                timestamp: new Date(),
            }
        })

    })
}
exports.antijoinlogs = async(client, use, type, colors) => {

    client.db.query(`SELECT * FROM server WHERE serverID = '${use.guild.id}'`, async(err, config) => {
        console.log(config)
        await use.guild.channels.get(config[0].logs).createMessage({
            embed: {
                color: colors,
                author: {
                    name: client.user.username + '#' + client.user.discriminator + " (Self-moderation)",
                    icon_url: client.user.avatarURL
                },
                thumbnail: {
                    url: client.user.avatarURL,
                },
                fields: [
                    {
                        name: '**User :**',
                        value: `${use.user.username + "#" + use.user.discriminator} (${use.user.id})`
                    },
                    {
                        name: '**Action :**',
                        value: type,
                    },
                ],
                timestamp: new Date(),
            }
        })

    })
}