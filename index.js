'use strict'

const Linter = require('standard-engine').linter
const opts = require('./options')

const linter = new Linter(opts)
// console.log(linter.eslint.linter)
// linter.eslint.linter.rules.define('indent', require('./rules/indent'))
module.exports = linter
