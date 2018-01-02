var countRegexUnmatched = function(targets, regexp) {
    var reducer = (count, target) => {
        if (target.match(regexp) == null) {
            count = count +1;
        }
        return count;
    };

    return targets.reduce(reducer, 0);
}

var findTags = function(doc, tag) {
    var count = 0,
        asymExp = new RegExp('<' + tag + '[^<>]*?\/>', 'sg'),
        symExp = new RegExp('<' + tag + '.*?>.*?<\/' + tag + '>', 'sg');

    var asymTags = doc.match(asymExp),
        symTags = doc.match(symExp);
        
    return [].concat(symTags, asymTags).filter(function(e){ return e != undefined });
};

module.exports = {
    findTags: function(doc, tag) {
        return findTags(doc, tag);
    },
    countTag: function(doc, tag) {
        return findTags(doc, tag).length;
    },
    countTagWithAttribute: function(doc, tag, attribute) {
        var tagExp = new RegExp('<' + tag + '.+?\/?>', 'g'),
            attrExp = new RegExp(attribute + '=".+?"');
            
        return countRegexUnmatched(
                doc.match(tagExp), 
                attrExp
            );
    },
    checkTagAttributeValue: function(doc, tag, attribute, value) {
        return null != doc.match('<' + tag + '.*?' + attribute + '="' + value + '"[^<>]*?\/?>');
    }
}
