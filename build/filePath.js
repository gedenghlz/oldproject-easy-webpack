const path = require("path")
const ip = require('ip')

const LOCALHOST = '127.0.0.1'
const LAN = ip.address()

const ROOT = path.resolve(__dirname, './../')
const SRC = path.join(ROOT, 'src')
const HTML = path.resolve(SRC, 'html/')
const STYLE = path.resolve(SRC, 'style')
const STATIC = path.join(ROOT, "static")
const VIEW = path.resolve(SRC, 'view')

const PUBLICPATH = '/'
const FAVICON = path.resolve(ROOT, '')
const POLYFILL = path.resolve(ROOT, 'build/shim_ie/polyfill.js')
const CSSIMPORT = path.resolve(STYLE, 'style')
const VENDOR = path.join(ROOT, 'vendor')


module.exports = {
    VENDOR,
    ROOT,
    SRC,
    HTML,
    FAVICON,
    STYLE,
    STATIC,
    PUBLICPATH,
    VIEW,
    CSSIMPORT,
    POLYFILL,
    LOCALHOST,
    LAN
}