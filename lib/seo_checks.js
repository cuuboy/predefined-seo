var countRegexUnmatched = function(targets, regexp) {
    var reducer = (count, target) => {
        if (target.match(regexp) == null) {
            count = count +1;
        }
        return count;
    };

    return targets.reduce(reducer, 0);
};

var checkTagAttribute = function(doc, tag, attribute) {
    var tagExp = new RegExp('<' + tag + '.+?\/?>', 'g'),
        attrExp = new RegExp(attribute + '=".+?"');
        
    return countRegexUnmatched(
            doc.match(tagExp), 
            attrExp
        );
};

var checkTagExist = function(doc, tag) {
    var tagExp = new RegExp('<' + tag + '.+?\/?>');

    if (doc.match('<' + tag + '.+?\/?>') != null) {
        return true;
    }

    if (doc.match('<' + tag + '.*?><\/' + tag + '.+?>') != null) {
        return true;
    }
        
    return false;
};

var checkTagAttributeValue = function(doc, tag, attribute, value) {
    return null != doc.match('<' + tag + '.*?' + attribute + '="' + value + '".*?\/?>');
};

module.exports = {
    checkImg: function(doc) {
        var invalidCount = checkTagAttribute(doc, 'img', 'alt')
        if (invalidCount == 0) {
            return null;
        }
        return 'There are '+ invalidCount +' <img> tag without alt attribute';
    },
    checkLink: function(doc) {
        var invalidCount = checkTagAttribute(doc, 'a', 'rel')
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
        
        if (checkTagExist(doc, 'title') != true) {
            errors.push('<title> is missing');
        }

        if (checkTagAttributeValue(doc, 'meta', 'name', 'descriptions') != true) {
            errors.push('<meta> with name="descriptions" is missing');
        }

        if (checkTagAttributeValue(doc, 'meta', 'name', 'keywords') != true) {
            errors.push('<meta> with name="keywords" is missing');
        }

        if (errors.length == 0) {
            return null;
        }

        return errors.join("\n");
    }
};