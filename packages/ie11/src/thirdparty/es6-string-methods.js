if (!String.prototype.startsWith) {
  (function () {
    "use strict";
    var toString = ({}).toString;
    var startsWith = function (search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == "[object RegExp]") {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var position = arguments.length > 1 ? arguments[1] : undefined;
      var pos = position ? Number(position) : 0;
      if (pos != pos) {
        pos = 0;
      }
      var start = Math.min(Math.max(pos, 0), stringLength);
      if (searchLength + start > stringLength) {
        return false;
      }
      var index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    Object.defineProperty(String.prototype, "startsWith", {
      "value": startsWith,
      "configurable": true,
      "writable": true
    });
  })();
}
if (!String.prototype.endsWith) {
  (function () {
    "use strict";
    var toString = ({}).toString;
    var endsWith = function (search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == "[object RegExp]") {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var pos = stringLength;
      if (arguments.length > 1) {
        var position = arguments[1];
        if (position !== undefined) {
          pos = position ? Number(position) : 0;
          if (pos != pos) {
            pos = 0;
          }
        }
      }
      var end = Math.min(Math.max(pos, 0), stringLength);
      var start = end - searchLength;
      if (start < 0) {
        return false;
      }
      var index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    Object.defineProperty(String.prototype, "endsWith", {
      "value": endsWith,
      "configurable": true,
      "writable": true
    });
  })();
}
if (!String.prototype.includes) {
  (function () {
    "use strict";
    var toString = ({}).toString;
    var indexOf = ("").indexOf;
    var includes = function (search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == "[object RegExp]") {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var position = arguments.length > 1 ? arguments[1] : undefined;
      var pos = position ? Number(position) : 0;
      if (pos != pos) {
        pos = 0;
      }
      var start = Math.min(Math.max(pos, 0), stringLength);
      if (searchLength + start > stringLength) {
        return false;
      }
      return indexOf.call(string, searchString, pos) != -1;
    };
    Object.defineProperty(String.prototype, "includes", {
      "value": includes,
      "configurable": true,
      "writable": true
    });
  })();
}
if (!String.prototype.repeat) {
  (function () {
    "use strict";
    var repeat = function (count) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var n = count ? Number(count) : 0;
      if (n != n) {
        n = 0;
      }
      if (n < 0 || n == Infinity) {
        throw RangeError();
      }
      var result = "";
      while (n) {
        if (n % 2 == 1) {
          result += string;
        }
        if (n > 1) {
          string += string;
        }
        n >>= 1;
      }
      return result;
    };
    Object.defineProperty(String.prototype, "repeat", {
      "value": repeat,
      "configurable": true,
      "writable": true
    });
  })();
}
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}
