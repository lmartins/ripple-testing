
ripple   = require 'ripple'
refs     = require "refs"
events   = require "events"
each     = require "each"
dispatch = require "dispatch"
observer = require "array-observer"


# Person ======================================================================

# personTemplate = """
#   <div class="{{type}}">
#     <img src="{{avatar}}" />
#     {{ firstName + " " + lastName }}
#   </div>
#   """
# Person = ripple personTemplate
#
# person = new Person
#   data:
#     "type": "winner"
#     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/walterstephanie/128.jpg"
#     "firstName": "Jane"
#     "lastName": "Doe"

# person.appendTo '.Page'



# Profile =====================================================================
#
# profileTemplate = """
#   <div class="Profile">
#     <profile-avatar username="{{username}}"></profile-avatar>
#     <profile-link username="{{username}}"></profile-link>
#   </div>
#   """
#
# Avatar = ripple 'Avatar: {{username}}'
# Link = ripple 'Link: {{username}}'
#
# Profile = ripple( profileTemplate )
#   .compose 'profile-avatar', Avatar
#   .compose 'profile-link', Link
#
# profile = new Profile
#   data:
#     username: 'lmartins'
#
# profile.appendTo '.Page'
#
#
# # Items List ==================================================================
# listTemplate = """
#   <div class="ItemsList">
#     <ul each="{{items}}">
#       <li>
#         {{name}} <button on-click="{{ this.removeItem.bind(this, $index) }}">Remove</button>
#       </li>
#     </ul>
#   </div>
#   """
#
# List = ripple listTemplate
#   .use(events)
#   .use(each)
#
# List::removeItem = (index) ->
#   @data.items.splice index, 1
#
#
# list = new List
#   data:
#     items: [
#       name: "Name1"
#     ,
#       name: "Name2"
#     ]
#
# list.appendTo '.Page'


# ADD CUSTOM NUMBERS =================================================================
customSMSTemplate = """
    <div class="SMSList">
      <div class="SMSList-add">
        <input type="text" ref="number" on-enter="{{ this.add }}" />
        <button on-click="{{ this.add }}">Add</button>
        <button on-click="{{ this.sort }}">Sort</button>
        <button on-click="{{ this.clear }}">Remove All</button>
      </div>
      <ul each="{{items}}" class="SMSList-list">
        <li>{{number}} <button on-click="{{ this.removeItem.bind(this, $index) }}">Remove</button></li>
      </ul>
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
  console.log "teste"
  @data.items.sort (a, b) ->
    a.data.number > b.data.number

phoneList = [
  "number": "960000002"
,
  "number": "960000001"
,
  "number": "960000003"
]

customSMSList = new CustomSMS
  data:
    items: phoneList

observer = observer phoneList
# observer.on 'add', (val) ->
#   console.log val

observer.on 'change', (val) ->
  console.log this

customSMSList.appendTo '.Page'
