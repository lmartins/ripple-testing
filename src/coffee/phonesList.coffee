
ripple   = require 'ripple'
refs     = require "refs"
events   = require "events"
each     = require "each"

# ADD CUSTOM NUMBERS =================================================================
customSMSTemplate = """
  <div class="SMSList">
    <div class="SMSList-add">
      <input type="text" ref="number" on-enter="{{ this.add }}" />
      <button on-click="{{ this.add }}">Add</button>
      <button on-click="{{ this.sort }}" hidden="{{ emptyList }}">Sort</button>
      <button on-click="{{ this.clear }}" hidden="{{ emptyList }}">Remove All</button>
    </div>
    <div class="SMSList-list">
      <ul each="{{items}}">
        <li>{{number}} <button on-click="{{ this.removeItem.bind(this, $index) }}">Remove</button></li>
      </ul>
      <div class="emptyList" hidden="{{ !emptyList }}">Empty List</div>
    </div>
  </div>
"""

CustomSMS = ripple customSMSTemplate
  .use each
  .use events
  .use refs

CustomSMS.directive 'on-enter',
  update: (fn, el, view) ->
    self = this
    el.addEventListener 'keypress', ((e) ->
      if e.which is 13 then fn.call view, e
    ), true

CustomSMS::removeItem = (index) ->
  @data.items.splice index, 1

CustomSMS::clear = () ->
  @data.items.splice 0, @data.items.length

CustomSMS::add = () ->
  @data.items.push
    number: @refs.number.value
  @refs.number.value = ""

CustomSMS::sort = () ->
  @data.items.sort (a, b) ->
    a.data.number > b.data.number

CustomSMS.ready ->
  if not @data.items.length
    @set 'emptyList', true
  else
    @set 'emptyList', false

  @data.items.on 'change', =>
    if @data.items.length is 0
      @set 'emptyList', true
    else
      @set 'emptyList', false


customSMSList = new CustomSMS
  data:
    items: [
        "number": "960000002"
      ,
        "number": "960000001"
      ,
        "number": "960000003"
      ]

customSMSList.appendTo '.Page'
# myButton = helloButton()
# myButton.appendTo '.Page'
