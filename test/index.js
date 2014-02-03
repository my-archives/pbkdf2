var assert = require('assert');
var pbkdf2 = require('../');

describe('#hashSync - Sync hash password', function () {
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

describe('#randomSaltSync - Sync random salt', function () {

  var s = pbkdf2.generateSaltSync(32);
  it("It's length is 32.", function () {
    assert.equal(s.length, 32);
  })
});
