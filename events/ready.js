'use strict';
const {green} = require('colors')
const {translate} = require("../function/utils");


module.exports = (client) => {

    setInterval(function () {
        let statuses = [
            `.help | V2.4`,
        ]
        let statuts = statuses[Math.floor(Math.random() * statuses.length)];
        client.editStatus('dnd',{
            name: statuts,
            type: 3
        })

    }, 30000);

    client.guilds.forEach(guild => {
        client.db.query(`SELECT * FROM server WHERE serverID = '${guild.id}'`, async(err, config) => {
            if(config.length < 1) {
                client.db.query(`INSERT INTO server (serverID, logs, prefix, lang) VALUES ('${guild.id}', 'no', '-', 'en')`)
                console.log(`${guild.name} A été ajoutée a la bade de donnée serveur.`)
            }
        })
        client.db.query(`SELECT * FROM config WHERE serverID = '${guild.id}'`, async(err, config) => {
            if(config.length < 1) {
                client.db.query(`INSERT INTO config (serverID) VALUES ('${guild.id}')`)
                console.log(`${guild.name} A été ajoutée a la bade de donnée config.`)
            }
        })
    })
};