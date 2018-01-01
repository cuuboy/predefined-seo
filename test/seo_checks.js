const should = require('should');
const checks = require('../lib/seo_checks');
const fs = require('fs');

describe('#checkWithRules', () => {
    it('returns null when html file is good', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/good_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules).content()).equal(null);
            done();
          });
    });

    it('detects missing meta', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];

        fs.readFile(__dirname + '/fixtures/missing_meta_html.html',function (err, file) {
            if (err) {
              throw err; 
            }
            
            should(checks.checkWithRules(file.toString(), rules).content()).
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
            
            should(checks.checkWithRules(file.toString(), rules).content()).equal(null);
            done();
          });
    });
});

describe('#checkHtmlFile', () => {
    it('returns null when html file is good', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];
        
        checks.checkHtmlFile(__dirname + '/fixtures/good_html.html', rules).
            then(function(result) {
                should(result.content()).equal(null);
            }).done(done);
    });

    it('returns error when html file violates rules', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'];
        
        checks.checkHtmlFile(__dirname + '/fixtures/missing_meta_html.html', rules).
            then(function(result) {
                should(result.content()).equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
            }).done(done);
    });
});

describe('#checkReadableStream', () => {
    it('returns null when source html file to stream is good', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'],
            htmlSourceStream = fs.createReadStream(__dirname + '/fixtures/good_html.html');

        checks.checkReadableStream(htmlSourceStream, rules).
            then(function(result) {
                should(result.content()).equal(null);
            }).done(done);
    });

    it('returns error when source html file to stream violates rules', done => {
        var rules = ['checkImg', 'checkLink', 'checkHead', 'checkStrong', 'checkH1'],
            htmlSourceStream = fs.createReadStream(__dirname + '/fixtures/missing_meta_html.html');

        checks.checkReadableStream(htmlSourceStream, rules).
            then(function(result) {
                should(result.content()).equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
            }).done(done);
    });
});