'use strict';

const {red} = require('colors')

module.exports = (client,error) => {
	
    console.log(`${red('[Error]')} An error has occured\n${error.stack || error}`);

};