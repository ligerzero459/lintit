'use strict'

const Linter = require('standard-engine').linter
const opts = require('./options')

const linter = new Linter(opts)
module.exports = linter
