var Avatar, Link, List, Person, Profile, dispatch, each, events, list, listTemplate, observer, person, personTemplate, profile, profileTemplate, refs, ripple;

ripple = require('ripple');

refs = require("refs");

events = require("events");

each = require("each");

dispatch = require("dispatch");

observer = require("array-observer");

personTemplate = "<div class=\"{{type}}\">\n  <img src=\"{{avatar}}\" />\n  {{ firstName + \" \" + lastName }}\n</div>";

Person = ripple(personTemplate);

person = new Person({
  data: {
    "type": "winner",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/walterstephanie/128.jpg",
    "firstName": "Jane",
    "lastName": "Doe"
  }
});

person.appendTo('.Page');

profileTemplate = "<div class=\"Profile\">\n  <profile-avatar username=\"{{username}}\"></profile-avatar>\n  <profile-link username=\"{{username}}\"></profile-link>\n</div>";

Avatar = ripple('Avatar: {{username}}');

Link = ripple('Link: {{username}}');

Profile = ripple(profileTemplate).compose('profile-avatar', Avatar).compose('profile-link', Link);

profile = new Profile({
  data: {
    username: 'lmartins'
  }
});

profile.appendTo('.Page');

listTemplate = "<div class=\"ItemsList\">\n  <ul each=\"{{items}}\">\n    <li>\n      {{name}} <button on-click=\"{{ this.removeItem.bind(this, $index) }}\">Remove</button>\n    </li>\n  </ul>\n</div>";

List = ripple(listTemplate).use(events).use(each);

List.prototype.removeItem = function(index) {
  return this.data.items.splice(index, 1);
};

list = new List({
  data: {
    items: [
      {
        name: "Name1"
      }, {
        name: "Name2"
      }
    ]
  }
});

list.appendTo('.Page');

/*
//# sourceMappingURL=app.js.map
*/
