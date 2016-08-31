'use strict'

const eslint = require('eslint')
const path = require('path')
const pkg = require('./package')
const rules = require('eslint/lib/rules')

module.exports = {
  version: pkg.version
, homepage: pkg.homepage
, bugs: pkg.bugs.url
, eslint: eslint
, cmd: Object.keys(pkg.bin)[0]
, tagline: 'I <3 biscuits'
, eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  }
, cwd: ''
}

rules.define('indentation', require('./rules/indentation'))
