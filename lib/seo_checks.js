const query = require('./tag_queries')

module.exports = {
    checkImg: function(doc) {
        var invalidCount = query.countTagWithAttribute(doc, 'img', 'alt')
        if (invalidCount == 0) {
            return null;
        }
        return 'There are '+ invalidCount +' <img> tag without alt attribute';
    },
    checkLink: function(doc) {
        var invalidCount = query.countTagWithAttribute(doc, 'a', 'rel')
        if (invalidCount == 0) {
            return null;
        }
        return 'There are '+ invalidCount +' <a> tag without rel attribute';
    },
    checkHead: function(doc) {
        var headTag = doc.match(/<head.*?>(.*)<\/head.*?>/);
        if (headTag == null) {
            return '<head> is missing';
        }
        var errors = [], 
            headContent = headTag[1];
        
        if (query.countTag(doc, 'title') < 1) {
            errors.push('<title> is missing');
        }

        if (query.checkTagAttributeValue(doc, 'meta', 'name', 'descriptions') != true) {
            errors.push('<meta> with name="descriptions" is missing');
        }

        if (query.checkTagAttributeValue(doc, 'meta', 'name', 'keywords') != true) {
            errors.push('<meta> with name="keywords" is missing');
        }

        if (errors.length == 0) {
            return null;
        }

        return errors.join("\n");
    },
    checkStrong: function(doc, max = 15) {
        var count = query.countTag(doc, 'strong');

        if (count > max) {
            return 'This document has more than ' + max + ' <strong> tag';
        }

        return null;
    },
    checkH1: function(doc) {
        var count = query.countTag(doc, 'h1');
        
        if (count > 1) {
            return 'This document has more than 1 <h1> tag';
        }

        return null;
    }
};