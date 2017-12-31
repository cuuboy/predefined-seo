var countRegexUnmatched = function(targets, regexp) {
    var reducer = (count, target) => {
        if (target.match(regexp) == null) {
            count = count +1;
        }
        return count;
    };

    return targets.reduce(reducer, 0);
}

var checkTagAttribute = function(doc, tag, attribute) {
    var tagExp = new RegExp('<' + tag + '.+?\/?>', 'g'),
        attrExp = new RegExp(attribute + '=".+?"');
        
    return countRegexUnmatched(
            doc.match(tagExp), 
            attrExp
        );
}

module.exports = {
    checkImg: function(doc) {
        var invalidCount = checkTagAttribute(doc, 'img', 'alt')
        if (invalidCount == 0) {
            return null;
        }
        return 'There are '+ invalidCount +' <img> tag without alt attribute';
    }
}