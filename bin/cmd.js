#!/usr/bin/env node

'use strict'

const help = require('help')()
const nopt = require('nopt')
const opts = require('../options')
const knownOpts = { help: Boolean
                  , version: Boolean
                  , global: [String]
                  , plugin: [String]
                  , env: [String]
                  , 'formatter': [
                      'checkstyle'
                    , 'compact'
                    , 'html'
                    , 'json'
                    , 'junit'
                    , 'stylish'
                    , 'table'
                    , 'tap'
                    , 'unix'
                    , 'visualstudio'
                    ]
                  }
const shortHand = { h: ['--help']
                  , H: ['--help']
                  , v: ['--version']
                  , f: ['--formatter']
                  , g: ['--global']
                  , p: ['--plugin']
                  , e: ['--env']
                  }
const parsed = nopt(knownOpts, shortHand)

if (parsed.help) {
  return help()
}

if (parsed.version) {
  console.log(opts.cmd, `v${opts.version}`)
  return
}

const lintOpts = {
  globals: parsed.global
, plugins: parsed.plugin
, envs: parsed.env
}

const lintit = require('../')

lintit.lintFiles(parsed.argv.remain, lintOpts, onResult)

function onResult(err, result) {
  if (err) {
    console.error(`${opts.cmd}: Unexpected linter output:\n`)
    console.error(err.stack || err.message || err)
    process.exit(1)
  }

  if (!result.errorCount && !result.warningCount) {
    // success
    return
  }

  // console.log(result.results)
  const formatter = parsed.formatter || 'stylish'
  const formatResults = require(`eslint/lib/formatters/${formatter}`)
  const out = formatResults(result.results)
  if (out) {
    console.log(out)
  }
  process.exitCode = 1
}
