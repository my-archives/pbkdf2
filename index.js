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
 *  e: encoding
 *  keylen
 *  saltlen
 */

var SALTLEN = 32;
var ITERATIONS = 4096;
var KEYLEN = 64;
var ALGORITHM = 'sha256';
var ENCODING = 'hex';

/**
 *  Async generate salt.
 *
 *  @param {Function} cb(err, res)
 *  @param {Number} saltlen - default: 32
 */

function generateSalt(cb, saltlen, e) {
  saltlen = saltlen || SALTLEN;
  randomBytes(saltlen >> 1, function (err, buf) {
    cb(err, err ? null : buf.toString(ENCODING));
  });
}

/**
 *  Async generate hash.
 *
 *  @param {String} p - password
 *  @param {String} s - salt
 *  @param {Number} c - iterations, default: 4096
 *  @param {String} keylen
 *  @param {String} a - algorithm, default: sha256
 *  @param {Function} cb(err, res), res.length, default: 32
 *  @api public
 */

function hash(p, s, c, keylen, a, cb) {
  c = c || ITERATIONS;
  keylen = keylen || KEYLEN;
  a = a || ALGORITHM;
  pbkdf2(p, s, c, keylen >> 1, a, function (err, buf) {
    cb(err, err ? null : buf.toString(ENCODING));
  });
}

/**
 *  Async compare password_hash.
 *
 *  @param {String} h - password_hash
 *  @param {String} p - password
 *  @param {String} s - salt
 *  @param {Number} c - iterations, default: 4096
 *  @param {String} keylen
 *  @param {String} a - algorithm, default: sha256
 *  @param {Function} cb(err, res), res.length, default: 32
 *  @api public
 */

function compare(h, p, s, c, keylen, a, cb) {
  hash(p, s, c, keylen, a, function (err, buf) {
    cb(err, err ? null : h === buf.toString(ENCODING));
  });
}

/**
 *  Sync generate salt.
 *
 *  @param {Number} saltlen - default: 32
 *  @return {String} length, default: 32
 *  @api public
 */

function generateSaltSync(saltlen) {
  var s = '';
  saltlen = saltlen || SALTLEN;
  try {
    s = new Buffer(randomBytes(saltlen >> 1)).toString(ENCODING);
  } catch (e) {}
  return s;
}

/**
 *  Sync generate hash.
 *
 *  @param {String} p - password
 *  @param {String} s - salt
 *  @param {Number} c - iterations, default: 4096
 *  @param {String} keylen
 *  @param {String} a - algorithm, default: sha256
 *  @return {String} length, default: 64
 *  @api public
 */

function hashSync(p, s, c, keylen, a) {
  c = c || ITERATIONS;
  keylen = keylen || KEYLEN;
  a = a || ALGORITHM;
  return pbkdf2Sync(p, s, c, keylen >> 1, a).toString(ENCODING);
}

/**
 *  Sync compare password_hash.
 *
 *  @param {String} h - password_hash
 *  @param {String} p - password
 *  @param {String} s - salt
 *  @param {Number} c - iterations, default: 4096
 *  @param {String} keylen
 *  @param {String} a - algorithm, default: sha256
 *  @return {Boolean}
 *  @api public
 */

function compareSync(h, p, s, c, keylen, a) {
  return h === hashSync(p, s, c, keylen, a);
}
