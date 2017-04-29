'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const path = require('path');

var _require = require('../constants');

const ROOT_USER = _require.ROOT_USER;


const userHomeDir = process.platform === 'linux' && ROOT_USER ? path.resolve('/usr/local/share') : require('os').homedir();

exports.default = userHomeDir;