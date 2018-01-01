var countRegexUnmatched = function(targets, regexp) {
    var reducer = (count, target) => {
        if (target.match(regexp) == null) {
            count = count +1;
        }
        return count;
    };

    return targets.reduce(reducer, 0);
}

module.exports = {
    countTag: function(doc, tag) {
        var count = 0,
            asymExp = new RegExp('<' + tag + '.+?\/>', 'g'),
            symExp = new RegExp('<' + tag + '.*?>.*?<\/' + tag + '.*?>', 'g');
    
        var asymTags = doc.match(asymExp),
            symTags = doc.match(symExp);
        if (asymTags != null) {
            count += asymTags.length;
        }
        
        var symTags = doc.match(symExp);
        if (symTags != null) {
            count += symTags.length;
        }
            
        return count;
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
        return null != doc.match('<' + tag + '.*?' + attribute + '="' + value + '".*?\/?>');
    }
}
