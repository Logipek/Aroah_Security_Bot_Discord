'use strict';

const { token, support } = require('./config.json'),
 { Client, Collection } = require('eris'),
  { readdirSync } = require('fs'),
    { join } = require("path"),
    { green, red, blue } = require('colors');
const Eris = require('eris')
const  { createConnection } = require('mysql')
require('pluris')(Eris);
class Class extends Client {
    constructor(token) {
        super(token, {messageLimit: 15, restMode: true});
        this.bot = this;
        this.config = require('./config.json');
        this.prefix = '!';
        this.db = createConnection({
            host: "",
            user: "",
            password: "",
            database: "",
        });
        this.spam = new Collection();
        this.joins = new Collection();
        this.bans = new Collection();
        this.kicks = new Collection();
        this.cooldown = new Map;
        this.support = support;
        this.green  = "<:green:758019709168779314>";
        this.yellow = "<:yellow:758019734481403905>";
        this.red = "<:red:758019751627980920>";
        this.valide = "<:valide:758914017326006308>";
        this.refused = "<:refused:758914036565409812>";
        try {
            this.launch().then(() => { console.log(blue('All is launched, connecting to Discord...')); })
        } catch (e) {
            throw new Error(e)
        }
        this.connect(token);
    }

    async launch() {
        console.log(green('[Start]') + " Starting the bot");
        this.commands = new Collection();
        this._databeConnect();
        this._commandsHandler();
        this._eventsHandler();
    }

    _commandsHandler() {
        let count = 0;
        const folders = readdirSync(join(__dirname, "commands"));
        for (let i = 0; i < folders.length; i++) {
            const commands = readdirSync(join(__dirname, "commands", folders[i]));
            count = count + commands.length;
            for(const c of commands){
                try {
                    const command = require(join(__dirname, "commands", folders[i], c));
                    this.commands.set(command.name, command);
                } catch (error) {
                    console.log(`${red('[Commands]')} Failed to load command ${c}: ${error.stack || error}`)
                }
            }
        }
        console.log(`${green('[Commands]')} Loaded ${this.commands.size}/${count} commands`)
    }

    _eventsHandler() {
        let count = 0;
        const files = readdirSync(join(__dirname, "events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "events", e));
                this.on(fileName, file.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, "events", e))];
            } catch (error) {
                throw new Error(`${red('[Events]')} Failed to load event ${e}: ${error.stack || error}`)
            }
        });
        console.log(`${green('[Events]')} Loaded ${count}/${files.length} events`)
    }
    _databeConnect() {
        this.db.connect(function (err) {
            if (err) throw err;
            console.log(green('[Database]') + " Connected at " + blue("MySQL"));
        })
    }

}

module.exports = new Class(token);

