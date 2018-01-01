const should = require('should');
const fs = require('fs');
const resultExports = require('../lib/result_exports');

describe('#exportToFile', () => {
    it('writes file correctly', done => {
        var testString = 'This is a test string',
            testFilePath = __dirname + '/test_file_in_result_export.txt';

        resultExports.load(testString).toFile(testFilePath).then(function() {
            fs.readFile(testFilePath, function (err, file) {
                if (err) {
                    throw err; 
                }
                should(file.toString()).equal(testString);
                done();
            });
        }).done(function() {
            fs.unlink(testFilePath);
        });
    });
});