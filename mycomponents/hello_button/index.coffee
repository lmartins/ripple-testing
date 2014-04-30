
Dialog = require('dialog')
dom = require('dom')
markup = require('./template.html')

openDialog = ->
  Dialog('Hello, word')
    .closable()
    .modal()
    .show()

module.exports = ->
  dom(markup).on('click', openDialog)
