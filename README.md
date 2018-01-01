# Seo Checks

## What is this project about?

This is a small project that helps you to perform seo checks, it is a light weight, flexible and extendible npm package can help you check from file / string / readable stream and export the result to stdout / file / writable stream.

## How to use it?

* You need npm before you start
* npm install

## How to run the test?

* simply run `mocha`

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