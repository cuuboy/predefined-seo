const checks = require('../lib/seo_checks');

checks.start().fromFile(__dirname + '/example.html').then(function(seoCheck) {
    return seoCheck.checkImg().checkLink().checkHead().checkStrong().checkH1().toConsole();
})