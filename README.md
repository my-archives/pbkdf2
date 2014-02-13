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

### `hash`
### `hashSync`
### `generateSalt`
### `generateSaltSync`
### `compare`
### `compareSync`

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fundon/pbkdf2/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
