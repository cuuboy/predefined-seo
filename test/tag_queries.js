const should = require('should')
const query = require('../lib/tag_queries')

describe('#findTags', () => {
  it('returns tags with content', done => {
    var doc = '<div><img src="localhost/test.jpg" /><img src="localhost/test.jpg" /></div>';

    query.findTags(doc, 'img').
      should.eql(['<img src="localhost/test.jpg" />', '<img src="localhost/test.jpg" />']);

    done();
  });
});

describe('#countTag', () => {
  it('returns number of given tag name', done => {
    var doc = '<img src="localhost/test.jpg" /><img src="localhost/test.jpg" />';
    query.countTag(doc, 'img').should.equal(2);
    done();
  });
});

describe('#countTagWithAttribute', () => {
  it('returns number of a tags without specific attribute', done => {
    var doc = '<a src="localhost/test.jpg" /><a src="localhost/test.jpg" />';
    query.countTagWithAttribute(doc, 'a', 'rel').should.equal(2);
    done();
  });
});

describe('#checkTagAttributeValue', () => {
  it('detects meta attribute name="descriptions" missing from head tag', done => {
    var doc = '<html><head><title></title><meta name="keywords" /></head></html>';
    query.checkTagAttributeValue(doc, 'meta', 'name', 'descriptions').should.equal(false);
    done();
  });
});
