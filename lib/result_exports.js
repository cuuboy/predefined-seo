const fs = require('fs');
const Q = require('q');

var Exporter = function(content) {
    this._content = content;
    return this;
};

Exporter.prototype = {
    toStream: function(stream) {
        var self = this,
            deferred = Q.defer();

        stream.write(this.content());
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
    content: function() {
        return this._content;
    },
    result: function() {
        return this.content();
    }
}

module.exports = {
    load: function(content) {
        return new Exporter(content);
    }
}