
ripple   = require 'ripple'
refs     = require "refs"
events   = require "events"
each     = require "each"
dispatch = require "dispatch"
observer = require "array-observer"


# Person ======================================================================

personTemplate = """
  <div class="{{type}}">
    <img src="{{avatar}}" />
    {{ firstName + " " + lastName }}
  </div>
  """
Person = ripple personTemplate

person = new Person
  data:
    "type": "winner"
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/walterstephanie/128.jpg"
    "firstName": "Jane"
    "lastName": "Doe"

person.appendTo '.Page'



# Profile =====================================================================

profileTemplate = """
  <div class="Profile">
    <profile-avatar username="{{username}}"></profile-avatar>
    <profile-link username="{{username}}"></profile-link>
  </div>
  """

Avatar = ripple 'Avatar: {{username}}'
Link = ripple 'Link: {{username}}'

Profile = ripple( profileTemplate )
  .compose 'profile-avatar', Avatar
  .compose 'profile-link', Link

profile = new Profile
  data:
    username: 'lmartins'

profile.appendTo '.Page'


# Items List ==================================================================
listTemplate = """
  <div class="ItemsList">
    <ul each="{{items}}">
      <li>
        {{name}} <button on-click="{{ this.removeItem.bind(this, $index) }}">Remove</button>
      </li>
    </ul>
  </div>
  """

List = ripple listTemplate
  .use(events)
  .use(each)

List::removeItem = (index) ->
  @data.items.splice index, 1


list = new List
  data:
    items: [
      name: "Name1"
    ,
      name: "Name2"
    ]

list.appendTo '.Page'
