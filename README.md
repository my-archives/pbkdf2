# pbkdf2 [![Build Status](https://travis-ci.org/fundon/pbkdf2.svg)](https://travis-ci.org/fundon/pbkdf2)
  ***NOTE: Password_hash and salt is a hex string.***

### Information

<table>
<tr>
  <td>Package</td>
  <td></td>
</tr>
<tr>
  <td>Description</td>
  <td>Hash password and compare with PBKDF2, use sha1, sha256, sha512, etc. </td>
</tr>
<tr>
  <td>Node Version</td>
  <td>>= <a href="https://github.com/joyent/node/releases/tag/v0.11.11">0.11.11</a></td>
</tr>
</table>

## Install

```shell
npm install pbkdf2
```


## Usage

```js
var pbkdf2 = require('pbkdf2');
var p = 'password';
var s = pbkdf2.generateSaltSync(32);
var pwd = pbkdf2.hashSync(p, s, 1, 20, 'sha256');
var bool = pbkdf2.compareSync(pwd, p, s, 1, 20, 'sha256');
```


## API

* `hash(password, salt, iterations, keylen, algorithm, callback(error, password_hash))`
* `hashSync(password, salt, iterations, keylen, algorithm)`, return password_hash
* `generateSalt(callback(error, salt), saltlen)`
* `generateSaltSync(saltlen)`, return salt
* `compare(password_hash, password, salt, iterations, keylen, algorithm, callback(error, bool))`
* `compareSync(password_hash, password, salt, iterations, keylen, algorithm)`, return bool

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fundon/pbkdf2/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
