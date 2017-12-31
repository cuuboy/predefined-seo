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
    checkImg: function(doc) {
        var tags = doc.match(/<img.+?\/?>/g);
        var missingCount = countRegexUnmatched(tags, /alt=".+?"/);
        if (missingCount == 0) {
            return null;
        }
        return 'There are '+ missingCount +' <img> tag without alt attribute';
    }
}