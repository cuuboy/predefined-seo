const should = require('should')
const checks = require('../lib/seo_checks')
const fs = require('fs');

describe('#checkWithRules', () => {
    it('returns null when html file is good', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/good_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules)).equal(null);
            done();
          });
    });

    it('detects missing meta', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/missing_meta_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules)).
                equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
            done();
          });
    });

    it('does report error if user skip <head> checks', done => {
        var rules = ['checkImg', 'checkLink', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/missing_meta_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules)).equal(null);
            done();
          });
    });
});

describe('#checkHtmlFile', () => {
    it('returns null when html file is good', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];
        
        checks.checkHtmlFile(__dirname + '/fixtures/good_html.html', rules).
            then(function(errors) {
                should(errors).equal(null);
            }).done(function() {
                done();
            });
    });

    it('returns error when html file violates rules', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];
        
        checks.checkHtmlFile(__dirname + '/fixtures/missing_meta_html.html', rules).
            then(function(errors) {
                should(errors).equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
            }).done(function() {
                done();
            });
    });
});