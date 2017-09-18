const parser = require('./lib/cf.js');

function express(options) {
  return function( req, res, next  ) {
    const coldfusion = parser;
    next();
  }
}
exports.express = express;

function renderFile(path, options={}, callback=() => {}) {
  if (typeof fn === 'function') {
    var res;
    try {
      res = parser.parse(path);
    } catch (ex) {
      return fn(ex);
    }
    return fn(null, res);
  }
}
exports.renderFile = renderFile;

/**
 * Express support.
 */

function __express(path, options, fn) {
  if(options.compileDebug == undefined && process.env.NODE_ENV === 'production') {
    options.compileDebug = false;
  }
  exports.renderFile(path, options, fn);
}
exports.__express = __express;
