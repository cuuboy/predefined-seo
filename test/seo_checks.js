const should = require('should')
const checks = require('../lib/seo_checks')

describe('#checkImg', () => {
  it('returns number of img tags without alt attribute', done => {
    var doc = '<img src="localhost/test.jpg" /><img src="localhost/test.jpg" />';
    checks.checkImg(doc).should.equal("There are 2 <img> tag without alt attribute");
    done();
  })

  it('returns correct number when some of img have alt attribute', done => {
    var doc = '<img src="localhost/test.jpg" /><img alt="valid" src="localhost/test.jpg" />';
    checks.checkImg(doc).should.equal("There are 1 <img> tag without alt attribute");
    done();
  })

  it('returns null when all img tags contain alt attribute', done => {
    var doc = '<img alt="valid" src="localhost/test.jpg" /><img alt="valid" src="localhost/test.jpg" />';
    should(checks.checkImg(doc)).equal(null);
    done();
  })
})

describe('#checkLink', () => {
  it('returns number of a tags without rel attribute', done => {
    var doc = '<a src="localhost/test.jpg" /><a src="localhost/test.jpg" />';
    checks.checkLink(doc).should.equal("There are 2 <a> tag without rel attribute");
    done();
  })

  it('returns correct number when some of img have rel attribute', done => {
    var doc = '<a src="localhost/test.jpg" /><a rel="valid" src="localhost/test.jpg" />';
    checks.checkLink(doc).should.equal("There are 1 <a> tag without rel attribute");
    done();
  })

  it('returns null when all a tags contain rel attribute', done => {
    var doc = '<a rel="valid" src="localhost/test.jpg" /><a rel="valid" src="localhost/test.jpg" />';
    should(checks.checkLink(doc)).equal(null);
    done();
  })
})

describe('#checkHead', () => {
  it('returns head missing when document does not have head tag', done => {
    var doc = '<html></html>';
    checks.checkHead(doc).should.equal('<head> is missing');
    done();
  })

  it('detects title, meta attributes missing from head tag', done => {
    var doc = '<html><head></head></html>';
    checks.checkHead(doc).should.equal('<title> is missing\n<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
    done();
  })

  it('detects meta attributes missing from head tag', done => {
    var doc = '<html><head><title></title></head></html>';
    checks.checkHead(doc).should.equal('<meta> with name="descriptions" is missing\n<meta> with name="keywords" is missing');
    done();
  })

  it('returns meta name="keywords" missing  from head tag', done => {
    var doc = '<html><head><title></title><meta name="descriptions" /></head></html>';
    checks.checkHead(doc).should.equal('<meta> with name="keywords" is missing');
    done();
  })

  it('returns meta attributes missing when head tag does not contain title tag', done => {
    var doc = '<html><head><title></title><meta name="keywords" /></head></html>';
    checks.checkHead(doc).should.equal('<meta> with name="descriptions" is missing');
    done();
  })
})