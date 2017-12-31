const should = require('should')
const checks = require('../lib/seo_checks')

describe('#checkImg', () => {
  it('returns number of image tags without alt attribute', done => {
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