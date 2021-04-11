'use strict';

const Command = require("../../structure/Command.js");
class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            category: 'utils',
            description: 'This command gives the bot latency!',
            usage: 'ping',
            example: ['ping'],
            aliases: ['latance']
        });
    }

    async run(client, message) {
        message.channel.createMessage(`Pong :ping_pong: \`${Math.sqrt(((new Date() - message.timestamp)/(5*2))**2)} ms\``).then(async (msg)=> {
            let debut = Date.now()
            client.db.query(`SELECT * FROM config WHERE serverID = '${message.guildID}'`, async(err) => {
let fin = Date.now()
                let time = fin - debut
                msg.edit(msg.content + `\nDb Pong:ping_pong: \`${Math.sqrt(((time)/(5*2))**2)}ms\``)
        })
        })

    }
}

module.exports = new Ping;