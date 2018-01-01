const should = require('should')
const checks = require('../lib/seo_checks')
const fs = require('fs');

describe('#checkWithRules', () => {
    it('returns number of img tags without alt attribute', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/good_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules)).equal(null);
            done();
          });
    });
});