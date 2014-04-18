'use strict';

// http://en.wikipedia.org/wiki/PBKDF2
// https://www.ietf.org/rfc/rfc6070.txt

/**
 *  Module dependences.
 */

var crypto      = require('crypto');
var randomBytes = crypto.randomBytes;
var pbkdf2      = crypto.pbkdf2;
var pbkdf2Sync  = crypto.pbkdf2Sync;

/**
 *  Expose
 */

exports.generateSalt      = generateSalt;
exports.hash              = hash;
exports.compare           = compare;
exports.generateSaltSync  = generateSaltSync;
exports.hashSync          = hashSync;
exports.compareSync       = compareSync;

/**
 *  p: password
 *  s: salt
 *  c: iterations
 *  a: algorithm
 *  h: passwordHash
 *  keylen
 *  saltlen
 */

function generateSalt(cb, saltlen) {
  if (!saltlen) saltlen = 32;
  randomBytes(saltlen / 2, function (err, buf) {
    if (err) throw err;
    var s = buf.toString('hex');
    cb(s);
  });
}

function hash(p, s, c, keylen, a, cb) {
  if (!c) c = 4096;
  if (!keylen) keylen = 64;
  if (!a) a = 'sha256';
  pbkdf2(p, s, c, keylen / 2, a, function (err, buf) {
    if (err) throw err;
    var h = buf.toString('hex');
    cb(h);
  });
}

function compare(h, p, s, c, keylen, a, cb) {
  hash(p, s, c, keylen, a, function (buf) {
    cb(h === buf.toString('hex'));
  });
}

function generateSaltSync(saltlen) {
  var s = '';
  if (!saltlen) saltlen = 32;
  try {
    s = new Buffer(randomBytes(saltlen / 2)).toString('hex');
  } catch (e) {}
  return s;
}

function hashSync(p, s, c, keylen, a) {
  if (!c) c = 4096;
  if (!keylen) keylen = 64;
  if (!a) a = 'sha256';
  return pbkdf2Sync(p, s, c, keylen / 2, a).toString('hex');
}

function compareSync(h, p, s, c, keylen, a) {
  return h === hashSync(p, s, c, keylen, a);
}
