pbkdf2
======
Hash password and compare using PBKDF2, pbkdf2-sha1, pbkdf2-sha256, pbkdf2-sha512.

### Install

```
npm install pbkdf2
```


### Example

```
var pbkdf2 = require('pbkdf2');
var p = new Buffer('password');
var s = new Buffer('salt');
var pwd = pbkdf2.hashSync(p, s, 1, 20, 'sha256');
```
