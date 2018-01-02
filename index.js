const checks = require('./lib/seo_checks.js');
module.exports = {
    checkHtmlFile: function(filePath, rules) {
        return checks.checkHtmlFile(filePath, rules);
    },
    checkReadableStream: function(rs, rules) {
        return checks.checkReadableStream(rs, rules);
    },
    start: function() {
        return checks.start();
    }
}