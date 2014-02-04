// http://en.wikipedia.org/wiki/PBKDF2
// https://www.ietf.org/rfc/rfc6070.txt

var crypto      = require("crypto");
var randomBytes = crypto.randomBytes;
var pbkdf2      = crypto.pbkdf2;
var pbkdf2Sync  = crypto.pbkdf2Sync;

/**
 *
 * p: password
 * s: salt
 * c: iterations
 * a: algorithm
 * h: passwordHash
 * keylen
 * saltlen
 *
 */

exports.generateSalt = function (cb, saltlen) {
  if (!saltlen) saltlen = 32;
  randomBytes(saltlen, function (err, buf) {
    if (err) throw err;
    var s = buf.toString('hex');
    cb(s);
  });
}

exports.generateSaltSync = function (saltlen) {
  var s = '';
  if (!saltlen) saltlen = 32;
  try {
    s = new Buffer(randomBytes(saltlen / 2)).toString('hex');
  } catch (e) {}
  return s;
}

exports.hash = function (p, s, c, keylen, a, cb) {
  if (!c) c = 4096;
  if (!keylen) keylen = 64;
  if (!a) a = 'sha256';
  pbkdf2Sync(p, s, c, keylen / 2, a, function (err, buf) {
    if (err) throw err;
    var h = buf.toString('hex');
    cb(h);
  });
};

exports.hashSync = function (p, s, c, keylen, a) {
  if (!c) c = 4096;
  if (!keylen) keylen = 64;
  if (!a) a = 'sha256';
  return pbkdf2Sync(p, s, c, keylen / 2, a).toString('hex');
};

exports.compare = function (p, h, cb) {};

exports.compareSync = function (p, h) {};
