const predefinedRules = require('./predefined_rules')
const resultExports = require('./result_exports');
const Q = require('q');
const fs = require('fs');

var SeoCheck = function(doc) {
    this._doc = doc || '';
    this._errors = [];
    return this;
};

SeoCheck.prototype = {
    fromStream: function(stream) {
        var self = this,
            deferred = Q.defer(),
            doc = '';

        stream.
            on('data', function(chunk){
                self.appendDoc(chunk.toString());
            }).
            on('end', function() {
                deferred.resolve(self);
            });

        return deferred.promise;
    },
    fromFile: function(path) {
        var fsReadStream = fs.createReadStream(path);
        return this.fromStream(fsReadStream);
    },
    toStream: function(stream) {
        var self = this,
            deferred = Q.defer();

        stream.write(this.report());
        stream.end();

        stream.on('finish', function() {
            deferred.resolve(self);
        });
        
        return deferred.promise;
    },
    toFile: function(path) {
        var fsWriteStream = fs.createWriteStream(path);
        return this.toStream(fsWriteStream);
    },
    toConsole: function() {
        return this.toStream(process.stdout);
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
        
        return seoCheck;
    },
    checkHtmlFile: function(filePath, rules) {
        var fsReadStream = fs.createReadStream(filePath);
        return module.exports.checkReadableStream(fsReadStream, rules)
    },
    checkReadableStream: function(rs, rules) {
        return new SeoCheck().fromStream(rs).then(function(seoCheck) {
            rules.forEach(function(rule) {
                seoCheck[rule]();
            });

            return seoCheck;
        });
    },
    start: function() {
        return new SeoCheck();
    }
}