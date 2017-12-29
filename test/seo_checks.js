const should = require('should')
const checks = require('../lib/seo_checks')
describe('#average', () => {
  it('should return the average of array', done => {
    var avg = checks.average([1, 2, 3, 4])
    avg.should.equal(2.5)
    done()
  })
  it('should return NaN when array is empty', done => {
    var avg = checks.average([])
    isNaN(avg).should.be.true
    done()
  })
})

describe('#checkImg', () => {
  it('should return number of image tags without alt attribute', done => {
    var doc = '<img src="localhost/test.jpg" /><img src="localhost/test.jpg" />'
    checks.checkImg(doc).should.equal("There are 2 <img> tag without alt attribute")
  })
})