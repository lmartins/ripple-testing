var CustomSMS, customSMSList, customSMSTemplate, each, events, refs, ripple;

ripple = require('ripple');

refs = require("refs");

events = require("events");

each = require("each");

customSMSTemplate = "<div class=\"SMSList\">\n  <div class=\"SMSList-add\">\n    <input type=\"text\" ref=\"number\" on-enter=\"{{ this.add }}\" />\n    <button on-click=\"{{ this.add }}\">Add</button>\n    <button on-click=\"{{ this.sort }}\" hidden=\"{{ emptyList }}\">Sort</button>\n    <button on-click=\"{{ this.clear }}\" hidden=\"{{ emptyList }}\">Remove All</button>\n  </div>\n  <div class=\"SMSList-list\">\n    <ul each=\"{{items}}\">\n      <li>{{number}} <button on-click=\"{{ this.removeItem.bind(this, $index) }}\">Remove</button></li>\n    </ul>\n    <div class=\"emptyList\" hidden=\"{{ !emptyList }}\">Empty List</div>\n  </div>\n</div>";

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
  return this.data.items.sort(function(a, b) {
    return a.data.number > b.data.number;
  });
};

CustomSMS.ready(function() {
  if (!this.data.items.length) {
    this.set('emptyList', true);
  } else {
    this.set('emptyList', false);
  }
  return this.data.items.on('change', (function(_this) {
    return function() {
      if (_this.data.items.length === 0) {
        return _this.set('emptyList', true);
      } else {
        return _this.set('emptyList', false);
      }
    };
  })(this));
});

customSMSList = new CustomSMS({
  data: {
    items: [
      {
        "number": "960000002"
      }, {
        "number": "960000001"
      }, {
        "number": "960000003"
      }
    ]
  }
});

customSMSList.appendTo('.Page');

/*
//# sourceMappingURL=phonesList.js.map
*/
