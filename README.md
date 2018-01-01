# Seo Checks

## What is this project about?

This is a small project that helps you to perform seo checks, it is a light weight, flexible and extendible npm package can help you check from file / string / readable stream and export the result to stdout / file / writable stream.

## How to use it?

* You need npm before you start
* npm install seo_checks

## How to run the test?

* simply run `mocha`

If you got 

```
const spawn = require('child_process').spawn;
^^^^^
SyntaxError: Use of const in strict mode.
```

Please run:

`nvm install stable`

## Usage

With provided example file:

```html
<html>
    <head>
        <title>This is a test HTML page</title>
        <meta name="descriptions" value="desc" />
        <meta name="keywords" value="good,html" />
    </head>
    <body>
        <h1>Test HTML</h1>
        <strong>Test HTML</strong>
        <a href="." rel="random link">A link</a>
        <img src="."/>
    </body>
</html>
```

And use this in your code:

```javascript
const checks = require('seo_checks');

checks.checkHtmlFile(__dirname + '/test.html', ['checkImg']).then(function(exports) {
  exports.toFile('test.txt');
});
```

And you will have a file `test.txt`:

```
There are 1 <img> tag without alt attribute
```

## How to add more rules?
* Currently, pre-defined rules are:
  * checkImg: Detect if any <img /> tag without alt attribute.
  * checkLink: Detect if any <a /> tag without rel attribute.
  * checkHead:
    * Detect if header doesn’t have <title> tag.
    * Detect if header doesn’t have <meta name=“descriptions” ... /> tag.
    * Detect if header doesn’t have <meta name=“keywords” ... /> tag.
  * checkStrong: Detect if there’re more than a certain number of <strong> tag in HTML(default is 15).
  * checkH1: Detect if a HTML have more than 1 <h1> tag.
  
 * To add more rules, please refer to 
 ` https://github.com/cuuboy/seo_checks/blob/master/lib/predefined_rules.js` and use existing query functions or add / improve more query function at `https://github.com/cuuboy/seo_checks/blob/master/lib/tag_queries.js`

## How will exports look like?
For example:
```
There are 1 <img> tag without alt attribute
There are 1 <a> tag without rel attribute
<title> is missing
<meta> with name="descriptions" is missing
<meta> with name="keywords" is missing
This document has more than 15 <strong> tag
This document has more than 1 <h1> tag
```