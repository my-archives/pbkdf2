var assert = require('assert');
var pbkdf2 = require('../');

describe('#hashSync - hash password', function () {
  var p = new Buffer('password');
  var s = new Buffer('salt');

  var pwd = pbkdf2.hashSync(p, s, 1, 20, 'sha1');

  it("It's value is 0c60c80f961f0e71f3a9.", function () {
    assert.equal(pwd, '0c60c80f961f0e71f3a9');
  });

  it("It's length is 20.", function () {
    assert.equal(pwd.length, 20);
  });
});

describe('#generateSaltSync - generate random salt', function () {

  var s = pbkdf2.generateSaltSync(32);
  it("It's length is 32.", function () {
    assert.equal(s.length, 32);
  })
});

describe('#compareSync - Compare Password', function () {
  var b = pbkdf2.compareSync('0c60c80f961f0e71f3a9', 'password', 'salt', 1, 20, 'sha1');
  it("true", function () {
    assert.equal(b, true);
  })
});

describe('#hash - hash password', function () {
  var p = 'password';
  var s = 'salt';

  it("It's value is 0c60c80f961f0e71f3a9.", function (done) {
    pbkdf2.hash(p, s, 1, 20, 'sha1', function (err, h) {
      assert.equal(h, '0c60c80f961f0e71f3a9');
      assert.equal(h.length, 20);
      done();
    });
  });

});

describe('#generateSalt - generate random salt', function () {

  it("It's length is 32.", function (done) {
    pbkdf2.generateSalt(function (err, s) {
      assert.equal(s.length, 32);
      done();
    }, 32);
  })
});

describe('#compare - Compare Password', function () {
  it("true", function (done) {
    pbkdf2.compare('0c60c80f961f0e71f3a9', 'password', 'salt', 1, 20, 'sha1', function (err, b) {
      assert.equal(b, true);
      done();
    });
  })
});

describe('#generateSalt - generate random salt and to base64 string', function () {
  it("Should be base64 string.", function (done) {
    pbkdf2.generateSalt(function (err, s) {
      assert.equal(s.length, 32);
      done();
    }, 32);
  })
});
