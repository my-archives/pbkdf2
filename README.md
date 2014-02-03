pbkdf2
======
Hash password and compare with PBKDF2, sha1, sha256, sha512, etc.

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



### API

#### `hash`
#### `hashSync`
#### `generateSalt`
#### `generateSaltSync`
#### `verify`?
