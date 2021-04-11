'use strict';

const {green} = require('colors');


module.exports = (shard) => {
    shard.shards.forEach(s => {
        console.log(`${green('[Sharding]')} Shard ${s.id} is ready in as ${green(shard.user.username + "#" + shard.user.discriminator)} !`);
    })
};