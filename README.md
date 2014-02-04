pbkdf2
======

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
  <td>>= 0.11.11</td>
</tr>
</table>

## Install

```shell
npm install pbkdf2
```


## Usage

```js
var pbkdf2 = require('pbkdf2');
var p = new Buffer('password');
var s = new Buffer('salt');
var pwd = pbkdf2.hashSync(p, s, 1, 20, 'sha256');
```


## API

### `hash`
### `hashSync`
### `generateSalt`
### `generateSaltSync`
### `compare`?
### `compareSync`?

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fundon/pbkdf2/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
