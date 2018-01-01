const predefinedRules = require('./predefined_rules')
const Q = require('q');
const fs = require('fs');

var checkWithRules = function(doc, rules) {
    var errors = [];
    
    rules.forEach(rule => {
        var ruleFunc = predefinedRules[rule];
        if (undefined == ruleFunc) {
            errors.push('Rule [' + rule + '] undefined.');
            return;
        }
        var result = ruleFunc(doc);

        if (result != null) {
            errors.push(result);
        }
    });

    return errors.length > 0 ? errors.join("\n") : null;
}

module.exports = {
    checkWithRules: function(doc, rules) {
        return checkWithRules(doc, rules);
    },
    checkHtmlFile: function(filePath, rules) {
        var deferred = Q.defer();

        fs.readFile(filePath, function (err, file) {
            if (err) { throw err; }
            deferred.resolve(checkWithRules(file.toString(), rules));
          });
        return deferred.promise;
    }
}