
ripple   = require 'ripple'
refs     = require "refs"
events   = require "events"
each     = require "each"


# ADD CUSTOM NUMBERS =================================================================
customSMSTemplate = """
    <div class="SMSList">
      <div>State: {{emptyList}}</div>
      <div class="SMSList-add">
        <input type="text" ref="number" on-enter="{{ this.add }}" />
        <button on-click="{{ this.add }}">Add</button>
        <button on-click="{{ this.sort }}" hidden="{{ emptyList }}">Sort</button>
        <button on-click="{{ this.clear }}" hidden="{{ emptyList }}">Remove All</button>
      </div>
      <ul each="{{items}}" class="SMSList-list">
        <li>{{number}} <button on-click="{{ this.removeItem.bind(this, $index) }}">Remove</button></li>
      </ul>
      <div hidden="{{ items.length }}">Empty List</div>
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

CustomSMS.created ->
  @data.items.on 'change', =>
    if @data.items.length then @set 'emptyList', true


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
