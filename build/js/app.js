var Avatar, CustomSMS, Link, List, Profile, customSMSList, customSMSTemplate, dispatch, each, events, list, listTemplate, observer, phoneList, profile, profileTemplate, refs, ripple;

ripple = require('ripple');

refs = require("refs");

events = require("events");

each = require("each");

dispatch = require("dispatch");

observer = require("array-observer");

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

customSMSTemplate = "<div class=\"SMSList\">\n  <div class=\"SMSList-add\">\n    <input type=\"text\" ref=\"number\" on-enter=\"{{ this.add }}\" />\n    <button on-click=\"{{ this.add }}\">Add</button>\n    <button on-click=\"{{ this.sort }}\">Sort</button>\n    <button on-click=\"{{ this.clear }}\">Remove All</button>\n  </div>\n  <ul each=\"{{items}}\" class=\"SMSList-list\">\n    <li>{{number}} <button on-click=\"{{ this.removeItem.bind(this, $index) }}\">Remove</button></li>\n  </ul>\n</div>";

CustomSMS = ripple(customSMSTemplate).use(each).use(events).use(refs);

CustomSMS.directive('on-enter', {
  update: function(fn, el, view) {
    var self;
    self = this;
    return el.addEventListener('keypress', (function(e) {
      if (e.which === 13) {
        return fn.call(view, e);
      }
    }), true);
  }
});

CustomSMS.prototype.removeItem = function(index) {
  return this.data.items.splice(index, 1);
};

CustomSMS.prototype.clear = function() {
  return this.data.items.splice(0, this.data.items.length);
};

CustomSMS.prototype.add = function() {
  this.data.items.push({
    number: this.refs.number.value
  });
  return this.refs.number.value = "";
};

CustomSMS.prototype.sort = function() {
  console.log("teste");
  return this.data.items.sort(function(a, b) {
    return a.data.number > b.data.number;
  });
};

phoneList = [
  {
    "number": "960000002"
  }, {
    "number": "960000001"
  }, {
    "number": "960000003"
  }
];

customSMSList = new CustomSMS({
  data: {
    items: phoneList
  }
});

observer = observer(phoneList);

observer.on('change', function(val) {
  return console.log(this);
});

customSMSList.appendTo('.Page');

/*
//# sourceMappingURL=app.js.map
*/
