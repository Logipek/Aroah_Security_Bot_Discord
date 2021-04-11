module.exports = class Log {
    constructor(logger) {
        this.channel = logger.channel;
        this.type = logger.type;
        this.content = logger.content;
    }
}