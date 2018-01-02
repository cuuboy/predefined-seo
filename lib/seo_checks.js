const predefinedRules = require('./predefined_rules')
const resultExports = require('./result_exports');
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

var SeoCheck = function(doc) {
    this._doc = doc || '';
    this._errors = [];
    return this;
};

SeoCheck.prototype = {
    fromStream: function(stream) {
        var self = thils,
            deferred = Q.defer(),
            doc = '';

        stream.
            on('data', function(chunk){
                self.appendDoc(chunk.toString());
            }).
            on('end', deferred.resolve);

        return deferred.promise;
    },
    fromFile: function(path) {
        var fsReadStream = fs.createReadStream(filePath);
        return this.fromStream(fsReadStream);
    },
    examAndAddError: function(error) {
        if (!error) { return; }
        this._errors.push(error);
    },
    appendDoc: function(doc) {
        this._doc += doc;
    },
    errors: function() {
        return this._errors;
    },
    doc: function() {
        return this._doc;
    },
    report: function() {
        var errors = this.errors();
        return errors.length ? errors.join("\n") : null;
    }
}

Object.keys(predefinedRules).forEach(function(name) {
    SeoCheck.prototype[name] = function(options) {
        this.examAndAddError(predefinedRules[name](this.doc(), options));
        return this;
    };
});

module.exports = {
    checkWithRules: function(doc, rules) {
        var seoCheck = new SeoCheck(doc);
        
        rules.forEach(function(rule) {
            seoCheck[rule]();
        });
        
        return resultExports.load(seoCheck.report());
    },
    checkHtmlFile: function(filePath, rules) {
        var fsReadStream = fs.createReadStream(filePath);
        return module.exports.checkReadableStream(fsReadStream, rules)
    },
    checkReadableStream: function(rs, rules) {
        var deferred = Q.defer(),
            doc = '';

        rs.on('data', function(chunk){
            doc += chunk.toString();
        }).on('end', function(){
            deferred.resolve(
                resultExports.load(checkWithRules(doc, rules))
            );
        });

        return deferred.promise;
    }
}