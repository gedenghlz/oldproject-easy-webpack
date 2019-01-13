
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';

Object.assign = require('object-assign')

if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable()
    window.Promise = require('promise/lib/es6-extensions.js')
}

if (typeof window.fetch === 'undefined') {
    require('whatwg-fetch')
}
