const should = require('should');
const rules = require('../lib/predefined_rules');

describe('#checkImg', () => {
  it('returns number of img tags without alt attribute', done => {
    var doc = '<img src="localhost/test.jpg" /><img src="localhost/test.jpg" />';
    rules.checkImg(doc).should.equal("There are 2 <img> tag without alt attribute");
    done();
  });

  it('returns correct number when some of img have alt attribute', done => {
    var doc = '<img src="localhost/test.jpg" /><img alt="valid" src="localhost/test.jpg" />';
    rules.checkImg(doc).should.equal("There are 1 <img> tag without alt attribute");
    done();
  });

  it('returns null when all img tags contain alt attribute', done => {
    var doc = '<img alt="valid" src="localhost/test.jpg" /><img alt="valid" src="localhost/test.jpg" />';
    should(rules.checkImg(doc)).equal(null);
    done();
  });
});

describe('#checkLink', () => {
  it('returns number of a tags without rel attribute', done => {
    var doc = '<a src="localhost/test.jpg" /><a src="localhost/test.jpg" />';
    rules.checkLink(doc).should.equal("There are 2 <a> tag without rel attribute");
    done();
  });

  it('returns correct number when some of img have rel attribute', done => {
    var doc = '<a src="localhost/test.jpg" /><a rel="valid" src="localhost/test.jpg" />';
    rules.checkLink(doc).should.equal("There are 1 <a> tag without rel attribute");
    done();
  });

  it('returns null when all a tags contain rel attribute', done => {
    var doc = '<a rel="valid" src="localhost/test.jpg" /><a rel="valid" src="localhost/test.jpg" />';
    should(rules.checkLink(doc)).equal(null);
    done();
  });
});

describe('#checkHead', () => {
  it('returns head missing when document does not have head tag', done => {
    var doc = '<html></html>';
    rules.checkHead(doc).should.equal('<head> is missing');
    done();
  });

  it('detects title, meta attributes missing from head tag', done => {
    var doc = '<html><head></head></html>';
    rules.checkHead(doc).should.equal('<title> is missing\n<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
    done();
  });

  it('detects meta attributes missing from head tag', done => {
    var doc = '<html><head><title></title></head></html>';
    rules.checkHead(doc).should.equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
    done();
  });

  it('detects meta attribute name="keywords" missing from head tag', done => {
    var doc = '<html><head><title></title><meta name="descriptions" /></head></html>';
    rules.checkHead(doc).should.equal('<meta> with name="keywords" is missing');
    done();
  });

  it('detects meta attribute name="descriptions" missing from head tag', done => {
    var doc = '<html><head><title></title><meta name="keywords" /></head></html>';
    rules.checkHead(doc).should.equal('<meta> with name="descriptions" is missing');
    done();
  });

  it('returns null when head tag is good', done => {
    var doc = '<html><head><title></title><meta name="descriptions" /><meta name="keywords" /></head></html>';
    should(rules.checkHead(doc)).equal(null);
    done();
  });
});

describe('#checkStrong', () => {
  it('returns error when <strong> tag is more than 15 times(default)', done => {
    var doc = `<div>
                <strong>1</strong>
                <strong>2</strong>
                <strong>3</strong>
                <strong>4</strong>
                <strong>5</strong>
                <strong>6</strong>
                <strong>7</strong>
                <strong>8</strong>
                <strong>9</strong>
                <strong>10</strong>
                <strong>11</strong>
                <strong>12</strong>
                <strong>13</strong>
                <strong>14</strong>
                <strong>15</strong>
                <strong>16</strong>
              </div>`;

    rules.checkStrong(doc).should.equal('This document has more than 15 <strong> tag');
    done();
  });

  it('returns error when <strong> tag is more than a given number', done => {
    var doc = '<div>\
                <strong>1</strong>\
                <strong>2</strong>\
                <strong>3</strong>\
                <strong>4</strong>\
              </div>';

    rules.checkStrong(doc, 3).should.equal('This document has more than 3 <strong> tag');
    done();
  });

  it('returns null when number of strong tag is good', done => {
    var doc = '<div>\
                <strong>1</strong>\
                <strong>2</strong>\
                <strong>3</strong>\
                <strong>4</strong>\
              </div>';

    should(rules.checkStrong(doc, 10)).equal(null);
    done();
  });
});

describe('#checkH1', () => {
  it('returns error when <h1> tag is more than 1 time', done => {
    var doc = '<body>\
                <h1>Article Title1</h1>\
                <h1>Article Title2</h1>\
              </body>';

    rules.checkH1(doc).should.equal('This document has more than 1 <h1> tag');
    done();
  });

  it('returns null when number of h1 tag is good', done => {
    var doc = '<body>\
                <h1>Article Title</h1>\
              </body>';

    should(rules.checkH1(doc)).equal(null);
    done();
  });
});