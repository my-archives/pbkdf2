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
 * dkLen: dkLen
 * sLen: saltLen
 *
 */

exports.generateSalt = function (cb, sLen) {
  if (!sLen) sLen = 32;
  randomBytes(sLen, function (err, buf) {
    if (err) throw err;
    var s = buf.toString('hex');
    cb(s);
  });
}

exports.generateSaltSync = function (sLen) {
  var s = '';
  if (!sLen) sLen = 32;
  try {
    s = new Buffer(randomBytes(sLen / 2)).toString('hex');
  } catch (e) {}
  return s;
}

exports.hash = function (p, s, c, dkLen, a, cb) {
  if (!c) c = 4096;
  if (!dkLen) dkLen = 64;
  if (!a) a = 'sha256';
  pbkdf2Sync(p, s, c, dkLen / 2, a, function (err, buf) {
    if (err) throw err;
    var h = buf.toString('hex');
    cb(h);
  });
};

exports.hashSync = function (p, s, c, dkLen, a) {
  if (!c) c = 4096;
  if (!dkLen) dkLen = 64;
  if (!a) a = 'sha256';
  return pbkdf2Sync(p, s, c, dkLen / 2, a).toString('hex');
};

exports.verify = function (h, p) {
};
