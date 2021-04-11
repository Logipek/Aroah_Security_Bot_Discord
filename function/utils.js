    langFile = require('../lang.json');
module.exports =  {
    translate: function(lang, text) {
        return langFile[text][lang];
    }
}