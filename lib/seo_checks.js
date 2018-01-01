const predefinedRules = require('./predefined_rules')

module.exports = {
    checkWithRules: function(doc, rules) {
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
}