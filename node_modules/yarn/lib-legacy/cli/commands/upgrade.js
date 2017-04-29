'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.requireLockfile = undefined;

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

let run = exports.run = (() => {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (config, reporter, flags, args) {
    const lockfile = args.length ? yield (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd, reporter) : new (_wrapper || _load_wrapper()).default();
    const manifest = (yield config.readRootManifest()) || {};
    const dependencies = manifest.dependencies || {};

    const addArgs = args.map(function (dependency) {
      const remoteSource = dependencies[dependency];

      if (remoteSource && (_packageRequest || _load_packageRequest()).default.getExoticResolver(remoteSource)) {
        return remoteSource;
      }

      return dependency;
    });

    const addFlags = (0, (_assign || _load_assign()).default)({}, flags, { force: true });

    const install = new (_add || _load_add()).Add(addArgs, addFlags, config, reporter, lockfile);
    yield install.init();
  });

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

exports.setFlags = setFlags;

var _add;

function _load_add() {
  return _add = require('./add.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setFlags(commander) {
  // TODO: support some flags that install command has
  commander.usage('upgrade [flags]');
}

const requireLockfile = exports.requireLockfile = true;