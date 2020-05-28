(function (exports) {
    'use strict';

    /*!
     * css-vars-ponyfill
     * v2.1.2
     * https://jhildenbiddle.github.io/css-vars-ponyfill/
     * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
     * MIT license
     */
    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }
    /*!
     * get-css-data
     * v1.6.3
     * https://github.com/jhildenbiddle/get-css-data
     * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
     * MIT license
     */


    function getUrls(urls) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var settings = {
        mimeType: options.mimeType || null,
        onBeforeSend: options.onBeforeSend || Function.prototype,
        onSuccess: options.onSuccess || Function.prototype,
        onError: options.onError || Function.prototype,
        onComplete: options.onComplete || Function.prototype
      };
      var urlArray = Array.isArray(urls) ? urls : [urls];
      var urlQueue = Array.apply(null, Array(urlArray.length)).map(function (x) {
        return null;
      });

      function isValidCss() {
        var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var isHTML = cssText.trim().charAt(0) === "<";
        return !isHTML;
      }

      function onError(xhr, urlIndex) {
        settings.onError(xhr, urlArray[urlIndex], urlIndex);
      }

      function onSuccess(responseText, urlIndex) {
        var returnVal = settings.onSuccess(responseText, urlArray[urlIndex], urlIndex);
        responseText = returnVal === false ? "" : returnVal || responseText;
        urlQueue[urlIndex] = responseText;

        if (urlQueue.indexOf(null) === -1) {
          settings.onComplete(urlQueue);
        }
      }

      var parser = document.createElement("a");
      urlArray.forEach(function (url, i) {
        parser.setAttribute("href", url);
        parser.href = String(parser.href);
        var isIElte9 = Boolean(document.all && !window.atob);
        var isIElte9CORS = isIElte9 && parser.host.split(":")[0] !== location.host.split(":")[0];

        if (isIElte9CORS) {
          var isSameProtocol = parser.protocol === location.protocol;

          if (isSameProtocol) {
            var xdr = new XDomainRequest();
            xdr.open("GET", url);
            xdr.timeout = 0;
            xdr.onprogress = Function.prototype;
            xdr.ontimeout = Function.prototype;

            xdr.onload = function () {
              if (isValidCss(xdr.responseText)) {
                onSuccess(xdr.responseText, i);
              } else {
                onError(xdr, i);
              }
            };

            xdr.onerror = function (err) {
              onError(xdr, i);
            };

            setTimeout(function () {
              xdr.send();
            }, 0);
          } else {
            console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(url, ")"));
            onError(null, i);
          }
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);

          if (settings.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(settings.mimeType);
          }

          settings.onBeforeSend(xhr, url, i);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200 && isValidCss(xhr.responseText)) {
                onSuccess(xhr.responseText, i);
              } else {
                onError(xhr, i);
              }
            }
          };

          xhr.send();
        }
      });
    }
    /**
     * Gets CSS data from <style> and <link> nodes (including @imports), then
     * returns data in order processed by DOM. Allows specifying nodes to
     * include/exclude and filtering CSS data using RegEx.
     *
     * @preserve
     * @param {object}   [options] The options object
     * @param {object}   [options.rootElement=document] Root element to traverse for
     *                   <link> and <style> nodes.
     * @param {string}   [options.include] CSS selector matching <link> and <style>
     *                   nodes to include
     * @param {string}   [options.exclude] CSS selector matching <link> and <style>
     *                   nodes to exclude
     * @param {object}   [options.filter] Regular expression used to filter node CSS
     *                   data. Each block of CSS data is tested against the filter,
     *                   and only matching data is included.
     * @param {object}   [options.useCSSOM=false] Determines if CSS data will be
     *                   collected from a stylesheet's runtime values instead of its
     *                   text content. This is required to get accurate CSS data
     *                   when a stylesheet has been modified using the deleteRule()
     *                   or insertRule() methods because these modifications will
     *                   not be reflected in the stylesheet's text content.
     * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
     *                   1) the XHR object, 2) source node reference, and 3) the
     *                   source URL as arguments.
     * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
     *                   1) CSS text, 2) source node reference, and 3) the source
     *                   URL as arguments.
     * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
     *                   object for inspection, 2) soure node reference, and 3) the
     *                   source URL that failed (either a <link> href or an @import)
     *                   as arguments
     * @param {function} [options.onComplete] Callback after all nodes have been
     *                   processed. Passes 1) concatenated CSS text, 2) an array of
     *                   CSS text in DOM order, and 3) an array of nodes in DOM
     *                   order as arguments.
     *
     * @example
     *
     *   getCssData({
     *     rootElement: document,
     *     include    : 'style,link[rel="stylesheet"]',
     *     exclude    : '[href="skip.css"]',
     *     filter     : /red/,
     *     useCSSOM   : false,
     *     onBeforeSend(xhr, node, url) {
     *       // ...
     *     }
     *     onSuccess(cssText, node, url) {
     *       // ...
     *     }
     *     onError(xhr, node, url) {
     *       // ...
     *     },
     *     onComplete(cssText, cssArray, nodeArray) {
     *       // ...
     *     }
     *   });
     */


    function getCssData(options) {
      var regex = {
        cssComments: /\/\*[\s\S]+?\*\//g,
        cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
      };
      var settings = {
        rootElement: options.rootElement || document,
        include: options.include || 'style,link[rel="stylesheet"]',
        exclude: options.exclude || null,
        filter: options.filter || null,
        useCSSOM: options.useCSSOM || false,
        onBeforeSend: options.onBeforeSend || Function.prototype,
        onSuccess: options.onSuccess || Function.prototype,
        onError: options.onError || Function.prototype,
        onComplete: options.onComplete || Function.prototype
      };
      var sourceNodes = Array.apply(null, settings.rootElement.querySelectorAll(settings.include)).filter(function (node) {
        return !matchesSelector(node, settings.exclude);
      });
      var cssArray = Array.apply(null, Array(sourceNodes.length)).map(function (x) {
        return null;
      });

      function handleComplete() {
        var isComplete = cssArray.indexOf(null) === -1;

        if (isComplete) {
          var cssText = cssArray.join("");
          settings.onComplete(cssText, cssArray, sourceNodes);
        }
      }

      function handleSuccess(cssText, cssIndex, node, sourceUrl) {
        var returnVal = settings.onSuccess(cssText, node, sourceUrl);
        cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;
        resolveImports(cssText, node, sourceUrl, function (resolvedCssText, errorData) {
          if (cssArray[cssIndex] === null) {
            errorData.forEach(function (data) {
              return settings.onError(data.xhr, node, data.url);
            });

            if (!settings.filter || settings.filter.test(resolvedCssText)) {
              cssArray[cssIndex] = resolvedCssText;
            } else {
              cssArray[cssIndex] = "";
            }

            handleComplete();
          }
        });
      }

      function parseImportData(cssText, baseUrl) {
        var ignoreRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var importData = {};
        importData.rules = (cssText.replace(regex.cssComments, "").match(regex.cssImports) || []).filter(function (rule) {
          return ignoreRules.indexOf(rule) === -1;
        });
        importData.urls = importData.rules.map(function (rule) {
          return rule.replace(regex.cssImports, "$1");
        });
        importData.absoluteUrls = importData.urls.map(function (url) {
          return getFullUrl(url, baseUrl);
        });
        importData.absoluteRules = importData.rules.map(function (rule, i) {
          var oldUrl = importData.urls[i];
          var newUrl = getFullUrl(importData.absoluteUrls[i], baseUrl);
          return rule.replace(oldUrl, newUrl);
        });
        return importData;
      }

      function resolveImports(cssText, node, baseUrl, callbackFn) {
        var __errorData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        var __errorRules = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

        var importData = parseImportData(cssText, baseUrl, __errorRules);

        if (importData.rules.length) {
          getUrls(importData.absoluteUrls, {
            onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
              settings.onBeforeSend(xhr, node, url);
            },
            onSuccess: function onSuccess(cssText, url, urlIndex) {
              var returnVal = settings.onSuccess(cssText, node, url);
              cssText = returnVal === false ? "" : returnVal || cssText;
              var responseImportData = parseImportData(cssText, url, __errorRules);
              responseImportData.rules.forEach(function (rule, i) {
                cssText = cssText.replace(rule, responseImportData.absoluteRules[i]);
              });
              return cssText;
            },
            onError: function onError(xhr, url, urlIndex) {
              __errorData.push({
                xhr: xhr,
                url: url
              });

              __errorRules.push(importData.rules[urlIndex]);

              resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
            },
            onComplete: function onComplete(responseArray) {
              responseArray.forEach(function (importText, i) {
                cssText = cssText.replace(importData.rules[i], importText);
              });
              resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
            }
          });
        } else {
          callbackFn(cssText, __errorData);
        }
      }

      if (sourceNodes.length) {
        sourceNodes.forEach(function (node, i) {
          var linkHref = node.getAttribute("href");
          var linkRel = node.getAttribute("rel");
          var isLink = node.nodeName === "LINK" && linkHref && linkRel && linkRel.toLowerCase() === "stylesheet";
          var isStyle = node.nodeName === "STYLE";

          if (isLink) {
            getUrls(linkHref, {
              mimeType: "text/css",
              onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
                settings.onBeforeSend(xhr, node, url);
              },
              onSuccess: function onSuccess(cssText, url, urlIndex) {
                var sourceUrl = getFullUrl(linkHref, location.href);
                handleSuccess(cssText, i, node, sourceUrl);
              },
              onError: function onError(xhr, url, urlIndex) {
                cssArray[i] = "";
                settings.onError(xhr, node, url);
                handleComplete();
              }
            });
          } else if (isStyle) {
            var cssText = node.textContent;

            if (settings.useCSSOM) {
              cssText = Array.apply(null, node.sheet.cssRules).map(function (rule) {
                return rule.cssText;
              }).join("");
            }

            handleSuccess(cssText, i, node, location.href);
          } else {
            cssArray[i] = "";
            handleComplete();
          }
        });
      } else {
        settings.onComplete("", []);
      }
    }

    function getFullUrl(url) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
      var d = document.implementation.createHTMLDocument("");
      var b = d.createElement("base");
      var a = d.createElement("a");
      d.head.appendChild(b);
      d.body.appendChild(a);
      b.href = base;
      a.href = url;
      return a.href;
    }

    function matchesSelector(elm, selector) {
      var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
      return matches.call(elm, selector);
    }

    var balancedMatch = balanced;

    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }

    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }

    balanced.range = range;

    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;

      if (ai >= 0 && bi > 0) {
        begs = [];
        left = str.length;

        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();

            if (beg < left) {
              left = beg;
              right = bi;
            }

            bi = str.indexOf(b, i + 1);
          }

          i = ai < bi && ai >= 0 ? ai : bi;
        }

        if (begs.length) {
          result = [left, right];
        }
      }

      return result;
    }

    function parseCss(css) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaults = {
        preserveStatic: true,
        removeComments: false
      };

      var settings = _extends({}, defaults, options);

      var errors = [];

      function error(msg) {
        throw new Error("CSS parse error: ".concat(msg));
      }

      function match(re) {
        var m = re.exec(css);

        if (m) {
          css = css.slice(m[0].length);
          return m;
        }
      }

      function open() {
        return match(/^{\s*/);
      }

      function close() {
        return match(/^}/);
      }

      function whitespace() {
        match(/^\s*/);
      }

      function comment() {
        whitespace();

        if (css[0] !== "/" || css[1] !== "*") {
          return;
        }

        var i = 2;

        while (css[i] && (css[i] !== "*" || css[i + 1] !== "/")) {
          i++;
        }

        if (!css[i]) {
          return error("end of comment is missing");
        }

        var str = css.slice(2, i);
        css = css.slice(i + 2);
        return {
          type: "comment",
          comment: str
        };
      }

      function comments() {
        var cmnts = [];
        var c;

        while (c = comment()) {
          cmnts.push(c);
        }

        return settings.removeComments ? [] : cmnts;
      }

      function selector() {
        whitespace();

        while (css[0] === "}") {
          error("extra closing bracket");
        }

        var m = match(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);

        if (m) {
          return m[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
            return m.replace(/,/g, "‌");
          }).split(/\s*(?![^(]*\)),\s*/).map(function (s) {
            return s.replace(/\u200C/g, ",");
          });
        }
      }

      function declaration() {
        match(/^([;\s]*)+/);
        var comment_regexp = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g;
        var prop = match(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);

        if (!prop) {
          return;
        }

        prop = prop[0].trim();

        if (!match(/^:\s*/)) {
          return error("property missing ':'");
        }

        var val = match(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/);
        var ret = {
          type: "declaration",
          property: prop.replace(comment_regexp, ""),
          value: val ? val[0].replace(comment_regexp, "").trim() : ""
        };
        match(/^[;\s]*/);
        return ret;
      }

      function declarations() {
        if (!open()) {
          return error("missing '{'");
        }

        var d;
        var decls = comments();

        while (d = declaration()) {
          decls.push(d);
          decls = decls.concat(comments());
        }

        if (!close()) {
          return error("missing '}'");
        }

        return decls;
      }

      function keyframe() {
        whitespace();
        var vals = [];
        var m;

        while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
          vals.push(m[1]);
          match(/^,\s*/);
        }

        if (vals.length) {
          return {
            type: "keyframe",
            values: vals,
            declarations: declarations()
          };
        }
      }

      function at_keyframes() {
        var m = match(/^@([-\w]+)?keyframes\s*/);

        if (!m) {
          return;
        }

        var vendor = m[1];
        m = match(/^([-\w]+)\s*/);

        if (!m) {
          return error("@keyframes missing name");
        }

        var name = m[1];

        if (!open()) {
          return error("@keyframes missing '{'");
        }

        var frame;
        var frames = comments();

        while (frame = keyframe()) {
          frames.push(frame);
          frames = frames.concat(comments());
        }

        if (!close()) {
          return error("@keyframes missing '}'");
        }

        return {
          type: "keyframes",
          name: name,
          vendor: vendor,
          keyframes: frames
        };
      }

      function at_page() {
        var m = match(/^@page */);

        if (m) {
          var sel = selector() || [];
          return {
            type: "page",
            selectors: sel,
            declarations: declarations()
          };
        }
      }

      function at_fontface() {
        var m = match(/^@font-face\s*/);

        if (m) {
          return {
            type: "font-face",
            declarations: declarations()
          };
        }
      }

      function at_supports() {
        var m = match(/^@supports *([^{]+)/);

        if (m) {
          return {
            type: "supports",
            supports: m[1].trim(),
            rules: rules()
          };
        }
      }

      function at_host() {
        var m = match(/^@host\s*/);

        if (m) {
          return {
            type: "host",
            rules: rules()
          };
        }
      }

      function at_media() {
        var m = match(/^@media([^{]+)*/);

        if (m) {
          return {
            type: "media",
            media: (m[1] || "").trim(),
            rules: rules()
          };
        }
      }

      function at_custom_m() {
        var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);

        if (m) {
          return {
            type: "custom-media",
            name: m[1].trim(),
            media: m[2].trim()
          };
        }
      }

      function at_document() {
        var m = match(/^@([-\w]+)?document *([^{]+)/);

        if (m) {
          return {
            type: "document",
            document: m[2].trim(),
            vendor: m[1] ? m[1].trim() : null,
            rules: rules()
          };
        }
      }

      function at_x() {
        var m = match(/^@(import|charset|namespace)\s*([^;]+);/);

        if (m) {
          return {
            type: m[1],
            name: m[2].trim()
          };
        }
      }

      function at_rule() {
        whitespace();

        if (css[0] === "@") {
          var ret = at_keyframes() || at_supports() || at_host() || at_media() || at_custom_m() || at_page() || at_document() || at_fontface() || at_x();

          if (ret && !settings.preserveStatic) {
            var hasVarFunc = false;

            if (ret.declarations) {
              hasVarFunc = ret.declarations.some(function (decl) {
                return /var\(/.test(decl.value);
              });
            } else {
              var arr = ret.keyframes || ret.rules || [];
              hasVarFunc = arr.some(function (obj) {
                return (obj.declarations || []).some(function (decl) {
                  return /var\(/.test(decl.value);
                });
              });
            }

            return hasVarFunc ? ret : {};
          }

          return ret;
        }
      }

      function rule() {
        if (!settings.preserveStatic) {
          var balancedMatch$1 = balancedMatch("{", "}", css);

          if (balancedMatch$1) {
            var hasVarDecl = /:(?:root|host)(?![.:#(])/.test(balancedMatch$1.pre) && /--\S*\s*:/.test(balancedMatch$1.body);
            var hasVarFunc = /var\(/.test(balancedMatch$1.body);

            if (!hasVarDecl && !hasVarFunc) {
              css = css.slice(balancedMatch$1.end + 1);
              return {};
            }
          }
        }

        var sel = selector() || [];
        var decls = settings.preserveStatic ? declarations() : declarations().filter(function (decl) {
          var hasVarDecl = sel.some(function (s) {
            return /:(?:root|host)(?![.:#(])/.test(s);
          }) && /^--\S/.test(decl.property);
          var hasVarFunc = /var\(/.test(decl.value);
          return hasVarDecl || hasVarFunc;
        });

        if (!sel.length) {
          error("selector missing");
        }

        return {
          type: "rule",
          selectors: sel,
          declarations: decls
        };
      }

      function rules(core) {
        if (!core && !open()) {
          return error("missing '{'");
        }

        var node;
        var rules = comments();

        while (css.length && (core || css[0] !== "}") && (node = at_rule() || rule())) {
          if (node.type) {
            rules.push(node);
          }

          rules = rules.concat(comments());
        }

        if (!core && !close()) {
          return error("missing '}'");
        }

        return rules;
      }

      return {
        type: "stylesheet",
        stylesheet: {
          rules: rules(true),
          errors: errors
        }
      };
    }

    function parseVars(cssData) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaults = {
        parseHost: false,
        store: {},
        onWarning: function onWarning() {}
      };

      var settings = _extends({}, defaults, options);

      var reVarDeclSelectors = new RegExp(":".concat(settings.parseHost ? "host" : "root", "(?![.:#(])"));

      if (typeof cssData === "string") {
        cssData = parseCss(cssData, settings);
      }

      cssData.stylesheet.rules.forEach(function (rule) {
        if (rule.type !== "rule" || !rule.selectors.some(function (s) {
          return reVarDeclSelectors.test(s);
        })) {
          return;
        }

        rule.declarations.forEach(function (decl, i) {
          var prop = decl.property;
          var value = decl.value;

          if (prop && prop.indexOf("--") === 0) {
            settings.store[prop] = value;
          }
        });
      });
      return settings.store;
    }

    function stringifyCss(tree) {
      var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var cb = arguments.length > 2 ? arguments[2] : undefined;
      var renderMethods = {
        charset: function charset(node) {
          return "@charset " + node.name + ";";
        },
        comment: function comment(node) {
          return node.comment.indexOf("__CSSVARSPONYFILL") === 0 ? "/*" + node.comment + "*/" : "";
        },
        "custom-media": function customMedia(node) {
          return "@custom-media " + node.name + " " + node.media + ";";
        },
        declaration: function declaration(node) {
          return node.property + ":" + node.value + ";";
        },
        document: function document(node) {
          return "@" + (node.vendor || "") + "document " + node.document + "{" + visit(node.rules) + "}";
        },
        "font-face": function fontFace(node) {
          return "@font-face" + "{" + visit(node.declarations) + "}";
        },
        host: function host(node) {
          return "@host" + "{" + visit(node.rules) + "}";
        },
        "import": function _import(node) {
          return "@import " + node.name + ";";
        },
        keyframe: function keyframe(node) {
          return node.values.join(",") + "{" + visit(node.declarations) + "}";
        },
        keyframes: function keyframes(node) {
          return "@" + (node.vendor || "") + "keyframes " + node.name + "{" + visit(node.keyframes) + "}";
        },
        media: function media(node) {
          return "@media " + node.media + "{" + visit(node.rules) + "}";
        },
        namespace: function namespace(node) {
          return "@namespace " + node.name + ";";
        },
        page: function page(node) {
          return "@page " + (node.selectors.length ? node.selectors.join(", ") : "") + "{" + visit(node.declarations) + "}";
        },
        rule: function rule(node) {
          var decls = node.declarations;

          if (decls.length) {
            return node.selectors.join(",") + "{" + visit(decls) + "}";
          }
        },
        supports: function supports(node) {
          return "@supports " + node.supports + "{" + visit(node.rules) + "}";
        }
      };

      function visit(nodes) {
        var buf = "";

        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];

          if (cb) {
            cb(n);
          }

          var txt = renderMethods[n.type](n);

          if (txt) {
            buf += txt;

            if (txt.length && n.selectors) {
              buf += delim;
            }
          }
        }

        return buf;
      }

      return visit(tree.stylesheet.rules);
    }

    function walkCss(node, fn) {
      node.rules.forEach(function (rule) {
        if (rule.rules) {
          walkCss(rule, fn);
          return;
        }

        if (rule.keyframes) {
          rule.keyframes.forEach(function (keyframe) {
            if (keyframe.type === "keyframe") {
              fn(keyframe.declarations, rule);
            }
          });
          return;
        }

        if (!rule.declarations) {
          return;
        }

        fn(rule.declarations, node);
      });
    }

    var VAR_PROP_IDENTIFIER = "--";
    var VAR_FUNC_IDENTIFIER = "var";

    function transformCss(cssData) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaults = {
        preserveStatic: true,
        preserveVars: false,
        variables: {},
        onWarning: function onWarning() {}
      };

      var settings = _extends({}, defaults, options);

      if (typeof cssData === "string") {
        cssData = parseCss(cssData, settings);
      }

      walkCss(cssData.stylesheet, function (declarations, node) {
        for (var i = 0; i < declarations.length; i++) {
          var decl = declarations[i];
          var type = decl.type;
          var prop = decl.property;
          var value = decl.value;

          if (type !== "declaration") {
            continue;
          }

          if (!settings.preserveVars && prop && prop.indexOf(VAR_PROP_IDENTIFIER) === 0) {
            declarations.splice(i, 1);
            i--;
            continue;
          }

          if (value.indexOf(VAR_FUNC_IDENTIFIER + "(") !== -1) {
            var resolvedValue = resolveValue(value, settings);

            if (resolvedValue !== decl.value) {
              resolvedValue = fixNestedCalc(resolvedValue);

              if (!settings.preserveVars) {
                decl.value = resolvedValue;
              } else {
                declarations.splice(i, 0, {
                  type: type,
                  property: prop,
                  value: resolvedValue
                });
                i++;
              }
            }
          }
        }
      });
      return stringifyCss(cssData);
    }

    function fixNestedCalc(value) {
      var reCalcVal = /calc\(([^)]+)\)/g;
      (value.match(reCalcVal) || []).forEach(function (match) {
        var newVal = "calc".concat(match.split("calc").join(""));
        value = value.replace(match, newVal);
      });
      return value;
    }

    function resolveValue(value) {
      var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var __recursiveFallback = arguments.length > 2 ? arguments[2] : undefined;

      if (value.indexOf("var(") === -1) {
        return value;
      }

      var valueData = balancedMatch("(", ")", value);

      function resolveFunc(value) {
        var name = value.split(",")[0].replace(/[\s\n\t]/g, "");
        var fallback = (value.match(/(?:\s*,\s*){1}(.*)?/) || [])[1];
        var match = Object.prototype.hasOwnProperty.call(settings.variables, name) ? String(settings.variables[name]) : undefined;
        var replacement = match || (fallback ? String(fallback) : undefined);
        var unresolvedFallback = __recursiveFallback || value;

        if (!match) {
          settings.onWarning('variable "'.concat(name, '" is undefined'));
        }

        if (replacement && replacement !== "undefined" && replacement.length > 0) {
          return resolveValue(replacement, settings, unresolvedFallback);
        } else {
          return "var(".concat(unresolvedFallback, ")");
        }
      }

      if (!valueData) {
        if (value.indexOf("var(") !== -1) {
          settings.onWarning('missing closing ")" in the value "'.concat(value, '"'));
        }

        return value;
      } else if (valueData.pre.slice(-3) === "var") {
        var isEmptyVarFunc = valueData.body.trim().length === 0;

        if (isEmptyVarFunc) {
          settings.onWarning("var() must contain a non-whitespace string");
          return value;
        } else {
          return valueData.pre.slice(0, -3) + resolveFunc(valueData.body) + resolveValue(valueData.post, settings);
        }
      } else {
        return valueData.pre + "(".concat(resolveValue(valueData.body, settings), ")") + resolveValue(valueData.post, settings);
      }
    }

    var isBrowser = typeof window !== "undefined";
    var isNativeSupport = isBrowser && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)");
    var counters = {
      group: 0,
      job: 0
    };
    var defaults = {
      rootElement: isBrowser ? document : null,
      shadowDOM: false,
      include: "style,link[rel=stylesheet]",
      exclude: "",
      variables: {},
      onlyLegacy: true,
      preserveStatic: true,
      preserveVars: false,
      silent: false,
      updateDOM: true,
      updateURLs: true,
      watch: null,
      onBeforeSend: function onBeforeSend() {},
      onWarning: function onWarning() {},
      onError: function onError() {},
      onSuccess: function onSuccess() {},
      onComplete: function onComplete() {}
    };
    var regex = {
      cssComments: /\/\*[\s\S]+?\*\//g,
      cssKeyframes: /@(?:-\w*-)?keyframes/,
      cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
      cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
      cssVarDeclRules: /(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
      cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
      cssVarFunc: /var\(\s*--[\w-]/,
      cssVars: /(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
    };
    var variableStore = {
      dom: {},
      job: {},
      user: {}
    };
    var cssVarsIsRunning = false;
    var cssVarsObserver = null;
    var cssVarsSrcNodeCount = 0;
    var debounceTimer = null;
    var isShadowDOMReady = false;
    /**
     * Fetches, parses, and transforms CSS custom properties from specified
     * <style> and <link> elements into static values, then appends a new <style>
     * element with static values to the DOM to provide CSS custom property
     * compatibility for legacy browsers. Also provides a single interface for
     * live updates of runtime values in both modern and legacy browsers.
     *
     * @preserve
     * @param {object}   [options] Options object
     * @param {object}   [options.rootElement=document] Root element to traverse for
     *                   <link> and <style> nodes
     * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
     *                   and <style> nodes will be processed.
     * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
     *                   matching <link re="stylesheet"> and <style> nodes to
     *                   process
     * @param {string}   [options.exclude] CSS selector matching <link
     *                   rel="stylehseet"> and <style> nodes to exclude from those
     *                   matches by options.include
     * @param {object}   [options.variables] A map of custom property name/value
     *                   pairs. Property names can omit or include the leading
     *                   double-hyphen (—), and values specified will override
     *                   previous values
     * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
     *                   only generate legacy-compatible CSS in browsers that lack
     *                   native support (i.e., legacy browsers)
     * @param {boolean}  [options.preserveStatic=true] Determines if CSS
     *                   declarations that do not reference a custom property will
     *                   be preserved in the transformed CSS
     * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
     *                   property declarations will be preserved in the transformed
     *                   CSS
     * @param {boolean}  [options.silent=false] Determines if warning and error
     *                   messages will be displayed on the console
     * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
     *                   update the DOM after processing CSS custom properties
     * @param {boolean}  [options.updateURLs=true] Determines if the ponyfill will
     *                   convert relative url() paths to absolute urls
     * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
     *                   be created that will execute the ponyfill when a <link> or
     *                   <style> DOM mutation is observed
     * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
     *                   1) the XHR object, 2) source node reference, and 3) the
     *                   source URL as arguments
     * @param {function} [options.onWarning] Callback after each CSS parsing warning
     *                   has occurred. Passes 1) a warning message as an argument.
     * @param {function} [options.onError] Callback after a CSS parsing error has
     *                   occurred or an XHR request has failed. Passes 1) an error
     *                   message, and 2) source node reference, 3) xhr, and 4 url as
     *                   arguments.
     * @param {function} [options.onSuccess] Callback after CSS data has been
     *                   collected from each node and before CSS custom properties
     *                   have been transformed. Allows modifying the CSS data before
     *                   it is transformed by returning any string value (or false
     *                   to skip). Passes 1) CSS text, 2) source node reference, and
     *                   3) the source URL as arguments.
     * @param {function} [options.onComplete] Callback after all CSS has been
     *                   processed, legacy-compatible CSS has been generated, and
     *                   (optionally) the DOM has been updated. Passes 1) a CSS
     *                   string with CSS variable values resolved, 2) an array of
     *                   output <style> node references that have been appended to
     *                   the DOM, 3) an object containing all custom properies names
     *                   and values, and 4) the ponyfill execution time in
     *                   milliseconds.
     *
     * @example
     *
     *   cssVars({
     *     rootElement   : document,
     *     shadowDOM     : false,
     *     include       : 'style,link[rel="stylesheet"]',
     *     exclude       : '',
     *     variables     : {},
     *     onlyLegacy    : true,
     *     preserveStatic: true,
     *     preserveVars  : false,
     *     silent        : false,
     *     updateDOM     : true,
     *     updateURLs    : true,
     *     watch         : false,
     *     onBeforeSend(xhr, node, url) {},
     *     onWarning(message) {},
     *     onError(message, node, xhr, url) {},
     *     onSuccess(cssText, node, url) {},
     *     onComplete(cssText, styleNode, cssVariables, benchmark) {}
     *   });
     */

    function cssVars() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var msgPrefix = "cssVars(): ";

      var settings = _extends({}, defaults, options);

      function handleError(message, sourceNode, xhr, url) {
        if (!settings.silent && window.console) {
          console.error("".concat(msgPrefix).concat(message, "\n"), sourceNode);
        }

        settings.onError(message, sourceNode, xhr, url);
      }

      function handleWarning(message) {
        if (!settings.silent && window.console) {
          console.warn("".concat(msgPrefix).concat(message));
        }

        settings.onWarning(message);
      }

      if (!isBrowser) {
        return;
      }

      if (settings.watch) {
        settings.watch = defaults.watch;
        addMutationObserver(settings);
        cssVars(settings);
        return;
      } else if (settings.watch === false && cssVarsObserver) {
        cssVarsObserver.disconnect();
        cssVarsObserver = null;
      }

      if (!settings.__benchmark) {
        if (cssVarsIsRunning === settings.rootElement) {
          cssVarsDebounced(options);
          return;
        }

        settings.__benchmark = getTimeStamp();
        settings.exclude = [cssVarsObserver ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', settings.exclude].filter(function (selector) {
          return selector;
        }).join(",");
        settings.variables = fixVarNames(settings.variables);

        if (!cssVarsObserver) {
          var outNodes = Array.apply(null, settings.rootElement.querySelectorAll('[data-cssvars="out"]'));
          outNodes.forEach(function (outNode) {
            var dataGroup = outNode.getAttribute("data-cssvars-group");
            var srcNode = dataGroup ? settings.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(dataGroup, '"]')) : null;

            if (!srcNode) {
              outNode.parentNode.removeChild(outNode);
            }
          });

          if (cssVarsSrcNodeCount) {
            var srcNodes = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');

            if (srcNodes.length < cssVarsSrcNodeCount) {
              cssVarsSrcNodeCount = srcNodes.length;
              variableStore.dom = {};
            }
          }
        }
      }

      if (document.readyState !== "loading") {
        if (isNativeSupport && settings.onlyLegacy) {
          if (settings.updateDOM) {
            var targetElm = settings.rootElement.host || (settings.rootElement === document ? document.documentElement : settings.rootElement);
            Object.keys(settings.variables).forEach(function (key) {
              targetElm.style.setProperty(key, settings.variables[key]);
            });
          }
        } else if (!isShadowDOMReady && (settings.shadowDOM || settings.rootElement.shadowRoot || settings.rootElement.host)) {
          getCssData({
            rootElement: defaults.rootElement,
            include: defaults.include,
            exclude: settings.exclude,
            onSuccess: function onSuccess(cssText, node, url) {
              cssText = cssText.replace(regex.cssComments, "").replace(regex.cssMediaQueries, "");
              cssText = (cssText.match(regex.cssVarDeclRules) || []).join("");
              return cssText || false;
            },
            onComplete: function onComplete(cssText, cssArray, nodeArray) {
              parseVars(cssText, {
                store: variableStore.dom,
                onWarning: handleWarning
              });
              isShadowDOMReady = true;
              cssVars(settings);
            }
          });
        } else {
          cssVarsIsRunning = settings.rootElement;
          getCssData({
            rootElement: settings.rootElement,
            include: settings.include,
            exclude: settings.exclude,
            onBeforeSend: settings.onBeforeSend,
            onError: function onError(xhr, node, url) {
              var responseUrl = xhr.responseURL || getFullUrl$1(url, location.href);
              var statusText = xhr.statusText ? "(".concat(xhr.statusText, ")") : "Unspecified Error" + (xhr.status === 0 ? " (possibly CORS related)" : "");
              var errorMsg = "CSS XHR Error: ".concat(responseUrl, " ").concat(xhr.status, " ").concat(statusText);
              handleError(errorMsg, node, xhr, responseUrl);
            },
            onSuccess: function onSuccess(cssText, node, url) {
              var returnVal = settings.onSuccess(cssText, node, url);
              cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;

              if (settings.updateURLs) {
                cssText = fixRelativeCssUrls(cssText, url);
              }

              return cssText;
            },
            onComplete: function onComplete(cssText, cssArray) {
              var nodeArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
              var jobVars = {};
              var varStore = settings.updateDOM ? variableStore.dom : Object.keys(variableStore.job).length ? variableStore.job : variableStore.job = JSON.parse(JSON.stringify(variableStore.dom));
              var hasVarChange = false;
              nodeArray.forEach(function (node, i) {
                if (regex.cssVars.test(cssArray[i])) {
                  try {
                    var cssTree = parseCss(cssArray[i], {
                      preserveStatic: settings.preserveStatic,
                      removeComments: true
                    });
                    parseVars(cssTree, {
                      parseHost: Boolean(settings.rootElement.host),
                      store: jobVars,
                      onWarning: handleWarning
                    });
                    node.__cssVars = {
                      tree: cssTree
                    };
                  } catch (err) {
                    handleError(err.message, node);
                  }
                }
              });

              if (settings.updateDOM) {
                _extends(variableStore.user, settings.variables);
              }

              _extends(jobVars, settings.variables);

              hasVarChange = Boolean((document.querySelector("[data-cssvars]") || Object.keys(variableStore.dom).length) && Object.keys(jobVars).some(function (name) {
                return jobVars[name] !== varStore[name];
              }));

              _extends(varStore, variableStore.user, jobVars);

              if (hasVarChange) {
                resetCssNodes(settings.rootElement);
                cssVars(settings);
              } else {
                var outCssArray = [];
                var outNodeArray = [];
                var hasKeyframesWithVars = false;
                variableStore.job = {};

                if (settings.updateDOM) {
                  counters.job++;
                }

                nodeArray.forEach(function (node) {
                  var isSkip = !node.__cssVars;

                  if (node.__cssVars) {
                    try {
                      transformCss(node.__cssVars.tree, _extends({}, settings, {
                        variables: varStore,
                        onWarning: handleWarning
                      }));
                      var outCss = stringifyCss(node.__cssVars.tree);

                      if (settings.updateDOM) {
                        if (!node.getAttribute("data-cssvars")) {
                          node.setAttribute("data-cssvars", "src");
                        }

                        if (outCss.length) {
                          var dataGroup = node.getAttribute("data-cssvars-group") || ++counters.group;
                          var outCssNoSpaces = outCss.replace(/\s/g, "");
                          var outNode = settings.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(dataGroup, '"]')) || document.createElement("style");
                          hasKeyframesWithVars = hasKeyframesWithVars || regex.cssKeyframes.test(outCss);

                          if (!outNode.hasAttribute("data-cssvars")) {
                            outNode.setAttribute("data-cssvars", "out");
                          }

                          if (outCssNoSpaces === node.textContent.replace(/\s/g, "")) {
                            isSkip = true;

                            if (outNode && outNode.parentNode) {
                              node.removeAttribute("data-cssvars-group");
                              outNode.parentNode.removeChild(outNode);
                            }
                          } else if (outCssNoSpaces !== outNode.textContent.replace(/\s/g, "")) {
                            [node, outNode].forEach(function (n) {
                              n.setAttribute("data-cssvars-job", counters.job);
                              n.setAttribute("data-cssvars-group", dataGroup);
                            });
                            outNode.textContent = outCss;
                            outCssArray.push(outCss);
                            outNodeArray.push(outNode);

                            if (!outNode.parentNode) {
                              node.parentNode.insertBefore(outNode, node.nextSibling);
                            }
                          }
                        }
                      } else {
                        if (node.textContent.replace(/\s/g, "") !== outCss) {
                          outCssArray.push(outCss);
                        }
                      }
                    } catch (err) {
                      handleError(err.message, node);
                    }
                  }

                  if (isSkip) {
                    node.setAttribute("data-cssvars", "skip");
                  }

                  if (!node.hasAttribute("data-cssvars-job")) {
                    node.setAttribute("data-cssvars-job", counters.job);
                  }
                });
                cssVarsSrcNodeCount = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length;

                if (settings.shadowDOM) {
                  var elms = [settings.rootElement].concat(_toConsumableArray(settings.rootElement.querySelectorAll("*")));

                  for (var i = 0, elm; elm = elms[i]; ++i) {
                    if (elm.shadowRoot && elm.shadowRoot.querySelector("style")) {
                      var shadowSettings = _extends({}, settings, {
                        rootElement: elm.shadowRoot
                      });

                      cssVars(shadowSettings);
                    }
                  }
                }

                if (settings.updateDOM && hasKeyframesWithVars) {
                  fixKeyframes(settings.rootElement);
                }

                cssVarsIsRunning = false;
                settings.onComplete(outCssArray.join(""), outNodeArray, JSON.parse(JSON.stringify(varStore)), getTimeStamp() - settings.__benchmark);
              }
            }
          });
        }
      } else {
        document.addEventListener("DOMContentLoaded", function init(evt) {
          cssVars(options);
          document.removeEventListener("DOMContentLoaded", init);
        });
      }
    }

    cssVars.reset = function () {
      cssVarsIsRunning = false;

      if (cssVarsObserver) {
        cssVarsObserver.disconnect();
        cssVarsObserver = null;
      }

      cssVarsSrcNodeCount = 0;
      debounceTimer = null;
      isShadowDOMReady = false;

      for (var prop in variableStore) {
        variableStore[prop] = {};
      }
    };

    function addMutationObserver(settings) {
      function isLink(node) {
        var isStylesheet = node.tagName === "LINK" && (node.getAttribute("rel") || "").indexOf("stylesheet") !== -1;
        return isStylesheet && !node.disabled;
      }

      function isStyle(node) {
        return node.tagName === "STYLE" && !node.disabled;
      }

      function isValidAddMutation(mutationNodes) {
        return Array.apply(null, mutationNodes).some(function (node) {
          var isElm = node.nodeType === 1;
          var hasAttr = isElm && node.hasAttribute("data-cssvars");
          var isStyleWithVars = isStyle(node) && regex.cssVars.test(node.textContent);
          var isValid = !hasAttr && (isLink(node) || isStyleWithVars);
          return isValid;
        });
      }

      function isValidRemoveMutation(mutationNodes) {
        return Array.apply(null, mutationNodes).some(function (node) {
          var isElm = node.nodeType === 1;
          var isOutNode = isElm && node.getAttribute("data-cssvars") === "out";
          var isSrcNode = isElm && node.getAttribute("data-cssvars") === "src";
          var isValid = isSrcNode;

          if (isSrcNode || isOutNode) {
            var dataGroup = node.getAttribute("data-cssvars-group");
            var orphanNode = settings.rootElement.querySelector('[data-cssvars-group="'.concat(dataGroup, '"]'));

            if (isSrcNode) {
              resetCssNodes(settings.rootElement);
              variableStore.dom = {};
            }

            if (orphanNode) {
              orphanNode.parentNode.removeChild(orphanNode);
            }
          }

          return isValid;
        });
      }

      if (!window.MutationObserver) {
        return;
      }

      if (cssVarsObserver) {
        cssVarsObserver.disconnect();
        cssVarsObserver = null;
      }

      cssVarsObserver = new MutationObserver(function (mutations) {
        var hasValidMutation = mutations.some(function (mutation) {
          var isValid = false;

          if (mutation.type === "attributes") {
            isValid = isLink(mutation.target);
          } else if (mutation.type === "childList") {
            isValid = isValidAddMutation(mutation.addedNodes) || isValidRemoveMutation(mutation.removedNodes);
          }

          return isValid;
        });

        if (hasValidMutation) {
          cssVars(settings);
        }
      });
      cssVarsObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["disabled", "href"],
        childList: true,
        subtree: true
      });
    }

    function cssVarsDebounced(settings) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        settings.__benchmark = null;
        cssVars(settings);
      }, delay);
    }

    function fixKeyframes(rootElement) {
      var animationNameProp = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (prop) {
        return getComputedStyle(document.body)[prop];
      })[0];

      if (animationNameProp) {
        var allNodes = rootElement.getElementsByTagName("*");
        var keyframeNodes = [];
        var nameMarker = "__CSSVARSPONYFILL-KEYFRAMES__";

        for (var i = 0, len = allNodes.length; i < len; i++) {
          var node = allNodes[i];
          var animationName = getComputedStyle(node)[animationNameProp];

          if (animationName !== "none") {
            node.style[animationNameProp] += nameMarker;
            keyframeNodes.push(node);
          }
        }

        void document.body.offsetHeight;

        for (var _i = 0, _len = keyframeNodes.length; _i < _len; _i++) {
          var nodeStyle = keyframeNodes[_i].style;
          nodeStyle[animationNameProp] = nodeStyle[animationNameProp].replace(nameMarker, "");
        }
      }
    }

    function fixRelativeCssUrls(cssText, baseUrl) {
      var cssUrls = cssText.replace(regex.cssComments, "").match(regex.cssUrls) || [];
      cssUrls.forEach(function (cssUrl) {
        var oldUrl = cssUrl.replace(regex.cssUrls, "$1");
        var newUrl = getFullUrl$1(oldUrl, baseUrl);
        cssText = cssText.replace(cssUrl, cssUrl.replace(oldUrl, newUrl));
      });
      return cssText;
    }

    function fixVarNames() {
      var varObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var reLeadingHyphens = /^-{2}/;
      return Object.keys(varObj).reduce(function (obj, value) {
        var key = reLeadingHyphens.test(value) ? value : "--".concat(value.replace(/^-+/, ""));
        obj[key] = varObj[value];
        return obj;
      }, {});
    }

    function getFullUrl$1(url) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
      var d = document.implementation.createHTMLDocument("");
      var b = d.createElement("base");
      var a = d.createElement("a");
      d.head.appendChild(b);
      d.body.appendChild(a);
      b.href = base;
      a.href = url;
      return a.href;
    }

    function getTimeStamp() {
      return isBrowser && (window.performance || {}).now ? window.performance.now() : new Date().getTime();
    }

    function resetCssNodes(rootElement) {
      var resetNodes = Array.apply(null, rootElement.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));
      resetNodes.forEach(function (node) {
        return node.setAttribute("data-cssvars", "");
      });
    }

    if (!String.prototype.startsWith) {
      (function () {

        var toString = {}.toString;

        var startsWith = function startsWith(search) {
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

        var toString = {}.toString;

        var endsWith = function endsWith(search) {
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

        var toString = {}.toString;
        var indexOf = "".indexOf;

        var includes = function includes(search) {
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

        var repeat = function repeat(count) {
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

    if (!Object.entries) {
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array

        while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }

        return resArray;
      };
    }

    if (!Array.prototype.fill) {
      Object.defineProperty(Array.prototype, 'fill', {
        value: function value(_value) {
          // Steps 1-2.
          if (this == null) {
            throw new TypeError('this is null or not defined');
          }

          var O = Object(this); // Steps 3-5.

          var len = O.length >>> 0; // Steps 6-7.

          var start = arguments[1];
          var relativeStart = start >> 0; // Step 8.

          var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

          var end = arguments[2];
          var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

          var _final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.


          while (k < _final) {
            O[k] = _value;
            k++;
          } // Step 13.


          return O;
        }
      });
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
          // 1. Let O be ? ToObject(this value).
          if (this == null) {
            throw TypeError('"this" is null or not defined');
          }

          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

          if (typeof predicate !== 'function') {
            throw TypeError('predicate must be a function');
          } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


          var thisArg = arguments[1]; // 5. Let k be 0.

          var k = 0; // 6. Repeat, while k < len

          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            // d. If testResult is true, return kValue.
            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            } // e. Increase k by 1.


            k++;
          } // 7. Return undefined.


          return undefined;
        },
        configurable: true,
        writable: true
      });
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
        value: function value(searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          } // 1. Let O be ? ToObject(this value).


          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If len is 0, return false.

          if (len === 0) {
            return false;
          } // 4. Let n be ? ToInteger(fromIndex).
          //    (If fromIndex is undefined, this step produces the value 0.)


          var n = fromIndex | 0; // 5. If n ≥ 0, then
          //  a. Let k be n.
          // 6. Else n < 0,
          //  a. Let k be len + n.
          //  b. If k < 0, let k be 0.

          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          function sameValueZero(x, y) {
            return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
          } // 7. Repeat, while k < len


          while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            if (sameValueZero(o[k], searchElement)) {
              return true;
            } // c. Increase k by 1.


            k++;
          } // 8. Return false


          return false;
        }
      });
    }

    if (!Map.prototype.keys) {
      Map.prototype.keys = function () {
        var keys = [];
        this.forEach(function (value, key) {
          keys.push(key);
        });
        return keys;
      };
    }

    Number.isInteger = Number.isInteger || function (value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

    Number.isNaN = Number.isNaN || window.isNaN;

    Number.parseInt = Number.parseInt || window.parseInt;

    if (Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
      Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);

        return null;
      };
    }

    if (!window.WeakSet) {
      var _WeakSet = function _WeakSet(data) {
        this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
        data && data.forEach && data.forEach(this.add, this);
      };

      var counter = Date.now() % 1e9;
      var proto$1 = _WeakSet.prototype;

      proto$1['add'] = function (val) {
        var name = this.name;
        if (!val[name]) Object.defineProperty(val, name, {
          value: true,
          writable: true
        });
        return this;
      };

      proto$1['delete'] = function (val) {
        if (!val[this.name]) return false;
        val[this.name] = undefined;
        return true;
      };

      proto$1['has'] = function (val) {
        return !!val[this.name];
      };

      window.WeakSet = _WeakSet;
    }

    window.fetch || (window.fetch = function (e, n) {
      return n = n || {}, new Promise(function (t, r) {
        var s = new XMLHttpRequest();

        for (var o in s.open(n.method || "get", e, !0), n.headers) {
          s.setRequestHeader(o, n.headers[o]);
        }

        function u() {
          var e,
              n = [],
              t = [],
              r = {};
          return s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (s, o, u) {
            n.push(o = o.toLowerCase()), t.push([o, u]), r[o] = (e = r[o]) ? e + "," + u : u;
          }), {
            ok: 2 == (s.status / 100 | 0),
            status: s.status,
            statusText: s.statusText,
            url: s.responseURL,
            clone: u,
            text: function text() {
              return Promise.resolve(s.responseText);
            },
            json: function json() {
              return Promise.resolve(s.responseText).then(JSON.parse);
            },
            blob: function blob() {
              return Promise.resolve(new Blob([s.response]));
            },
            headers: {
              keys: function keys() {
                return n;
              },
              entries: function entries() {
                return t;
              },
              get: function get(e) {
                return r[e.toLowerCase()];
              },
              has: function has(e) {
                return e.toLowerCase() in r;
              }
            }
          };
        }

        s.withCredentials = "include" == n.credentials, s.onload = function () {
          t(u());
        }, s.onerror = r, s.send(n.body || null);
      });
    });

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }

    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
      }

      return object;
    }

    function _get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          var base = _superPropBase(target, property);

          if (!base) return;
          var desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.get) {
            return desc.get.call(receiver);
          }

          return desc.value;
        };
      }

      return _get(target, property, receiver || target);
    }

    function _taggedTemplateLiteral(strings, raw) {
      if (!raw) {
        raw = strings.slice(0);
      }

      return Object.freeze(Object.defineProperties(strings, {
        raw: {
          value: Object.freeze(raw)
        }
      }));
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray$1(arr) {
      return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
    }

    function _arrayWithoutHoles$1(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      }
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray$1(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
      if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
      }

      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _nonIterableSpread$1() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    !function (global) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
      var runtime = global.regeneratorRuntime;

      if (runtime) {
        if (inModule) {
          // If regeneratorRuntime is defined globally and we're in a module,
          // make the exports object identical to regeneratorRuntime.
          module.exports = runtime;
        } // Don't bother evaluating the rest of this file if the runtime was
        // already defined globally.


        return;
      } // Define the runtime globally (as expected by generated code) as either
      // module.exports (if we're in a module) or a new, empty object.


      runtime = global.regeneratorRuntime = inModule ? module.exports : {};

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      runtime.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      runtime.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      runtime.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
              return Promise.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return Promise.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      runtime.async = function (innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      runtime.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      runtime.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      };
    }( // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    function () {
      return this || (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self;
    }() || Function("return this")());

    /**
     *
     *
     * @author Jerry Bendy <jerry@icewingcc.com>
     * @licence MIT
     *
     */
    (function (self) {

      var nativeURLSearchParams = self.URLSearchParams && self.URLSearchParams.prototype.get ? self.URLSearchParams : null,
          isSupportObjectConstructor = nativeURLSearchParams && new nativeURLSearchParams({
        a: 1
      }).toString() === 'a=1',
          // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
      decodesPlusesCorrectly = nativeURLSearchParams && new nativeURLSearchParams('s=%2B').get('s') === '+',
          __URLSearchParams__ = "__URLSearchParams__",
          // Fix bug in Edge which cannot encode ' &' correctly
      encodesAmpersandsCorrectly = nativeURLSearchParams ? function () {
        var ampersandTest = new nativeURLSearchParams();
        ampersandTest.append('s', ' &');
        return ampersandTest.toString() === 's=+%26';
      }() : true,
          prototype = URLSearchParamsPolyfill.prototype,
          iterable = !!(self.Symbol && self.Symbol.iterator);

      if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly && encodesAmpersandsCorrectly) {
        return;
      }
      /**
       * Make a URLSearchParams instance
       *
       * @param {object|string|URLSearchParams} search
       * @constructor
       */


      function URLSearchParamsPolyfill(search) {
        search = search || ""; // support construct object with another URLSearchParams instance

        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
          search = search.toString();
        }

        this[__URLSearchParams__] = parseToDict(search);
      }
      /**
       * Appends a specified key/value pair as a new search parameter.
       *
       * @param {string} name
       * @param {string} value
       */


      prototype.append = function (name, value) {
        appendTo(this[__URLSearchParams__], name, value);
      };
      /**
       * Deletes the given search parameter, and its associated value,
       * from the list of all search parameters.
       *
       * @param {string} name
       */


      prototype['delete'] = function (name) {
        delete this[__URLSearchParams__][name];
      };
      /**
       * Returns the first value associated to the given search parameter.
       *
       * @param {string} name
       * @returns {string|null}
       */


      prototype.get = function (name) {
        var dict = this[__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
      };
      /**
       * Returns all the values association with a given search parameter.
       *
       * @param {string} name
       * @returns {Array}
       */


      prototype.getAll = function (name) {
        var dict = this[__URLSearchParams__];
        return name in dict ? dict[name].slice(0) : [];
      };
      /**
       * Returns a Boolean indicating if such a search parameter exists.
       *
       * @param {string} name
       * @returns {boolean}
       */


      prototype.has = function (name) {
        return name in this[__URLSearchParams__];
      };
      /**
       * Sets the value associated to a given search parameter to
       * the given value. If there were several values, delete the
       * others.
       *
       * @param {string} name
       * @param {string} value
       */


      prototype.set = function set(name, value) {
        this[__URLSearchParams__][name] = ['' + value];
      };
      /**
       * Returns a string containg a query string suitable for use in a URL.
       *
       * @returns {string}
       */


      prototype.toString = function () {
        var dict = this[__URLSearchParams__],
            query = [],
            i,
            key,
            name,
            value;

        for (key in dict) {
          name = encode(key);

          for (i = 0, value = dict[key]; i < value.length; i++) {
            query.push(name + '=' + encode(value[i]));
          }
        }

        return query.join('&');
      }; // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.


      var forSureUsePolyfill = !decodesPlusesCorrectly;
      var useProxy = !forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy;
      /*
       * Apply polifill to global object and append other prototype into it
       */

      Object.defineProperty(self, 'URLSearchParams', {
        value: useProxy ? // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
        new Proxy(nativeURLSearchParams, {
          construct: function construct(target, args) {
            return new target(new URLSearchParamsPolyfill(args[0]).toString());
          }
        }) : URLSearchParamsPolyfill
      });
      var USPProto = self.URLSearchParams.prototype;
      USPProto.polyfill = true;
      /**
       *
       * @param {function} callback
       * @param {object} thisArg
       */

      USPProto.forEach = USPProto.forEach || function (callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function (name) {
          dict[name].forEach(function (value) {
            callback.call(thisArg, value, name, this);
          }, this);
        }, this);
      };
      /**
       * Sort all name-value pairs
       */


      USPProto.sort = USPProto.sort || function () {
        var dict = parseToDict(this.toString()),
            keys = [],
            k,
            i,
            j;

        for (k in dict) {
          keys.push(k);
        }

        keys.sort();

        for (i = 0; i < keys.length; i++) {
          this['delete'](keys[i]);
        }

        for (i = 0; i < keys.length; i++) {
          var key = keys[i],
              values = dict[key];

          for (j = 0; j < values.length; j++) {
            this.append(key, values[j]);
          }
        }
      };
      /**
       * Returns an iterator allowing to go through all keys of
       * the key/value pairs contained in this object.
       *
       * @returns {function}
       */


      USPProto.keys = USPProto.keys || function () {
        var items = [];
        this.forEach(function (item, name) {
          items.push(name);
        });
        return makeIterator(items);
      };
      /**
       * Returns an iterator allowing to go through all values of
       * the key/value pairs contained in this object.
       *
       * @returns {function}
       */


      USPProto.values = USPProto.values || function () {
        var items = [];
        this.forEach(function (item) {
          items.push(item);
        });
        return makeIterator(items);
      };
      /**
       * Returns an iterator allowing to go through all key/value
       * pairs contained in this object.
       *
       * @returns {function}
       */


      USPProto.entries = USPProto.entries || function () {
        var items = [];
        this.forEach(function (item, name) {
          items.push([name, item]);
        });
        return makeIterator(items);
      };

      if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
      }

      function encode(str) {
        var replace = {
          '!': '%21',
          "'": '%27',
          '(': '%28',
          ')': '%29',
          '~': '%7E',
          '%20': '+',
          '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function (match) {
          return replace[match];
        });
      }

      function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
      }

      function makeIterator(arr) {
        var iterator = {
          next: function next() {
            var value = arr.shift();
            return {
              done: value === undefined,
              value: value
            };
          }
        };

        if (iterable) {
          iterator[self.Symbol.iterator] = function () {
            return iterator;
          };
        }

        return iterator;
      }

      function parseToDict(search) {
        var dict = {};

        if (_typeof(search) === "object") {
          for (var key in search) {
            if (search.hasOwnProperty(key)) {
              appendTo(dict, key, search[key]);
            }
          }
        } else {
          // remove first '?'
          if (search.indexOf("?") === 0) {
            search = search.slice(1);
          }

          var pairs = search.split("&");

          for (var j = 0; j < pairs.length; j++) {
            var value = pairs[j],
                index = value.indexOf('=');

            if (-1 < index) {
              appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));
            } else {
              if (value) {
                appendTo(dict, decode(value), '');
              }
            }
          }
        }

        return dict;
      }

      function appendTo(dict, name, value) {
        var val = typeof value === 'string' ? value : value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value);

        if (name in dict) {
          dict[name].push(val);
        } else {
          dict[name] = [val];
        }
      }
    })(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : window);

    var patchNodeValue = function patchNodeValue() {
      if (!window.ShadyDOM) {
        return;
      }

      var nativeNodeValue = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue");
      Object.defineProperty(Node.prototype, "nodeValue", {
        get: function get() {
          return nativeNodeValue.get.apply(this);
        },
        set: function set(text) {
          nativeNodeValue.set.apply(this, arguments); // eslint-disable-line
          // Call manually the mutation observer callback

          var parentElement = this.parentNode;

          if (parentElement instanceof HTMLElement && parentElement.isUI5Element) {
            parentElement._processChildren();
          }
        }
      });
    };

    patchNodeValue();

    // CSS Custom Properties
    window.CSSVarsPonyfill = {
      cssVars: cssVars
    };

    var features = new Map();

    var registerFeature = function registerFeature(name, feature) {
      features.set(name, feature);
    };

    var getFeature = function getFeature(name) {
      return features.get(name);
    };

    var class2type = {};
    var hasOwn = class2type.hasOwnProperty;
    var toString = class2type.toString;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);

    var fnIsPlainObject = function fnIsPlainObject(obj) {
      var proto, Ctor;

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = Object.getPrototypeOf(obj);

      if (!proto) {
        return true;
      }

      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    };

    var oToken = Object.create(null);

    var fnMerge = function fnMerge() {
      var src,
          copyIsArray,
          copy,
          name,
          options,
          clone,
          target = arguments[2] || {},
          i = 3,
          length = arguments.length,
          deep = arguments[0] || false,
          skipToken = arguments[1] ? undefined : oToken;

      if (_typeof(target) !== 'object' && typeof target !== 'function') {
        target = {};
      }

      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];

            if (name === '__proto__' || target === copy) {
              continue;
            }

            if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
              } else {
                clone = src && fnIsPlainObject(src) ? src : {};
              }

              target[name] = fnMerge(deep, arguments[1], clone, copy);
            } else if (copy !== skipToken) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    };

    var fnMerge$1 = function fnMerge$1() {
      var args = [true, false];
      args.push.apply(args, arguments);
      return fnMerge.apply(null, args);
    };

    var assetParameters = {
      "themes": {
        "default": "sap_fiori_3",
        "all": ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw"]
      },
      "languages": {
        "default": "en",
        "all": ["ar", "bg", "ca", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "hi", "hr", "hu", "it", "iw", "ja", "kk", "ko", "lt", "lv", "ms", "nl", "no", "pl", "pt", "ro", "ru", "sh", "sk", "sl", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"]
      },
      "locales": {
        "default": "en",
        "all": ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"]
      }
    };
    var DEFAULT_THEME = assetParameters.themes["default"];
    var DEFAULT_LANGUAGE = assetParameters.languages["default"];
    var DEFAULT_LOCALE = assetParameters.locales["default"];
    var SUPPORTED_LOCALES = assetParameters.locales.all;

    var initialized = false;
    var initialConfig = {
      animationMode: "full",
      theme: DEFAULT_THEME,
      rtl: null,
      language: null,
      calendarType: null,
      noConflict: false,
      // no URL
      formatSettings: {}
    };
    /* General settings */

    var getAnimationMode = function getAnimationMode() {
      initConfiguration();
      return initialConfig.animationMode;
    };

    var getTheme = function getTheme() {
      initConfiguration();
      return initialConfig.theme;
    };

    var getRTL = function getRTL() {
      initConfiguration();
      return initialConfig.rtl;
    };

    var getLanguage = function getLanguage() {
      initConfiguration();
      return initialConfig.language;
    };

    var getNoConflict = function getNoConflict() {
      initConfiguration();
      return initialConfig.noConflict;
    };

    var getCalendarType = function getCalendarType() {
      initConfiguration();
      return initialConfig.calendarType;
    };

    var getFormatSettings = function getFormatSettings() {
      initConfiguration();
      return initialConfig.formatSettings;
    };

    var booleanMapping = new Map();
    booleanMapping.set("true", true);
    booleanMapping.set("false", false);

    var parseConfigurationScript = function parseConfigurationScript() {
      var configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

      var configJSON;

      if (configScript) {
        try {
          configJSON = JSON.parse(configScript.innerHTML);
        } catch (err) {
          console.warn("Incorrect data-sap-ui-config format. Please use JSON");
          /* eslint-disable-line */
        }

        if (configJSON) {
          initialConfig = fnMerge$1(initialConfig, configJSON);
        }
      }
    };

    var parseURLParameters = function parseURLParameters() {
      var params = new URLSearchParams(window.location.search);
      params.forEach(function (value, key) {
        if (!key.startsWith("sap-ui")) {
          return;
        }

        var lowerCaseValue = value.toLowerCase();
        var param = key.split("sap-ui-")[1];

        if (booleanMapping.has(value)) {
          value = booleanMapping.get(lowerCaseValue);
        }

        initialConfig[param] = value;
      });
    };

    var applyOpenUI5Configuration = function applyOpenUI5Configuration() {
      var OpenUI5Support = getFeature("OpenUI5Support");

      if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
        return;
      }

      var OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
      initialConfig = fnMerge$1(initialConfig, OpenUI5Config);
    };

    var initConfiguration = function initConfiguration() {
      if (initialized) {
        return;
      } // 1. Lowest priority - configuration script


      parseConfigurationScript(); // 2. URL parameters overwrite configuration script parameters

      parseURLParameters(); // 3. If OpenUI5 is detected, it has the highest priority

      applyOpenUI5Configuration();
      initialized = true;
    };

    var fetchPromises = new Map();
    var jsonPromises = new Map();
    var textPromises = new Map();

    var fetchTextOnce =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!fetchPromises.get(url)) {
                  fetchPromises.set(url, fetch(url));
                }

                _context.next = 3;
                return fetchPromises.get(url);

              case 3:
                response = _context.sent;

                if (!textPromises.get(url)) {
                  textPromises.set(url, response.text());
                }

                return _context.abrupt("return", textPromises.get(url));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchTextOnce(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var fetchJsonOnce =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(url) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!fetchPromises.get(url)) {
                  fetchPromises.set(url, fetch(url));
                }

                _context2.next = 3;
                return fetchPromises.get(url);

              case 3:
                response = _context2.sent;

                if (!jsonPromises.get(url)) {
                  jsonPromises.set(url, response.json());
                }

                return _context2.abrupt("return", jsonPromises.get(url));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function fetchJsonOnce(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    /**
     * ""                        -> ""
     * "noExtension"             -> ""
     * "file.txt"                -> ".txt"
     * "file.with.many.dots.doc" -> ".doc"
     * ".gitignore"              -> ""
     *
     * @param fileName - the file name
     * @returns {string}
     */
    var getFileExtension = function getFileExtension(fileName) {
      var dotPos = fileName.lastIndexOf(".");

      if (dotPos < 1) {
        return "";
      }

      return fileName.slice(dotPos);
    };

    var themeURLs = new Map();
    var themeStyles = new Map();
    var registeredPackages = new Set();
    var registeredThemes = new Set();
    /**
     * Used to provide CSS Vars for a specific theme for a specific package.
     * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
     * This URL must point to a JSON file, containing a "_" property.
     *
     * Example usage:
     *  1) Pass the CSS Vars as a string directly.
     *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
     *  2) Pass the CSS Vars as an object directly
     *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
     *  3) Pass a URL to a CSS file, containing the CSS Vars. Will be fetched on demand, not upon registration.
     *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.css");
     *  4) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
     *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
     *
     * @public
     * @param packageName - the NPM package for which CSS Vars are registered
     * @param themeName - the theme which the CSS Vars implement
     * @param style - can be one of four options: a string, an object with a "_" property, URL to a CSS file, or URL to a JSON file with a "_" property
     */

    var registerThemeProperties = function registerThemeProperties(packageName, themeName, style) {
      if (style._) {
        // JSON object like ({"_": ":root"})
        themeStyles.set("".concat(packageName, "_").concat(themeName), style._);
      } else if (style.includes(":root") || style === "") {
        // pure string, including empty string
        themeStyles.set("".concat(packageName, "_").concat(themeName), style);
      } else {
        // url for fetching
        themeURLs.set("".concat(packageName, "_").concat(themeName), style);
      }

      registeredPackages.add(packageName);
      registeredThemes.add(themeName);
    };

    var getThemeProperties =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(packageName, themeName) {
        var style, regThemesStr, data, themeProps;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                style = themeStyles.get("".concat(packageName, "_").concat(themeName));

                if (!(style !== undefined)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", style);

              case 3:
                if (registeredThemes.has(themeName)) {
                  _context.next = 7;
                  break;
                }

                regThemesStr = _toConsumableArray$1(registeredThemes.values()).join(", ");
                console.warn("You have requested a non-registered theme - falling back to ".concat(DEFAULT_THEME, ". Registered themes are: ").concat(regThemesStr));
                /* eslint-disable-line */

                return _context.abrupt("return", themeStyles.get("".concat(packageName, "_").concat(DEFAULT_THEME)));

              case 7:
                _context.next = 9;
                return fetchThemeProperties(packageName, themeName);

              case 9:
                data = _context.sent;
                themeProps = data._ || data;
                themeStyles.set("".concat(packageName, "_").concat(themeName), themeProps);
                return _context.abrupt("return", themeProps);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getThemeProperties(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var fetchThemeProperties =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(packageName, themeName) {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = themeURLs.get("".concat(packageName, "_").concat(themeName));

                if (url) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("You have to import the ".concat(packageName, "/dist/Assets.js module to switch to additional themes"));

              case 3:
                return _context2.abrupt("return", getFileExtension(url) === ".css" ? fetchTextOnce(url) : fetchJsonOnce(url));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function fetchThemeProperties(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    var getRegisteredPackages = function getRegisteredPackages() {
      return registeredPackages;
    };

    var isThemeRegistered = function isThemeRegistered(theme) {
      return registeredThemes.has(theme);
    };

    /**
     * Creates a <style> tag in the <head> tag
     * @param cssText - the CSS
     * @param attributes - optional attributes to add to the tag
     * @returns {HTMLElement}
     */
    var createStyleInHead = function createStyleInHead(cssText) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = document.createElement("style");
      style.type = "text/css";
      Object.entries(attributes).forEach(function (pair) {
        return style.setAttribute.apply(style, _toConsumableArray$1(pair));
      });
      style.textContent = cssText;
      document.head.appendChild(style);
      return style;
    };

    /**
     * Creates/updates a style element holding all CSS Custom Properties
     * @param cssText
     * @param packageName
     */

    var createThemePropertiesStyleTag = function createThemePropertiesStyleTag(cssText, packageName) {
      var styleElement = document.head.querySelector("style[data-ui5-theme-properties=\"".concat(packageName, "\"]"));

      if (styleElement) {
        styleElement.textContent = cssText || ""; // in case of undefined
      } else {
        var attributes = {
          "data-ui5-theme-properties": packageName
        };
        createStyleInHead(cssText, attributes);
      }
    };

    var getThemeMetadata = function getThemeMetadata() {
      // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
      var el = document.querySelector(".sapThemeMetaData-Base-baseLib");

      if (el) {
        return getComputedStyle(el).backgroundImage;
      }

      el = document.createElement("span");
      el.style.display = "none";
      el.classList.add("sapThemeMetaData-Base-baseLib");
      document.body.appendChild(el);
      var metadata = getComputedStyle(el).backgroundImage;
      document.body.removeChild(el);
      return metadata;
    };

    var parseThemeMetadata = function parseThemeMetadata(metadataString) {
      var params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);

      if (params && params.length >= 2) {
        var paramsString = params[1];
        paramsString = paramsString.replace(/\\"/g, "\"");

        if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
          try {
            paramsString = decodeURIComponent(paramsString);
          } catch (ex) {
            console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line

            return;
          }
        }

        try {
          return JSON.parse(paramsString);
        } catch (ex) {
          console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
        }
      }
    };

    var processThemeMetadata = function processThemeMetadata(metadata) {
      var themeName;
      var baseThemeName;

      try {
        themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
        baseThemeName = metadata.Extends[0];
      } catch (ex) {
        console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line

        return;
      }

      return {
        themeName: themeName,
        baseThemeName: baseThemeName
      };
    };

    var getThemeDesignerTheme = function getThemeDesignerTheme() {
      var metadataString = getThemeMetadata();

      if (!metadataString || metadataString === "none") {
        return;
      }

      var metadata = parseThemeMetadata(metadataString);
      return processThemeMetadata(metadata);
    };

    var ponyfillTimer;

    var ponyfillNeeded = function ponyfillNeeded() {
      return !!window.CSSVarsPonyfill;
    };

    var runPonyfill = function runPonyfill() {
      ponyfillTimer = undefined;
      window.CSSVarsPonyfill.cssVars({
        rootElement: document.head,
        silent: true
      });
    };

    var schedulePonyfill = function schedulePonyfill() {
      if (!ponyfillTimer) {
        ponyfillTimer = window.setTimeout(runPonyfill, 0);
      }
    };

    var BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";

    var isThemeBaseRegistered = function isThemeBaseRegistered() {
      var registeredPackages = getRegisteredPackages();
      return registeredPackages.has(BASE_THEME_PACKAGE);
    };

    var loadThemeBase =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(theme) {
        var cssText;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isThemeBaseRegistered()) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return getThemeProperties(BASE_THEME_PACKAGE, theme);

              case 4:
                cssText = _context.sent;
                createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function loadThemeBase(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var deleteThemeBase = function deleteThemeBase() {
      var styleElement = document.head.querySelector("style[data-ui5-theme-properties=\"".concat(BASE_THEME_PACKAGE, "\"]"));

      if (styleElement) {
        styleElement.parentElement.removeChild(styleElement);
      }
    };

    var loadComponentPackages =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(theme) {
        var registeredPackages;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                registeredPackages = getRegisteredPackages();
                registeredPackages.forEach(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(packageName) {
                    var cssText;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(packageName === BASE_THEME_PACKAGE)) {
                              _context2.next = 2;
                              break;
                            }

                            return _context2.abrupt("return");

                          case 2:
                            _context2.next = 4;
                            return getThemeProperties(packageName, theme);

                          case 4:
                            cssText = _context2.sent;
                            createThemePropertiesStyleTag(cssText, packageName);

                          case 6:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function loadComponentPackages(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    var detectExternalTheme = function detectExternalTheme() {
      // If theme designer theme is detected, use this
      var extTheme = getThemeDesignerTheme();

      if (extTheme) {
        return extTheme;
      } // If OpenUI5Support is enabled, try to find out if it loaded variables


      var OpenUI5Support = getFeature("OpenUI5Support");

      if (OpenUI5Support) {
        var varsLoaded = OpenUI5Support.cssVariablesLoaded();

        if (varsLoaded) {
          return {
            themeName: OpenUI5Support.getConfigurationSettingsObject().theme // just themeName, baseThemeName is only relevant for custom themes

          };
        }
      }
    };

    var applyTheme =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(theme) {
        var extTheme, packagesTheme;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                extTheme = detectExternalTheme(); // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded

                if (!(!extTheme || theme !== extTheme.themeName)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 4;
                return loadThemeBase(theme);

              case 4:
                _context4.next = 7;
                break;

              case 6:
                deleteThemeBase();

              case 7:
                // Always load component packages properties. For non-registered themes, try with the base theme, if any
                packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
                _context4.next = 10;
                return loadComponentPackages(packagesTheme);

              case 10:
                // When changing the theme, run the ponyfill immediately
                if (ponyfillNeeded()) {
                  runPonyfill();
                }

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function applyTheme(_x4) {
        return _ref4.apply(this, arguments);
      };
    }();

    var theme;

    var getTheme$1 = function getTheme$1() {
      if (theme === undefined) {
        theme = getTheme();
      }

      return theme;
    };

    var setTheme =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(newTheme) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(theme === newTheme)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                theme = newTheme; // Update CSS Custom Properties

                _context.next = 5;
                return applyTheme(theme);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function setTheme(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var sap$1 = window.sap;
    var core = sap$1 && sap$1.ui && typeof sap$1.ui.getCore === "function" && sap$1.ui.getCore();

    var isLoaded = function isLoaded() {
      return !!core;
    };

    var init = function init() {
      if (!core) {
        return Promise.resolve();
      }

      return new Promise(function (resolve) {
        core.attachInit(function () {
          sap$1.ui.require(["sap/ui/core/LocaleData"], resolve);
        });
      });
    };

    var getConfigurationSettingsObject = function getConfigurationSettingsObject() {
      if (!core) {
        return;
      }

      var config = core.getConfiguration();

      var LocaleData = sap$1.ui.require("sap/ui/core/LocaleData");

      return {
        animationMode: config.getAnimationMode(),
        language: config.getLanguage(),
        theme: config.getTheme(),
        rtl: config.getRTL(),
        calendarType: config.getCalendarType(),
        formatSettings: {
          firstDayOfWeek: LocaleData ? LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek() : undefined
        }
      };
    };

    var getLocaleDataObject = function getLocaleDataObject() {
      if (!core) {
        return;
      }

      var config = core.getConfiguration();

      var LocaleData = sap$1.ui.require("sap/ui/core/LocaleData");

      return LocaleData.getInstance(config.getLocale())._get();
    };

    var listenForThemeChange = function listenForThemeChange() {
      var config = core.getConfiguration();
      core.attachThemeChanged(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return setTheme(config.getTheme());

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    };

    var attachListeners = function attachListeners() {
      if (!core) {
        return;
      }

      listenForThemeChange();
    };

    var cssVariablesLoaded = function cssVariablesLoaded() {
      if (!core) {
        return;
      }

      var link = _toConsumableArray$1(document.head.children).find(function (el) {
        return el.id === "sap-ui-theme-sap.ui.core";
      }); // more reliable than querySelector early


      if (!link) {
        return;
      }

      return !!link.href.match(/\/css-variables\.css/);
    };

    var OpenUI5Support = {
      isLoaded: isLoaded,
      init: init,
      getConfigurationSettingsObject: getConfigurationSettingsObject,
      getLocaleDataObject: getLocaleDataObject,
      attachListeners: attachListeners,
      cssVariablesLoaded: cssVariablesLoaded
    };
    registerFeature("OpenUI5Support", OpenUI5Support);

    var language;

    var getLanguage$1 = function getLanguage$1() {
      if (language === undefined) {
        language = getLanguage();
      }

      return language;
    };
     // eslint-disable-line

    /**
     * Base class for all data types.
     *
     * @class
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.base.types.DataType
     * @public
     */
    var DataType =
    /*#__PURE__*/
    function () {
      function DataType() {
        _classCallCheck(this, DataType);
      }

      _createClass(DataType, null, [{
        key: "isValid",
        value: function isValid(value) {}
      }, {
        key: "generataTypeAcessors",
        value: function generataTypeAcessors(types) {
          var _this = this;

          Object.keys(types).forEach(function (type) {
            Object.defineProperty(_this, type, {
              get: function get() {
                return types[type];
              }
            });
          });
        }
      }]);

      return DataType;
    }();

    /**
     * Different calendar types.
     */

    var CalendarTypes = {
      Gregorian: "Gregorian",
      Islamic: "Islamic",
      Japanese: "Japanese",
      Buddhist: "Buddhist",
      Persian: "Persian"
    };

    var CalendarType =
    /*#__PURE__*/
    function (_DataType) {
      _inherits(CalendarType, _DataType);

      function CalendarType() {
        _classCallCheck(this, CalendarType);

        return _possibleConstructorReturn(this, _getPrototypeOf(CalendarType).apply(this, arguments));
      }

      _createClass(CalendarType, null, [{
        key: "isValid",
        value: function isValid(value) {
          return !!CalendarTypes[value];
        }
      }]);

      return CalendarType;
    }(DataType);

    CalendarType.generataTypeAcessors(CalendarTypes);

    var calendarType;

    var getCalendarType$1 = function getCalendarType$1() {
      if (calendarType === undefined) {
        calendarType = getCalendarType();
      }

      if (CalendarType.isValid(calendarType)) {
        return calendarType;
      }

      return CalendarType.Gregorian;
    };
     // eslint-disable-line

    var getDesigntimePropertyAsArray = (function (value) {
      var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
      return m && m[2] ? m[2].split(/,/) : null;
    });

    var detectNavigatorLanguage = (function () {
      var browserLanguages = navigator.languages;

      var navigatorLanguage = function navigatorLanguage() {
        return navigator.language;
      };

      var rawLocale = browserLanguages && browserLanguages[0] || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;
      return rawLocale || DEFAULT_LANGUAGE;
    });

    var rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

    var Locale =
    /*#__PURE__*/
    function () {
      function Locale(sLocaleId) {
        _classCallCheck(this, Locale);

        var aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));

        if (aResult === null) {
          throw new Error("The given language ".concat(sLocaleId, " does not adhere to BCP-47."));
        }

        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || null;
        this.sScript = aResult[2] || null;
        this.sRegion = aResult[3] || null;
        this.sVariant = aResult[4] && aResult[4].slice(1) || null;
        this.sExtension = aResult[5] && aResult[5].slice(1) || null;
        this.sPrivateUse = aResult[6] || null;

        if (this.sLanguage) {
          this.sLanguage = this.sLanguage.toLowerCase();
        }

        if (this.sScript) {
          this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function (s) {
            return s.toUpperCase();
          });
        }

        if (this.sRegion) {
          this.sRegion = this.sRegion.toUpperCase();
        }
      }

      _createClass(Locale, [{
        key: "getLanguage",
        value: function getLanguage() {
          return this.sLanguage;
        }
      }, {
        key: "getScript",
        value: function getScript() {
          return this.sScript;
        }
      }, {
        key: "getRegion",
        value: function getRegion() {
          return this.sRegion;
        }
      }, {
        key: "getVariant",
        value: function getVariant() {
          return this.sVariant;
        }
      }, {
        key: "getVariantSubtags",
        value: function getVariantSubtags() {
          return this.sVariant ? this.sVariant.split("-") : [];
        }
      }, {
        key: "getExtension",
        value: function getExtension() {
          return this.sExtension;
        }
      }, {
        key: "getExtensionSubtags",
        value: function getExtensionSubtags() {
          return this.sExtension ? this.sExtension.slice(2).split("-") : [];
        }
      }, {
        key: "getPrivateUse",
        value: function getPrivateUse() {
          return this.sPrivateUse;
        }
      }, {
        key: "getPrivateUseSubtags",
        value: function getPrivateUseSubtags() {
          return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
        }
      }, {
        key: "hasPrivateUseSubtag",
        value: function hasPrivateUseSubtag(sSubtag) {
          return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
        }
      }, {
        key: "toString",
        value: function toString() {
          var r = [this.sLanguage];

          if (this.sScript) {
            r.push(this.sScript);
          }

          if (this.sRegion) {
            r.push(this.sRegion);
          }

          if (this.sVariant) {
            r.push(this.sVariant);
          }

          if (this.sExtension) {
            r.push(this.sExtension);
          }

          if (this.sPrivateUse) {
            r.push(this.sPrivateUse);
          }

          return r.join("-");
        }
      }]);

      return Locale;
    }();

    var convertToLocaleOrNull = function convertToLocaleOrNull(lang) {
      try {
        if (lang && typeof lang === "string") {
          return new Locale(lang);
        }
      } catch (e) {// ignore
      }
    };
    /**
     * Returns the locale based on the parameter or configured language Configuration#getLanguage
     * If no language has been configured - a new locale based on browser language is returned
     */


    var getLocale = function getLocale(lang) {
      if (lang) {
        return convertToLocaleOrNull(lang);
      }

      if (getLanguage$1()) {
        return new Locale(getLanguage$1());
      }

      return convertToLocaleOrNull(detectNavigatorLanguage());
    };

    var emptyFn = function emptyFn() {};
    /**
     * OpenUI5 FormatSettings shim
     */


    var FormatSettings = {
      getFormatLocale: getLocale,
      getLegacyDateFormat: emptyFn,
      getLegacyDateCalendarCustomizing: emptyFn,
      getCustomLocaleData: emptyFn
    };
    /**
     * OpenUI5 Configuration Shim
     */

    var Configuration = {
      getLanguage: getLanguage$1,
      getCalendarType: getCalendarType$1,
      getSupportedLanguages: function getSupportedLanguages() {
        return getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
      },
      getOriginInfo: emptyFn,
      getFormatSettings: function getFormatSettings() {
        return FormatSettings;
      }
    };
    /**
     * OpenUI5 Core shim
     */

    var Core = {
      getConfiguration: function getConfiguration() {
        return Configuration;
      },
      getLibraryResourceBundle: emptyFn(),
      getFormatSettings: function getFormatSettings() {
        return FormatSettings;
      }
    };

    var BaseObject;

    var Interface = function Interface(oObject, aMethods, bFacade) {
      if (!oObject) {
        return oObject;
      }

      BaseObject = BaseObject || sap.ui.requireSync("sap/ui/base/Object");

      function fCreateDelegator(oObject, sMethodName) {
        return function () {
          var tmp = oObject[sMethodName].apply(oObject, arguments);

          if (bFacade) {
            return this;
          } else {
            return tmp instanceof BaseObject ? tmp.getInterface() : tmp;
          }
        };
      }

      if (!aMethods) {
        return {};
      }

      var sMethodName;

      for (var i = 0, ml = aMethods.length; i < ml; i++) {
        sMethodName = aMethods[i];

        if (!oObject[sMethodName] || typeof oObject[sMethodName] === "function") {
          this[sMethodName] = fCreateDelegator(oObject, sMethodName);
        }
      }
    };

    var ObjectPath = {};
    var defaultRootContext = window;

    function getObjectPathArray(vObjectPath) {
      return Array.isArray(vObjectPath) ? vObjectPath.slice() : vObjectPath.split(".");
    }

    ObjectPath.create = function (vObjectPath, oRootContext) {
      var oObject = oRootContext || defaultRootContext;
      var aNames = getObjectPathArray(vObjectPath);

      for (var i = 0; i < aNames.length; i++) {
        var sName = aNames[i];

        if (oObject[sName] === null || oObject[sName] !== undefined && _typeof(oObject[sName]) !== "object" && typeof oObject[sName] !== "function") {
          throw new Error("Could not set object-path for '" + aNames.join(".") + "', path segment '" + sName + "' already exists.");
        }

        oObject[sName] = oObject[sName] || {};
        oObject = oObject[sName];
      }

      return oObject;
    };

    ObjectPath.get = function (vObjectPath, oRootContext) {
      var oObject = oRootContext || defaultRootContext;
      var aNames = getObjectPathArray(vObjectPath);
      var sPropertyName = aNames.pop();

      for (var i = 0; i < aNames.length && oObject; i++) {
        oObject = oObject[aNames[i]];
      }

      return oObject ? oObject[sPropertyName] : undefined;
    };

    ObjectPath.set = function (vObjectPath, vValue, oRootContext) {
      oRootContext = oRootContext || defaultRootContext;
      var aNames = getObjectPathArray(vObjectPath);
      var sPropertyName = aNames.pop();
      var oObject = ObjectPath.create(aNames, oRootContext);
      oObject[sPropertyName] = vValue;
    };

    var Device = {
      browser: {
        phantomJS: false
      }
    };

    var fnNow = !(typeof window != "undefined" && window.performance && performance.now && performance.timing) ? Date.now : function () {
      var iNavigationStart = performance.timing.navigationStart;
      return function perfnow() {
        return iNavigationStart + performance.now();
      };
    }();

    var Log = {};
    Log.Level = {
      NONE: -1,
      FATAL: 0,
      ERROR: 1,
      WARNING: 2,
      INFO: 3,
      DEBUG: 4,
      TRACE: 5,
      ALL: 5 + 1
    };
    var sDefaultComponent,
        aLog = [],
        mMaxLevel = {
      '': Log.Level.ERROR
    },
        iLogEntriesLimit = 3000,
        oListener = null,
        bLogSupportInfo = false;

    function pad0(i, w) {
      return ('000' + String(i)).slice(-w);
    }

    function level(sComponent) {
      return !sComponent || isNaN(mMaxLevel[sComponent]) ? mMaxLevel[''] : mMaxLevel[sComponent];
    }

    function discardLogEntries() {
      var iLogLength = aLog.length;

      if (iLogLength) {
        var iEntriesToKeep = Math.min(iLogLength, Math.floor(iLogEntriesLimit * 0.7));

        if (oListener) {
          oListener.onDiscardLogEntries(aLog.slice(0, iLogLength - iEntriesToKeep));
        }

        if (iEntriesToKeep) {
          aLog = aLog.slice(-iEntriesToKeep, iLogLength);
        } else {
          aLog = [];
        }
      }
    }

    function getLogEntryListenerInstance() {
      if (!oListener) {
        oListener = {
          listeners: [],
          onLogEntry: function onLogEntry(oLogEntry) {
            for (var i = 0; i < oListener.listeners.length; i++) {
              if (oListener.listeners[i].onLogEntry) {
                oListener.listeners[i].onLogEntry(oLogEntry);
              }
            }
          },
          onDiscardLogEntries: function onDiscardLogEntries(aDiscardedLogEntries) {
            for (var i = 0; i < oListener.listeners.length; i++) {
              if (oListener.listeners[i].onDiscardLogEntries) {
                oListener.listeners[i].onDiscardLogEntries(aDiscardedLogEntries);
              }
            }
          },
          attach: function attach(oLog, oLstnr) {
            if (oLstnr) {
              oListener.listeners.push(oLstnr);

              if (oLstnr.onAttachToLog) {
                oLstnr.onAttachToLog(oLog);
              }
            }
          },
          detach: function detach(oLog, oLstnr) {
            for (var i = 0; i < oListener.listeners.length; i++) {
              if (oListener.listeners[i] === oLstnr) {
                if (oLstnr.onDetachFromLog) {
                  oLstnr.onDetachFromLog(oLog);
                }

                oListener.listeners.splice(i, 1);
                return;
              }
            }
          }
        };
      }

      return oListener;
    }

    Log.fatal = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.FATAL, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.error = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.ERROR, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.warning = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.WARNING, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.info = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.INFO, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.debug = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.DEBUG, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.trace = function (sMessage, sDetails, sComponent, fnSupportInfo) {
      log(Log.Level.TRACE, sMessage, sDetails, sComponent, fnSupportInfo);
    };

    Log.setLevel = function (iLogLevel, sComponent, _bDefault) {
      sComponent = sComponent || sDefaultComponent || '';

      if (!_bDefault || mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iLogLevel;
        var sLogLevel;
        Object.keys(Log.Level).forEach(function (sLevel) {
          if (Log.Level[sLevel] === iLogLevel) {
            sLogLevel = sLevel;
          }
        });
        log(Log.Level.INFO, 'Changing log level ' + (sComponent ? 'for \'' + sComponent + '\' ' : '') + 'to ' + sLogLevel, '', 'sap.base.log');
      }
    };

    Log.getLevel = function (sComponent) {
      return level(sComponent || sDefaultComponent);
    };

    Log.isLoggable = function (iLevel, sComponent) {
      return (iLevel == null ? Log.Level.DEBUG : iLevel) <= level(sComponent || sDefaultComponent);
    };

    Log.logSupportInfo = function (bEnabled) {
      bLogSupportInfo = bEnabled;
    };

    function log(iLevel, sMessage, sDetails, sComponent, fnSupportInfo) {
      if (!fnSupportInfo && !sComponent && typeof sDetails === 'function') {
        fnSupportInfo = sDetails;
        sDetails = '';
      }

      if (!fnSupportInfo && typeof sComponent === 'function') {
        fnSupportInfo = sComponent;
        sComponent = '';
      }

      sComponent = sComponent || sDefaultComponent;

      if (iLevel <= level(sComponent)) {
        var fNow = fnNow(),
            oNow = new Date(fNow),
            iMicroSeconds = Math.floor((fNow - Math.floor(fNow)) * 1000),
            oLogEntry = {
          time: pad0(oNow.getHours(), 2) + ':' + pad0(oNow.getMinutes(), 2) + ':' + pad0(oNow.getSeconds(), 2) + '.' + pad0(oNow.getMilliseconds(), 3) + pad0(iMicroSeconds, 3),
          date: pad0(oNow.getFullYear(), 4) + '-' + pad0(oNow.getMonth() + 1, 2) + '-' + pad0(oNow.getDate(), 2),
          timestamp: fNow,
          level: iLevel,
          message: String(sMessage || ''),
          details: String(sDetails || ''),
          component: String(sComponent || '')
        };

        if (bLogSupportInfo && typeof fnSupportInfo === 'function') {
          oLogEntry.supportInfo = fnSupportInfo();
        }

        if (iLogEntriesLimit) {
          if (aLog.length >= iLogEntriesLimit) {
            discardLogEntries();
          }

          aLog.push(oLogEntry);
        }

        if (oListener) {
          oListener.onLogEntry(oLogEntry);
        }

        if (console) {
          var isDetailsError = sDetails instanceof Error,
              logText = oLogEntry.date + ' ' + oLogEntry.time + ' ' + oLogEntry.message + ' - ' + oLogEntry.details + ' ' + oLogEntry.component;

          switch (iLevel) {
            case Log.Level.FATAL:
            case Log.Level.ERROR:
              isDetailsError ? console.error(logText, '\n', sDetails) : console.error(logText);
              break;

            case Log.Level.WARNING:
              isDetailsError ? console.warn(logText, '\n', sDetails) : console.warn(logText);
              break;

            case Log.Level.INFO:
              if (console.info) {
                isDetailsError ? console.info(logText, '\n', sDetails) : console.info(logText);
              } else {
                isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
              }

              break;

            case Log.Level.DEBUG:
              if (console.debug) {
                isDetailsError ? console.debug(logText, '\n', sDetails) : console.debug(logText);
              } else {
                isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
              }

              break;

            case Log.Level.TRACE:
              if (console.trace) {
                isDetailsError ? console.trace(logText, '\n', sDetails) : console.trace(logText);
              } else {
                isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
              }

              break;
          }

          if (console.info && oLogEntry.supportInfo) {
            console.info(oLogEntry.supportInfo);
          }
        }

        return oLogEntry;
      }
    }

    Log.getLogEntries = function () {
      return aLog.slice();
    };

    Log.getLogEntriesLimit = function () {
      return iLogEntriesLimit;
    };

    Log.setLogEntriesLimit = function (iLimit) {
      if (iLimit < 0) {
        throw new Error('The log entries limit needs to be greater than or equal to 0!');
      }

      iLogEntriesLimit = iLimit;

      if (aLog.length >= iLogEntriesLimit) {
        discardLogEntries();
      }
    };

    Log.addLogListener = function (oListener) {
      getLogEntryListenerInstance().attach(this, oListener);
    };

    Log.removeLogListener = function (oListener) {
      getLogEntryListenerInstance().detach(this, oListener);
    };

    function Logger(sComponent) {
      this.fatal = function (msg, detail, comp, support) {
        Log.fatal(msg, detail, comp || sComponent, support);
        return this;
      };

      this.error = function (msg, detail, comp, support) {
        Log.error(msg, detail, comp || sComponent, support);
        return this;
      };

      this.warning = function (msg, detail, comp, support) {
        Log.warning(msg, detail, comp || sComponent, support);
        return this;
      };

      this.info = function (msg, detail, comp, support) {
        Log.info(msg, detail, comp || sComponent, support);
        return this;
      };

      this.debug = function (msg, detail, comp, support) {
        Log.debug(msg, detail, comp || sComponent, support);
        return this;
      };

      this.trace = function (msg, detail, comp, support) {
        Log.trace(msg, detail, comp || sComponent, support);
        return this;
      };

      this.setLevel = function (level, comp) {
        Log.setLevel(level, comp || sComponent);
        return this;
      };

      this.getLevel = function (comp) {
        return Log.getLevel(comp || sComponent);
      };

      this.isLoggable = function (level, comp) {
        return Log.isLoggable(level, comp || sComponent);
      };
    }

    Log.getLogger = function (sComponent, iDefaultLogLevel) {
      if (!isNaN(iDefaultLogLevel) && mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iDefaultLogLevel;
      }

      return new Logger(sComponent);
    };

    var fnAssert = function fnAssert(bResult, vMessage) {
      if (!bResult) {
        var sMessage = typeof vMessage === 'function' ? vMessage() : vMessage;

        if (console && console.assert) {
          console.assert(bResult, sMessage);
        } else {
          Log.debug('[Assertions] ' + sMessage);
        }
      }
    };

    var fnUniqueSort = function fnUniqueSort(aArray) {
      fnAssert(aArray instanceof Array, 'uniqueSort: input parameter must be an Array');
      var l = aArray.length;

      if (l > 1) {
        aArray.sort();
        var j = 0;

        for (var i = 1; i < l; i++) {
          if (aArray[i] !== aArray[j]) {
            aArray[++j] = aArray[i];
          }
        }

        if (++j < l) {
          aArray.splice(j, l - j);
        }
      }

      return aArray;
    };

    var Metadata = function Metadata(sClassName, oClassInfo) {
      fnAssert(typeof sClassName === 'string' && sClassName, 'Metadata: sClassName must be a non-empty string');
      fnAssert(_typeof(oClassInfo) === 'object', 'Metadata: oClassInfo must be empty or an object');

      if (!oClassInfo || _typeof(oClassInfo.metadata) !== 'object') {
        oClassInfo = {
          metadata: oClassInfo || {},
          constructor: ObjectPath.get(sClassName)
        };
        oClassInfo.metadata.__version = 1;
      }

      oClassInfo.metadata.__version = oClassInfo.metadata.__version || 2;

      if (typeof oClassInfo.constructor !== 'function') {
        throw Error('constructor for class ' + sClassName + ' must have been declared before creating metadata for it');
      }

      this._sClassName = sClassName;
      this._oClass = oClassInfo.constructor;
      this.extend(oClassInfo);
    };

    Metadata.prototype.extend = function (oClassInfo) {
      this.applySettings(oClassInfo);
      this.afterApplySettings();
    };

    Metadata.prototype.applySettings = function (oClassInfo) {
      var that = this,
          oStaticInfo = oClassInfo.metadata,
          oPrototype;

      if (oStaticInfo.baseType) {
        var oParentClass = ObjectPath.get(oStaticInfo.baseType);

        if (typeof oParentClass !== 'function') {
          Log.fatal('base class \'' + oStaticInfo.baseType + '\' does not exist');
        }

        if (oParentClass.getMetadata) {
          this._oParent = oParentClass.getMetadata();
          fnAssert(oParentClass === oParentClass.getMetadata().getClass(), 'Metadata: oParentClass must match the class in the parent metadata');
        } else {
          this._oParent = new Metadata(oStaticInfo.baseType, {});
        }
      } else {
        this._oParent = undefined;
      }

      this._bAbstract = !!oStaticInfo['abstract'];
      this._bFinal = !!oStaticInfo['final'];
      this._sStereotype = oStaticInfo.stereotype || (this._oParent ? this._oParent._sStereotype : 'object');
      this._bDeprecated = !!oStaticInfo['deprecated'];
      this._aInterfaces = oStaticInfo.interfaces || [];
      this._aPublicMethods = oStaticInfo.publicMethods || [];
      this._bInterfacesUnique = false;
      oPrototype = this._oClass.prototype;

      for (var n in oClassInfo) {
        if (n !== 'metadata' && n !== 'constructor') {
          oPrototype[n] = oClassInfo[n];

          if (!n.match(/^_|^on|^init$|^exit$/)) {
            that._aPublicMethods.push(n);
          }
        }
      }
    };

    Metadata.prototype.afterApplySettings = function () {
      if (this._oParent) {
        this._aAllPublicMethods = this._oParent._aAllPublicMethods.concat(this._aPublicMethods);
        this._bInterfacesUnique = false;
      } else {
        this._aAllPublicMethods = this._aPublicMethods;
      }
    };

    Metadata.prototype.getStereotype = function () {
      return this._sStereotype;
    };

    Metadata.prototype.getName = function () {
      return this._sClassName;
    };

    Metadata.prototype.getClass = function () {
      return this._oClass;
    };

    Metadata.prototype.getParent = function () {
      return this._oParent;
    };

    Metadata.prototype._dedupInterfaces = function () {
      if (!this._bInterfacesUnique) {
        fnUniqueSort(this._aInterfaces);
        fnUniqueSort(this._aPublicMethods);
        fnUniqueSort(this._aAllPublicMethods);
        this._bInterfacesUnique = true;
      }
    };

    Metadata.prototype.getPublicMethods = function () {
      this._dedupInterfaces();

      return this._aPublicMethods;
    };

    Metadata.prototype.getAllPublicMethods = function () {
      this._dedupInterfaces();

      return this._aAllPublicMethods;
    };

    Metadata.prototype.getInterfaces = function () {
      this._dedupInterfaces();

      return this._aInterfaces;
    };

    Metadata.prototype.isInstanceOf = function (sInterface) {
      if (this._oParent) {
        if (this._oParent.isInstanceOf(sInterface)) {
          return true;
        }
      }

      var a = this._aInterfaces;

      for (var i = 0, l = a.length; i < l; i++) {
        if (a[i] === sInterface) {
          return true;
        }
      }

      return false;
    };

    var WRITABLE_IFF_PHANTOM = !!Device.browser.phantomJS;
    Object.defineProperty(Metadata.prototype, '_mImplementedTypes', {
      get: function get() {
        if (this === Metadata.prototype) {
          throw new Error('sap.ui.base.Metadata: The \'_mImplementedTypes\' property must not be accessed on the prototype');
        }

        var result = Object.create(this._oParent ? this._oParent._mImplementedTypes : null);
        result[this._sClassName] = true;
        var aInterfaces = this._aInterfaces,
            i = aInterfaces.length;

        while (i-- > 0) {
          if (!result[aInterfaces[i]]) {
            result[aInterfaces[i]] = true;
          }
        }

        Object.defineProperty(this, '_mImplementedTypes', {
          value: Object.freeze(result),
          writable: WRITABLE_IFF_PHANTOM,
          configurable: false
        });
        return result;
      },
      configurable: true
    });

    Metadata.prototype.isA = function (vTypeName) {
      var mTypes = this._mImplementedTypes;

      if (Array.isArray(vTypeName)) {
        for (var i = 0; i < vTypeName.length; i++) {
          if (vTypeName[i] in mTypes) {
            return true;
          }
        }

        return false;
      }

      return vTypeName in mTypes;
    };

    Metadata.prototype.isAbstract = function () {
      return this._bAbstract;
    };

    Metadata.prototype.isFinal = function () {
      return this._bFinal;
    };

    Metadata.prototype.isDeprecated = function () {
      return this._bDeprecated;
    };

    Metadata.prototype.addPublicMethods = function (sMethod) {
      var aNames = sMethod instanceof Array ? sMethod : arguments;
      Array.prototype.push.apply(this._aPublicMethods, aNames);
      Array.prototype.push.apply(this._aAllPublicMethods, aNames);
      this._bInterfacesUnique = false;
    };

    Metadata.createClass = function (fnBaseClass, sClassName, oClassInfo, FNMetaImpl) {
      if (typeof fnBaseClass === 'string') {
        FNMetaImpl = oClassInfo;
        oClassInfo = sClassName;
        sClassName = fnBaseClass;
        fnBaseClass = null;
      }

      fnAssert(!fnBaseClass || typeof fnBaseClass === 'function');
      fnAssert(typeof sClassName === 'string' && !!sClassName);
      fnAssert(!oClassInfo || _typeof(oClassInfo) === 'object');
      fnAssert(!FNMetaImpl || typeof FNMetaImpl === 'function');
      FNMetaImpl = FNMetaImpl || Metadata;

      if (typeof FNMetaImpl.preprocessClassInfo === 'function') {
        oClassInfo = FNMetaImpl.preprocessClassInfo(oClassInfo);
      }

      oClassInfo = oClassInfo || {};
      oClassInfo.metadata = oClassInfo.metadata || {};

      if (!oClassInfo.hasOwnProperty('constructor')) {
        oClassInfo.constructor = undefined;
      }

      var fnClass = oClassInfo.constructor;
      fnAssert(!fnClass || typeof fnClass === 'function');

      if (fnBaseClass) {
        if (!fnClass) {
          if (oClassInfo.metadata.deprecated) {
            fnClass = function fnClass() {
              Log.warning('Usage of deprecated class: ' + sClassName);
              fnBaseClass.apply(this, arguments);
            };
          } else {
            fnClass = function fnClass() {
              fnBaseClass.apply(this, arguments);
            };
          }
        }

        fnClass.prototype = Object.create(fnBaseClass.prototype);
        fnClass.prototype.constructor = fnClass;
        oClassInfo.metadata.baseType = fnBaseClass.getMetadata().getName();
      } else {
        fnClass = fnClass || function () {};

        delete oClassInfo.metadata.baseType;
      }

      oClassInfo.constructor = fnClass;
      ObjectPath.set(sClassName, fnClass);
      var oMetadata = new FNMetaImpl(sClassName, oClassInfo);

      fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
      };

      if (!fnClass.getMetadata().isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
          return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
      }

      return fnClass;
    };

    var BaseObject$1 = Metadata.createClass('sap.ui.base.Object', {
      constructor: function constructor() {
        if (!(this instanceof BaseObject$1)) {
          throw Error('Cannot instantiate object: "new" is missing!');
        }
      }
    });

    BaseObject$1.prototype.destroy = function () {};

    BaseObject$1.prototype.getInterface = function () {
      var oInterface = new Interface(this, this.getMetadata().getAllPublicMethods());

      this.getInterface = function () {
        return oInterface;
      };

      return oInterface;
    };

    BaseObject$1.defineClass = function (sClassName, oStaticInfo, FNMetaImpl) {
      var oMetadata = new (FNMetaImpl || Metadata)(sClassName, oStaticInfo);
      var fnClass = oMetadata.getClass();

      fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
      };

      if (!oMetadata.isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
          return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
      }

      Log.debug('defined class \'' + sClassName + '\'' + (oMetadata.getParent() ? ' as subclass of ' + oMetadata.getParent().getName() : ''));
      return oMetadata;
    };

    BaseObject$1.prototype.isA = function (vTypeName) {
      return this.getMetadata().isA(vTypeName);
    };

    BaseObject$1.isA = function (oObject, vTypeName) {
      return oObject instanceof BaseObject$1 && oObject.isA(vTypeName);
    };

    var class2type$1 = {};
    var hasOwn$1 = class2type$1.hasOwnProperty;
    var toString$1 = class2type$1.toString;
    var fnToString$1 = hasOwn$1.toString;
    var ObjectFunctionString$1 = fnToString$1.call(Object);

    var fnIsPlainObject$1 = function fnIsPlainObject(obj) {
      var proto, Ctor;

      if (!obj || toString$1.call(obj) !== "[object Object]") {
        return false;
      }

      proto = Object.getPrototypeOf(obj);

      if (!proto) {
        return true;
      }

      Ctor = hasOwn$1.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString$1.call(Ctor) === ObjectFunctionString$1;
    };

    var oToken$1 = Object.create(null);

    var fnMerge$2 = function fnMerge() {
      var src,
          copyIsArray,
          copy,
          name,
          options,
          clone,
          target = arguments[2] || {},
          i = 3,
          length = arguments.length,
          deep = arguments[0] || false,
          skipToken = arguments[1] ? undefined : oToken$1;

      if (_typeof(target) !== 'object' && typeof target !== 'function') {
        target = {};
      }

      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];

            if (name === '__proto__' || target === copy) {
              continue;
            }

            if (deep && copy && (fnIsPlainObject$1(copy) || (copyIsArray = Array.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
              } else {
                clone = src && fnIsPlainObject$1(src) ? src : {};
              }

              target[name] = fnMerge(deep, arguments[1], clone, copy);
            } else if (copy !== skipToken) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    };

    var fnExtend = function fnExtend() {
      var args = [false, true];
      args.push.apply(args, arguments);
      return fnMerge$2.apply(null, args);
    };

    var CalendarType$1 = {
      Gregorian: "Gregorian",
      Islamic: "Islamic",
      Japanese: "Japanese",
      Persian: "Persian",
      Buddhist: "Buddhist"
    };

    var rLocale$1 = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
    var Locale$1 = BaseObject$1.extend('sap.ui.core.Locale', {
      constructor: function constructor(sLocaleId) {
        BaseObject$1.apply(this);
        var aResult = rLocale$1.exec(sLocaleId.replace(/_/g, '-'));

        if (aResult === null) {
          throw 'The given language \'' + sLocaleId + '\' does not adhere to BCP-47.';
        }

        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || null;
        this.sScript = aResult[2] || null;
        this.sRegion = aResult[3] || null;
        this.sVariant = aResult[4] && aResult[4].slice(1) || null;
        this.sExtension = aResult[5] && aResult[5].slice(1) || null;
        this.sPrivateUse = aResult[6] || null;

        if (this.sLanguage) {
          this.sLanguage = this.sLanguage.toLowerCase();
        }

        if (this.sScript) {
          this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function ($) {
            return $.toUpperCase();
          });
        }

        if (this.sRegion) {
          this.sRegion = this.sRegion.toUpperCase();
        }
      },
      getLanguage: function getLanguage() {
        return this.sLanguage;
      },
      getScript: function getScript() {
        return this.sScript;
      },
      getRegion: function getRegion() {
        return this.sRegion;
      },
      getVariant: function getVariant() {
        return this.sVariant;
      },
      getVariantSubtags: function getVariantSubtags() {
        return this.sVariant ? this.sVariant.split('-') : [];
      },
      getExtension: function getExtension() {
        return this.sExtension;
      },
      getExtensionSubtags: function getExtensionSubtags() {
        return this.sExtension ? this.sExtension.slice(2).split('-') : [];
      },
      getPrivateUse: function getPrivateUse() {
        return this.sPrivateUse;
      },
      getPrivateUseSubtags: function getPrivateUseSubtags() {
        return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : [];
      },
      hasPrivateUseSubtag: function hasPrivateUseSubtag(sSubtag) {
        fnAssert(sSubtag && sSubtag.match(/^[0-9A-Z]{1,8}$/i), 'subtag must be a valid BCP47 private use tag');
        return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
      },
      toString: function toString() {
        var r = [this.sLanguage];

        if (this.sScript) {
          r.push(this.sScript);
        }

        if (this.sRegion) {
          r.push(this.sRegion);
        }

        if (this.sVariant) {
          r.push(this.sVariant);
        }

        if (this.sExtension) {
          r.push(this.sExtension);
        }

        if (this.sPrivateUse) {
          r.push(this.sPrivateUse);
        }

        return r.join('-');
      },
      getSAPLogonLanguage: function getSAPLogonLanguage() {
        var sLanguage = this.sLanguage || '',
            m;

        if (sLanguage.indexOf('-') >= 0) {
          sLanguage = sLanguage.slice(0, sLanguage.indexOf('-'));
        }

        sLanguage = M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;

        if (sLanguage === 'zh') {
          if (this.sScript === 'Hant' || !this.sScript && this.sRegion === 'TW') {
            sLanguage = 'zf';
          }
        }

        if (this.sPrivateUse && (m = /-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))) {
          sLanguage = m[1].toLowerCase() === 'saptrc' ? '1Q' : '2Q';
        }

        return sLanguage.toUpperCase();
      }
    });
    var M_ISO639_OLD_TO_NEW = {
      'iw': 'he',
      'ji': 'yi',
      'in': 'id',
      'sh': 'sr'
    };

    function getDesigntimePropertyAsArray$1(sValue) {
      var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
      return m && m[2] ? m[2].split(/,/) : null;
    }

    var A_RTL_LOCALES = getDesigntimePropertyAsArray$1('$cldr-rtl-locales:ar,fa,he$') || [];
    Locale$1._cldrLocales = getDesigntimePropertyAsArray$1('$cldr-locales:ar,ar_EG,ar_SA,bg,br,ca,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,nn,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$');
    Locale$1._coreI18nLocales = getDesigntimePropertyAsArray$1('$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,kk,ko,lt,lv,ms,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$');

    Locale$1._impliesRTL = function (vLanguage) {
      var oLocale = vLanguage instanceof Locale$1 ? vLanguage : new Locale$1(vLanguage);
      var sLanguage = oLocale.getLanguage() || '';
      sLanguage = sLanguage && M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
      var sRegion = oLocale.getRegion() || '';

      if (sRegion && A_RTL_LOCALES.indexOf(sLanguage + '_' + sRegion) >= 0) {
        return true;
      }

      return A_RTL_LOCALES.indexOf(sLanguage) >= 0;
    };

    var resources = new Map();
    var cldrData = {};
    var cldrUrls = {}; // externally configurable mapping function for resolving (localeId -> URL)
    // default implementation - ui5 CDN

    var cldrMappingFn = function cldrMappingFn(locale) {
      return "https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/".concat(locale, ".json");
    };

    var M_ISO639_OLD_TO_NEW$1 = {
      "iw": "he",
      "ji": "yi",
      "in": "id",
      "sh": "sr"
    };

    var calcLocale = function calcLocale(language, region, script) {
      // normalize language and handle special cases
      language = language && M_ISO639_OLD_TO_NEW$1[language] || language; // Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")

      if (language === "no") {
        language = "nb";
      } // Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)


      if (language === "zh" && !region) {
        if (script === "Hans") {
          region = "CN";
        } else if (script === "Hant") {
          region = "TW";
        }
      } // try language + region


      var localeId = "".concat(language, "_").concat(region);

      if (!SUPPORTED_LOCALES.includes(localeId)) {
        // fallback to language only
        localeId = language;
      }

      if (!SUPPORTED_LOCALES.includes(localeId)) {
        // fallback to english
        localeId = DEFAULT_LOCALE;
      }

      return localeId;
    };

    var resolveMissingMappings = function resolveMissingMappings() {
      if (!cldrMappingFn) {
        return;
      }

      var missingLocales = SUPPORTED_LOCALES.filter(function (locale) {
        return !cldrData[locale] && !cldrUrls[locale];
      });
      missingLocales.forEach(function (locale) {
        cldrUrls[locale] = cldrMappingFn(locale);
      });
    };

    var registerModuleContent = function registerModuleContent(moduleName, content) {
      resources.set(moduleName, content);
    };

    var getModuleContent = function getModuleContent(moduleName) {
      var moduleContent = resources.get(moduleName);

      if (moduleContent) {
        return moduleContent;
      }

      var missingModule = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);

      if (missingModule) {
        throw new Error("CLDR data for locale ".concat(missingModule[1], " is not loaded!"));
      }

      throw new Error("Unknown module ".concat(moduleName));
    };

    var fetchCldr =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(language, region, script) {
        var localeId, cldrObj, url, OpenUI5Support, cldrContent;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resolveMissingMappings();
                localeId = calcLocale(language, region, script);
                cldrObj = cldrData[localeId];
                url = cldrUrls[localeId];
                OpenUI5Support = getFeature("OpenUI5Support");

                if (!cldrObj && OpenUI5Support) {
                  cldrObj = OpenUI5Support.getLocaleDataObject();
                }

                if (!cldrObj) {
                  _context.next = 10;
                  break;
                }

                // inlined from build or fetched independently
                registerModuleContent("sap/ui/core/cldr/".concat(localeId, ".json"), cldrObj);
                _context.next = 15;
                break;

              case 10:
                if (!url) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return fetchJsonOnce(url);

              case 13:
                cldrContent = _context.sent;
                registerModuleContent("sap/ui/core/cldr/".concat(localeId, ".json"), cldrContent);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchCldr(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    var registerCldr = function registerCldr(locale, url) {
      cldrUrls[locale] = url;
    };

    var setCldrData = function setCldrData(locale, data) {
      cldrData[locale] = data;
    };

    var LoaderExtensions = {
      loadResource: getModuleContent
    };

    var LocaleData = BaseObject$1.extend('sap.ui.core.LocaleData', {
      constructor: function constructor(oLocale) {
        this.oLocale = oLocale;
        BaseObject$1.apply(this);
        this.mData = getData(oLocale);
      },
      _get: function _get() {
        return this._getDeep(this.mData, arguments);
      },
      _getMerged: function _getMerged() {
        return this._get.apply(this, arguments);
      },
      _getDeep: function _getDeep(oObject, aPropertyNames) {
        var oResult = oObject;

        for (var i = 0; i < aPropertyNames.length; i++) {
          oResult = oResult[aPropertyNames[i]];

          if (oResult === undefined) {
            break;
          }
        }

        return oResult;
      },
      getOrientation: function getOrientation() {
        return this._get('orientation');
      },
      getLanguages: function getLanguages() {
        return this._get('languages');
      },
      getScripts: function getScripts() {
        return this._get('scripts');
      },
      getTerritories: function getTerritories() {
        return this._get('territories');
      },
      getMonths: function getMonths(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'format', sWidth);
      },
      getMonthsStandAlone: function getMonthsStandAlone(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'stand-alone', sWidth);
      },
      getDays: function getDays(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviate, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'format', sWidth);
      },
      getDaysStandAlone: function getDaysStandAlone(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviated, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'stand-alone', sWidth);
      },
      getQuarters: function getQuarters(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'format', sWidth);
      },
      getQuartersStandAlone: function getQuartersStandAlone(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'stand-alone', sWidth);
      },
      getDayPeriods: function getDayPeriods(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'format', sWidth);
      },
      getDayPeriodsStandAlone: function getDayPeriodsStandAlone(sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'stand-alone', sWidth);
      },
      getDatePattern: function getDatePattern(sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateFormats', sStyle);
      },
      getTimePattern: function getTimePattern(sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'timeFormats', sStyle);
      },
      getDateTimePattern: function getDateTimePattern(sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', sStyle);
      },
      getCombinedDateTimePattern: function getCombinedDateTimePattern(sDateStyle, sTimeStyle, sCalendarType) {
        fnAssert(sDateStyle == 'short' || sDateStyle == 'medium' || sDateStyle == 'long' || sDateStyle == 'full', 'sStyle must be short, medium, long or full');
        fnAssert(sTimeStyle == 'short' || sTimeStyle == 'medium' || sTimeStyle == 'long' || sTimeStyle == 'full', 'sStyle must be short, medium, long or full');
        var sDateTimePattern = this.getDateTimePattern(sDateStyle, sCalendarType),
            sDatePattern = this.getDatePattern(sDateStyle, sCalendarType),
            sTimePattern = this.getTimePattern(sTimeStyle, sCalendarType);
        return sDateTimePattern.replace('{0}', sTimePattern).replace('{1}', sDatePattern);
      },
      getCustomDateTimePattern: function getCustomDateTimePattern(sSkeleton, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');

        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType);
      },
      getIntervalPattern: function getIntervalPattern(sId, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'),
            aIdParts,
            sIntervalId,
            sDifference,
            oInterval,
            sPattern;

        if (sId) {
          aIdParts = sId.split('-');
          sIntervalId = aIdParts[0];
          sDifference = aIdParts[1];
          oInterval = oIntervalFormats[sIntervalId];

          if (oInterval) {
            sPattern = oInterval[sDifference];

            if (sPattern) {
              return sPattern;
            }
          }
        }

        return oIntervalFormats.intervalFormatFallback;
      },
      getCombinedIntervalPattern: function getCombinedIntervalPattern(sPattern, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'),
            sFallbackPattern = oIntervalFormats.intervalFormatFallback;

        return sFallbackPattern.replace(/\{(0|1)\}/g, sPattern);
      },
      getCustomIntervalPattern: function getCustomIntervalPattern(sSkeleton, vGreatestDiff, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats');

        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vGreatestDiff);
      },
      _getFormatPattern: function _getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var vPattern, aPatterns, oIntervalFormats;

        if (!vDiff) {
          vPattern = oAvailableFormats[sSkeleton];
        } else if (typeof vDiff === 'string') {
          if (vDiff == 'j' || vDiff == 'J') {
            vDiff = this.getPreferredHourSymbol();
          }

          oIntervalFormats = oAvailableFormats[sSkeleton];
          vPattern = oIntervalFormats && oIntervalFormats[vDiff];
        }

        if (vPattern) {
          if (_typeof(vPattern) === 'object') {
            aPatterns = Object.keys(vPattern).map(function (sKey) {
              return vPattern[sKey];
            });
          } else {
            return vPattern;
          }
        }

        if (!aPatterns) {
          aPatterns = this._createFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff);
        }

        if (aPatterns && aPatterns.length === 1) {
          return aPatterns[0];
        }

        return aPatterns;
      },
      _createFormatPattern: function _createFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var aTokens = this._parseSkeletonFormat(sSkeleton),
            aPatterns,
            oBestMatch = this._findBestMatch(aTokens, sSkeleton, oAvailableFormats),
            oToken,
            oAvailableDateTimeFormats,
            oSymbol,
            oGroup,
            sPattern,
            sSinglePattern,
            sDiffSymbol,
            sDiffGroup,
            rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,
            bSingleDate,
            i;

        if (vDiff) {
          if (typeof vDiff === 'string') {
            sDiffGroup = mCLDRSymbols[vDiff] ? mCLDRSymbols[vDiff].group : '';

            if (sDiffGroup) {
              bSingleDate = mCLDRSymbolGroups[sDiffGroup].index > aTokens[aTokens.length - 1].index;
            }

            sDiffSymbol = vDiff;
          } else {
            bSingleDate = true;

            if (aTokens[0].symbol === 'y' && oBestMatch && oBestMatch.pattern.G) {
              oSymbol = mCLDRSymbols['G'];
              oGroup = mCLDRSymbolGroups[oSymbol.group];
              aTokens.splice(0, 0, {
                symbol: 'G',
                group: oSymbol.group,
                match: oSymbol.match,
                index: oGroup.index,
                field: oGroup.field,
                length: 1
              });
            }

            for (i = aTokens.length - 1; i >= 0; i--) {
              oToken = aTokens[i];

              if (vDiff[oToken.group]) {
                bSingleDate = false;
                break;
              }
            }

            for (i = 0; i < aTokens.length; i++) {
              oToken = aTokens[i];

              if (vDiff[oToken.group]) {
                sDiffSymbol = oToken.symbol;
                break;
              }
            }

            if ((sDiffSymbol == 'h' || sDiffSymbol == 'K') && vDiff.DayPeriod) {
              sDiffSymbol = 'a';
            }
          }

          if (bSingleDate) {
            return [this.getCustomDateTimePattern(sSkeleton, sCalendarType)];
          }

          if (oBestMatch && oBestMatch.missingTokens.length === 0) {
            sPattern = oBestMatch.pattern[sDiffSymbol];

            if (sPattern && oBestMatch.distance > 0) {
              sPattern = this._expandFields(sPattern, oBestMatch.patternTokens, aTokens);
            }
          }

          if (!sPattern) {
            oAvailableDateTimeFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');

            if (rMixedSkeleton.test(sSkeleton) && 'ahHkKjJms'.indexOf(sDiffSymbol) >= 0) {
              sPattern = this._getMixedFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType, vDiff);
            } else {
              sSinglePattern = this._getFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType);
              sPattern = this.getCombinedIntervalPattern(sSinglePattern, sCalendarType);
            }
          }

          aPatterns = [sPattern];
        } else if (!oBestMatch) {
          sPattern = sSkeleton;
          aPatterns = [sPattern];
        } else {
          if (typeof oBestMatch.pattern === 'string') {
            aPatterns = [oBestMatch.pattern];
          } else if (_typeof(oBestMatch.pattern) === 'object') {
            aPatterns = [];

            for (var sKey in oBestMatch.pattern) {
              sPattern = oBestMatch.pattern[sKey];
              aPatterns.push(sPattern);
            }
          }

          if (oBestMatch.distance > 0) {
            if (oBestMatch.missingTokens.length > 0) {
              if (rMixedSkeleton.test(sSkeleton)) {
                aPatterns = [this._getMixedFormatPattern(sSkeleton, oAvailableFormats, sCalendarType)];
              } else {
                aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                aPatterns = this._appendItems(aPatterns, oBestMatch.missingTokens, sCalendarType);
              }
            } else {
              aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
            }
          }
        }

        if (sSkeleton.indexOf('J') >= 0) {
          aPatterns.forEach(function (sPattern, iIndex) {
            aPatterns[iIndex] = sPattern.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/g, '');
          });
        }

        return aPatterns;
      },
      _parseSkeletonFormat: function _parseSkeletonFormat(sSkeleton) {
        var aTokens = [],
            oToken = {
          index: -1
        },
            sSymbol,
            oSymbol,
            oGroup;

        for (var i = 0; i < sSkeleton.length; i++) {
          sSymbol = sSkeleton.charAt(i);

          if (sSymbol == 'j' || sSymbol == 'J') {
            sSymbol = this.getPreferredHourSymbol();
          }

          if (sSymbol == oToken.symbol) {
            oToken.length++;
            continue;
          }

          oSymbol = mCLDRSymbols[sSymbol];
          oGroup = mCLDRSymbolGroups[oSymbol.group];

          if (oSymbol.group == 'Other' || oGroup.diffOnly) {
            throw new Error('Symbol \'' + sSymbol + '\' is not allowed in skeleton format \'' + sSkeleton + '\'');
          }

          if (oGroup.index <= oToken.index) {
            throw new Error('Symbol \'' + sSymbol + '\' at wrong position or duplicate in skeleton format \'' + sSkeleton + '\'');
          }

          oToken = {
            symbol: sSymbol,
            group: oSymbol.group,
            match: oSymbol.match,
            index: oGroup.index,
            field: oGroup.field,
            length: 1
          };
          aTokens.push(oToken);
        }

        return aTokens;
      },
      _findBestMatch: function _findBestMatch(aTokens, sSkeleton, oAvailableFormats) {
        var aTestTokens,
            aMissingTokens,
            oToken,
            oTestToken,
            iTest,
            iDistance,
            bMatch,
            iFirstDiffPos,
            oTokenSymbol,
            oTestTokenSymbol,
            oBestMatch = {
          distance: 10000,
          firstDiffPos: -1
        };

        for (var sTestSkeleton in oAvailableFormats) {
          if (sTestSkeleton === 'intervalFormatFallback' || sTestSkeleton.indexOf('B') > -1) {
            continue;
          }

          aTestTokens = this._parseSkeletonFormat(sTestSkeleton);
          iDistance = 0;
          aMissingTokens = [];
          bMatch = true;

          if (aTokens.length < aTestTokens.length) {
            continue;
          }

          iTest = 0;
          iFirstDiffPos = aTokens.length;

          for (var i = 0; i < aTokens.length; i++) {
            oToken = aTokens[i];
            oTestToken = aTestTokens[iTest];

            if (iFirstDiffPos === aTokens.length) {
              iFirstDiffPos = i;
            }

            if (oTestToken) {
              oTokenSymbol = mCLDRSymbols[oToken.symbol];
              oTestTokenSymbol = mCLDRSymbols[oTestToken.symbol];

              if (oToken.symbol === oTestToken.symbol) {
                if (oToken.length === oTestToken.length) {
                  if (iFirstDiffPos === i) {
                    iFirstDiffPos = aTokens.length;
                  }
                } else {
                  if (oToken.length < oTokenSymbol.numericCeiling ? oTestToken.length < oTestTokenSymbol.numericCeiling : oTestToken.length >= oTestTokenSymbol.numericCeiling) {
                    iDistance += Math.abs(oToken.length - oTestToken.length);
                  } else {
                    iDistance += 5;
                  }
                }

                iTest++;
                continue;
              } else {
                if (oToken.match == oTestToken.match) {
                  iDistance += Math.abs(oToken.length - oTestToken.length) + 10;
                  iTest++;
                  continue;
                }
              }
            }

            aMissingTokens.push(oToken);
            iDistance += 50 - i;
          }

          if (iTest < aTestTokens.length) {
            bMatch = false;
          }

          if (bMatch && (iDistance < oBestMatch.distance || iDistance === oBestMatch.distance && iFirstDiffPos > oBestMatch.firstDiffPos)) {
            oBestMatch.distance = iDistance;
            oBestMatch.firstDiffPos = iFirstDiffPos;
            oBestMatch.missingTokens = aMissingTokens;
            oBestMatch.pattern = oAvailableFormats[sTestSkeleton];
            oBestMatch.patternTokens = aTestTokens;
          }
        }

        if (oBestMatch.pattern) {
          return oBestMatch;
        }
      },
      _expandFields: function _expandFields(vPattern, aPatternTokens, aTokens) {
        var bSinglePattern = typeof vPattern === 'string';
        var aPatterns;

        if (bSinglePattern) {
          aPatterns = [vPattern];
        } else {
          aPatterns = vPattern;
        }

        var aResult = aPatterns.map(function (sPattern) {
          var mGroups = {},
              mPatternGroups = {},
              sResultPatterm = '',
              bQuoted = false,
              i = 0,
              iSkeletonLength,
              iPatternLength,
              iBestLength,
              iNewLength,
              oSkeletonToken,
              oBestToken,
              oSymbol,
              sChar;
          aTokens.forEach(function (oToken) {
            mGroups[oToken.group] = oToken;
          });
          aPatternTokens.forEach(function (oToken) {
            mPatternGroups[oToken.group] = oToken;
          });

          while (i < sPattern.length) {
            sChar = sPattern.charAt(i);

            if (bQuoted) {
              sResultPatterm += sChar;

              if (sChar == '\'') {
                bQuoted = false;
              }
            } else {
              oSymbol = mCLDRSymbols[sChar];

              if (oSymbol && mGroups[oSymbol.group] && mPatternGroups[oSymbol.group]) {
                oSkeletonToken = mGroups[oSymbol.group];
                oBestToken = mPatternGroups[oSymbol.group];
                iSkeletonLength = oSkeletonToken.length;
                iBestLength = oBestToken.length;
                iPatternLength = 1;

                while (sPattern.charAt(i + 1) == sChar) {
                  i++;
                  iPatternLength++;
                }

                if (iSkeletonLength === iBestLength || (iSkeletonLength < oSymbol.numericCeiling ? iPatternLength >= oSymbol.numericCeiling : iPatternLength < oSymbol.numericCeiling)) {
                  iNewLength = iPatternLength;
                } else {
                  iNewLength = Math.max(iPatternLength, iSkeletonLength);
                }

                for (var j = 0; j < iNewLength; j++) {
                  sResultPatterm += sChar;
                }
              } else {
                sResultPatterm += sChar;

                if (sChar == '\'') {
                  bQuoted = true;
                }
              }
            }

            i++;
          }

          return sResultPatterm;
        });
        return bSinglePattern ? aResult[0] : aResult;
      },
      _appendItems: function _appendItems(aPatterns, aMissingTokens, sCalendarType) {
        var oAppendItems = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'appendItems');

        aPatterns.forEach(function (sPattern, iIndex) {
          var sDisplayName, sAppendPattern, sAppendField;
          aMissingTokens.forEach(function (oToken) {
            sAppendPattern = oAppendItems[oToken.group];
            sDisplayName = '\'' + this.getDisplayName(oToken.field) + '\'';
            sAppendField = '';

            for (var i = 0; i < oToken.length; i++) {
              sAppendField += oToken.symbol;
            }

            aPatterns[iIndex] = sAppendPattern.replace(/\{0\}/, sPattern).replace(/\{1\}/, sAppendField).replace(/\{2\}/, sDisplayName);
          }.bind(this));
        }.bind(this));
        return aPatterns;
      },
      _getMixedFormatPattern: function _getMixedFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,
            rWideMonth = /MMMM|LLLL/,
            rAbbrevMonth = /MMM|LLL/,
            rWeekDay = /E|e|c/,
            oResult,
            sDateSkeleton,
            sTimeSkeleton,
            sStyle,
            sDatePattern,
            sTimePattern,
            sDateTimePattern,
            sResultPattern;
        oResult = rMixedSkeleton.exec(sSkeleton);
        sDateSkeleton = oResult[1];
        sTimeSkeleton = oResult[2];
        sDatePattern = this._getFormatPattern(sDateSkeleton, oAvailableFormats, sCalendarType);

        if (vDiff) {
          sTimePattern = this.getCustomIntervalPattern(sTimeSkeleton, vDiff, sCalendarType);
        } else {
          sTimePattern = this._getFormatPattern(sTimeSkeleton, oAvailableFormats, sCalendarType);
        }

        if (rWideMonth.test(sDateSkeleton)) {
          sStyle = rWeekDay.test(sDateSkeleton) ? 'full' : 'long';
        } else if (rAbbrevMonth.test(sDateSkeleton)) {
          sStyle = 'medium';
        } else {
          sStyle = 'short';
        }

        sDateTimePattern = this.getDateTimePattern(sStyle, sCalendarType);
        sResultPattern = sDateTimePattern.replace(/\{1\}/, sDatePattern).replace(/\{0\}/, sTimePattern);
        return sResultPattern;
      },
      getNumberSymbol: function getNumberSymbol(sType) {
        fnAssert(sType == 'decimal' || sType == 'group' || sType == 'plusSign' || sType == 'minusSign' || sType == 'percentSign', 'sType must be decimal, group, plusSign, minusSign or percentSign');
        return this._get('symbols-latn-' + sType);
      },
      getLenientNumberSymbols: function getLenientNumberSymbols(sType) {
        fnAssert(sType == 'plusSign' || sType == 'minusSign', 'sType must be plusSign or minusSign');
        return this._get('lenient-scope-number')[sType];
      },
      getDecimalPattern: function getDecimalPattern() {
        return this._get('decimalFormat').standard;
      },
      getCurrencyPattern: function getCurrencyPattern(sContext) {
        return this._get('currencyFormat')[sContext] || this._get('currencyFormat').standard;
      },
      getCurrencySpacing: function getCurrencySpacing(sPosition) {
        return this._get('currencyFormat', 'currencySpacing', sPosition === 'after' ? 'afterCurrency' : 'beforeCurrency');
      },
      getPercentPattern: function getPercentPattern() {
        return this._get('percentFormat').standard;
      },
      getMiscPattern: function getMiscPattern(sName) {
        fnAssert(sName == 'approximately' || sName == 'atLeast' || sName == 'atMost' || sName == 'range', 'sName must be approximately, atLeast, atMost or range');
        return this._get('miscPattern')[sName];
      },
      getMinimalDaysInFirstWeek: function getMinimalDaysInFirstWeek() {
        return this._get('weekData-minDays');
      },
      getFirstDayOfWeek: function getFirstDayOfWeek() {
        return this._get('weekData-firstDay');
      },
      getWeekendStart: function getWeekendStart() {
        return this._get('weekData-weekendStart');
      },
      getWeekendEnd: function getWeekendEnd() {
        return this._get('weekData-weekendEnd');
      },
      getCustomCurrencyCodes: function getCustomCurrencyCodes() {
        var mCustomCurrencies = this._get('currency') || {},
            mCustomCurrencyCodes = {};
        Object.keys(mCustomCurrencies).forEach(function (sCurrencyKey) {
          mCustomCurrencyCodes[sCurrencyKey] = sCurrencyKey;
        });
        return mCustomCurrencyCodes;
      },
      getCurrencyDigits: function getCurrencyDigits(sCurrency) {
        var mCustomCurrencies = this._get('currency');

        if (mCustomCurrencies) {
          if (mCustomCurrencies[sCurrency] && mCustomCurrencies[sCurrency].hasOwnProperty('digits')) {
            return mCustomCurrencies[sCurrency].digits;
          } else if (mCustomCurrencies['DEFAULT'] && mCustomCurrencies['DEFAULT'].hasOwnProperty('digits')) {
            return mCustomCurrencies['DEFAULT'].digits;
          }
        }

        var iDigits = this._get('currencyDigits', sCurrency);

        if (iDigits == null) {
          iDigits = this._get('currencyDigits', 'DEFAULT');

          if (iDigits == null) {
            iDigits = 2;
          }
        }

        return iDigits;
      },
      getCurrencySymbol: function getCurrencySymbol(sCurrency) {
        var oCurrencySymbols = this.getCurrencySymbols();
        return oCurrencySymbols && oCurrencySymbols[sCurrency] || sCurrency;
      },
      getCurrencyCodeBySymbol: function getCurrencyCodeBySymbol(sCurrencySymbol) {
        var oCurrencySymbols = this._get('currencySymbols'),
            sCurrencyCode;

        for (sCurrencyCode in oCurrencySymbols) {
          if (oCurrencySymbols[sCurrencyCode] === sCurrencySymbol) {
            return sCurrencyCode;
          }
        }

        return sCurrencySymbol;
      },
      getCurrencySymbols: function getCurrencySymbols() {
        var mCustomCurrencies = this._get('currency'),
            mCustomCurrencySymbols = {},
            sIsoCode;

        for (var sCurrencyKey in mCustomCurrencies) {
          sIsoCode = mCustomCurrencies[sCurrencyKey].isoCode;

          if (mCustomCurrencies[sCurrencyKey].symbol) {
            mCustomCurrencySymbols[sCurrencyKey] = mCustomCurrencies[sCurrencyKey].symbol;
          } else if (sIsoCode) {
            mCustomCurrencySymbols[sCurrencyKey] = this._get('currencySymbols')[sIsoCode];
          }
        }

        return Object.assign({}, this._get('currencySymbols'), mCustomCurrencySymbols);
      },
      getUnitDisplayName: function getUnitDisplayName(sUnit) {
        var mUnitFormat = this.getUnitFormat(sUnit);
        return mUnitFormat && mUnitFormat['displayName'] || '';
      },
      getRelativePatterns: function getRelativePatterns(aScales, sStyle) {
        if (sStyle === undefined) {
          sStyle = 'wide';
        }

        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aPatterns = [],
            aPluralCategories = this.getPluralCategories(),
            oScale,
            oTimeEntry,
            iValue,
            iSign;

        if (!aScales) {
          aScales = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
        }

        aScales.forEach(function (sScale) {
          oScale = this._get('dateFields', sScale + '-' + sStyle);

          for (var sEntry in oScale) {
            if (sEntry.indexOf('relative-type-') === 0) {
              iValue = parseInt(sEntry.substr(14));
              aPatterns.push({
                scale: sScale,
                value: iValue,
                pattern: oScale[sEntry]
              });
            } else if (sEntry.indexOf('relativeTime-type-') == 0) {
              oTimeEntry = oScale[sEntry];
              iSign = sEntry.substr(18) === 'past' ? -1 : 1;
              aPluralCategories.forEach(function (sKey) {
                aPatterns.push({
                  scale: sScale,
                  sign: iSign,
                  pattern: oTimeEntry['relativeTimePattern-count-' + sKey]
                });
              });
            }
          }
        }.bind(this));
        return aPatterns;
      },
      getRelativePattern: function getRelativePattern(sScale, iDiff, bFuture, sStyle) {
        var sPattern, oTypes, sKey, sPluralCategory;

        if (typeof bFuture === 'string') {
          sStyle = bFuture;
          bFuture = undefined;
        }

        if (bFuture === undefined) {
          bFuture = iDiff > 0;
        }

        if (sStyle === undefined) {
          sStyle = 'wide';
        }

        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        sKey = sScale + '-' + sStyle;

        if (iDiff === 0 || iDiff === -2 || iDiff === 2) {
          sPattern = this._get('dateFields', sKey, 'relative-type-' + iDiff);
        }

        if (!sPattern) {
          oTypes = this._get('dateFields', sKey, 'relativeTime-type-' + (bFuture ? 'future' : 'past'));
          sPluralCategory = this.getPluralCategory(Math.abs(iDiff).toString());
          sPattern = oTypes['relativeTimePattern-count-' + sPluralCategory];
        }

        return sPattern;
      },
      getRelativeSecond: function getRelativeSecond(iDiff, sStyle) {
        return this.getRelativePattern('second', iDiff, sStyle);
      },
      getRelativeMinute: function getRelativeMinute(iDiff, sStyle) {
        if (iDiff == 0) {
          return null;
        }

        return this.getRelativePattern('minute', iDiff, sStyle);
      },
      getRelativeHour: function getRelativeHour(iDiff, sStyle) {
        if (iDiff == 0) {
          return null;
        }

        return this.getRelativePattern('hour', iDiff, sStyle);
      },
      getRelativeDay: function getRelativeDay(iDiff, sStyle) {
        return this.getRelativePattern('day', iDiff, sStyle);
      },
      getRelativeWeek: function getRelativeWeek(iDiff, sStyle) {
        return this.getRelativePattern('week', iDiff, sStyle);
      },
      getRelativeMonth: function getRelativeMonth(iDiff, sStyle) {
        return this.getRelativePattern('month', iDiff, sStyle);
      },
      getDisplayName: function getDisplayName(sType, sStyle) {
        fnAssert(sType == 'second' || sType == 'minute' || sType == 'hour' || sType == 'zone' || sType == 'day' || sType == 'weekday' || sType == 'week' || sType == 'month' || sType == 'quarter' || sType == 'year' || sType == 'era', 'sType must be second, minute, hour, zone, day, weekday, week, month, quarter, year, era');

        if (sStyle === undefined) {
          sStyle = 'wide';
        }

        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aSingleFormFields = ['era', 'weekday', 'zone'],
            sKey = aSingleFormFields.indexOf(sType) === -1 ? sType + '-' + sStyle : sType;
        return this._get('dateFields', sKey, 'displayName');
      },
      getRelativeYear: function getRelativeYear(iDiff, sStyle) {
        return this.getRelativePattern('year', iDiff, sStyle);
      },
      getDecimalFormat: function getDecimalFormat(sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats;

        switch (sStyle) {
          case 'long':
            oFormats = this._get('decimalFormat-long');
            break;

          default:
            oFormats = this._get('decimalFormat-short');
            break;
        }

        if (oFormats) {
          var sName = sNumber + '-' + sPlural;
          sFormat = oFormats[sName];

          if (!sFormat) {
            sName = sNumber + '-other';
            sFormat = oFormats[sName];
          }
        }

        return sFormat;
      },
      getCurrencyFormat: function getCurrencyFormat(sStyle, sNumber, sPlural) {
        var sFormat;

        var oFormats = this._get('currencyFormat-' + sStyle);

        if (!oFormats) {
          if (sStyle === 'sap-short') {
            throw new Error('Failed to get CLDR data for property "currencyFormat-sap-short"');
          }

          oFormats = this._get('currencyFormat-short');
        }

        if (oFormats) {
          var sName = sNumber + '-' + sPlural;
          sFormat = oFormats[sName];

          if (!sFormat) {
            sName = sNumber + '-other';
            sFormat = oFormats[sName];
          }
        }

        return sFormat;
      },
      getListFormat: function getListFormat(sType, sStyle) {
        var oFormats = this._get('listPattern-' + (sType || 'standard') + '-' + (sStyle || 'wide'));

        if (oFormats) {
          return oFormats;
        }

        return {};
      },
      getResolvedUnitFormat: function getResolvedUnitFormat(sUnit) {
        sUnit = this.getUnitFromMapping(sUnit) || sUnit;
        return this.getUnitFormat(sUnit);
      },
      getUnitFormat: function getUnitFormat(sUnit) {
        return this._get('units', 'short', sUnit);
      },
      getUnitFormats: function getUnitFormats() {
        return this._getMerged('units', 'short');
      },
      getUnitFromMapping: function getUnitFromMapping(sMapping) {
        return this._get('unitMappings', sMapping);
      },
      getEras: function getEras(sWidth, sCalendarType) {
        fnAssert(sWidth == 'wide' || sWidth == 'abbreviated' || sWidth == 'narrow', 'sWidth must be wide, abbreviate or narrow');

        var oEras = this._get(getCLDRCalendarName(sCalendarType), 'era-' + sWidth),
            aEras = [];

        for (var i in oEras) {
          aEras[parseInt(i)] = oEras[i];
        }

        return aEras;
      },
      getEraDates: function getEraDates(sCalendarType) {
        var oEraDates = this._get('eras-' + sCalendarType.toLowerCase()),
            aEraDates = [];

        for (var i in oEraDates) {
          aEraDates[parseInt(i)] = oEraDates[i];
        }

        return aEraDates;
      },
      getCalendarWeek: function getCalendarWeek(sStyle, iWeekNumber) {
        fnAssert(sStyle == 'wide' || sStyle == 'narrow', 'sStyle must be wide or narrow');
        var oMessageBundle = Core.getLibraryResourceBundle('sap.ui.core', this.oLocale.toString()),
            sKey = 'date.week.calendarweek.' + sStyle;
        return oMessageBundle.getText(sKey, iWeekNumber);
      },
      getPreferredCalendarType: function getPreferredCalendarType() {
        var sCalendarPreference = this._get('calendarPreference'),
            aCalendars = sCalendarPreference ? sCalendarPreference.split(' ') : [],
            sCalendarName,
            sType,
            i;

        for (i = 0; i < aCalendars.length; i++) {
          sCalendarName = aCalendars[i].split('-')[0];

          for (sType in CalendarType$1) {
            if (sCalendarName === sType.toLowerCase()) {
              return sType;
            }
          }
        }

        return CalendarType$1.Gregorian;
      },
      getPreferredHourSymbol: function getPreferredHourSymbol() {
        return this._get('timeData', '_preferred');
      },
      getPluralCategories: function getPluralCategories() {
        var oPlurals = this._get('plurals'),
            aCategories = Object.keys(oPlurals);

        aCategories.push('other');
        return aCategories;
      },
      getPluralCategory: function getPluralCategory(sNumber) {
        var oPlurals = this._get('plurals');

        if (typeof sNumber === 'number') {
          sNumber = sNumber.toString();
        }

        if (!this._pluralTest) {
          this._pluralTest = {};
        }

        for (var sCategory in oPlurals) {
          var fnTest = this._pluralTest[sCategory];

          if (!fnTest) {
            fnTest = this._parsePluralRule(oPlurals[sCategory]);
            this._pluralTest[sCategory] = fnTest;
          }

          if (fnTest(sNumber)) {
            return sCategory;
          }
        }

        return 'other';
      },
      _parsePluralRule: function _parsePluralRule(sRule) {
        var OP_OR = 'or',
            OP_AND = 'and',
            OP_MOD = '%',
            OP_EQ = '=',
            OP_NEQ = '!=',
            OPD_N = 'n',
            OPD_I = 'i',
            OPD_F = 'f',
            OPD_T = 't',
            OPD_V = 'v',
            OPD_W = 'w',
            RANGE = '..',
            SEP = ',';
        var i = 0,
            aTokens;
        aTokens = sRule.split(' ');

        function accept(sToken) {
          if (aTokens[i] === sToken) {
            i++;
            return true;
          }

          return false;
        }

        function consume() {
          var sToken = aTokens[i];
          i++;
          return sToken;
        }

        function or_condition() {
          var fnAnd, fnOr;
          fnAnd = and_condition();

          if (accept(OP_OR)) {
            fnOr = or_condition();
            return function (o) {
              return fnAnd(o) || fnOr(o);
            };
          }

          return fnAnd;
        }

        function and_condition() {
          var fnRelation, fnAnd;
          fnRelation = relation();

          if (accept(OP_AND)) {
            fnAnd = and_condition();
            return function (o) {
              return fnRelation(o) && fnAnd(o);
            };
          }

          return fnRelation;
        }

        function relation() {
          var fnExpr, fnRangeList, bEq;
          fnExpr = expr();

          if (accept(OP_EQ)) {
            bEq = true;
          } else if (accept(OP_NEQ)) {
            bEq = false;
          } else {
            throw new Error('Expected \'=\' or \'!=\'');
          }

          fnRangeList = range_list();

          if (bEq) {
            return function (o) {
              return fnRangeList(o).indexOf(fnExpr(o)) >= 0;
            };
          } else {
            return function (o) {
              return fnRangeList(o).indexOf(fnExpr(o)) === -1;
            };
          }
        }

        function expr() {
          var fnOperand;
          fnOperand = operand();

          if (accept(OP_MOD)) {
            var iDivisor = parseInt(consume());
            return function (o) {
              return fnOperand(o) % iDivisor;
            };
          }

          return fnOperand;
        }

        function operand() {
          if (accept(OPD_N)) {
            return function (o) {
              return o.n;
            };
          } else if (accept(OPD_I)) {
            return function (o) {
              return o.i;
            };
          } else if (accept(OPD_F)) {
            return function (o) {
              return o.f;
            };
          } else if (accept(OPD_T)) {
            return function (o) {
              return o.t;
            };
          } else if (accept(OPD_V)) {
            return function (o) {
              return o.v;
            };
          } else if (accept(OPD_W)) {
            return function (o) {
              return o.w;
            };
          } else {
            throw new Error('Unknown operand: ' + consume());
          }
        }

        function range_list() {
          var aValues = [],
              sRangeList = consume(),
              aParts = sRangeList.split(SEP),
              aRange,
              iFrom,
              iTo;
          aParts.forEach(function (sPart) {
            aRange = sPart.split(RANGE);

            if (aRange.length === 1) {
              aValues.push(parseInt(sPart));
            } else {
              iFrom = parseInt(aRange[0]);
              iTo = parseInt(aRange[1]);

              for (var i = iFrom; i <= iTo; i++) {
                aValues.push(i);
              }
            }
          });
          return function (o) {
            return aValues;
          };
        }

        var fnOr = or_condition();

        if (i != aTokens.length) {
          throw new Error('Not completely parsed');
        }

        return function (sValue) {
          var iDotPos = sValue.indexOf('.'),
              sDecimal,
              sFraction,
              sFractionNoZeros,
              o;

          if (iDotPos === -1) {
            sDecimal = sValue;
            sFraction = '';
            sFractionNoZeros = '';
          } else {
            sDecimal = sValue.substr(0, iDotPos);
            sFraction = sValue.substr(iDotPos + 1);
            sFractionNoZeros = sFraction.replace(/0+$/, '');
          }

          o = {
            n: parseFloat(sValue),
            i: parseInt(sDecimal),
            v: sFraction.length,
            w: sFractionNoZeros.length,
            f: parseInt(sFraction),
            t: parseInt(sFractionNoZeros)
          };
          return fnOr(o);
        };
      }
    });
    var mCLDRSymbolGroups = {
      'Era': {
        field: 'era',
        index: 0
      },
      'Year': {
        field: 'year',
        index: 1
      },
      'Quarter': {
        field: 'quarter',
        index: 2
      },
      'Month': {
        field: 'month',
        index: 3
      },
      'Week': {
        field: 'week',
        index: 4
      },
      'Day-Of-Week': {
        field: 'weekday',
        index: 5
      },
      'Day': {
        field: 'day',
        index: 6
      },
      'DayPeriod': {
        field: 'hour',
        index: 7,
        diffOnly: true
      },
      'Hour': {
        field: 'hour',
        index: 8
      },
      'Minute': {
        field: 'minute',
        index: 9
      },
      'Second': {
        field: 'second',
        index: 10
      },
      'Timezone': {
        field: 'zone',
        index: 11
      }
    };
    var mCLDRSymbols = {
      'G': {
        group: 'Era',
        match: 'Era',
        numericCeiling: 1
      },
      'y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
      },
      'Y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
      },
      'Q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
      },
      'q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
      },
      'M': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
      },
      'L': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
      },
      'w': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
      },
      'W': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
      },
      'd': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
      },
      'D': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
      },
      'E': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 1
      },
      'e': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 3
      },
      'c': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 2
      },
      'h': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
      },
      'H': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
      },
      'k': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
      },
      'K': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
      },
      'm': {
        group: 'Minute',
        match: 'Minute',
        numericCeiling: 100
      },
      's': {
        group: 'Second',
        match: 'Second',
        numericCeiling: 100
      },
      'z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'Z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'O': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'v': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'V': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'X': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'x': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
      },
      'S': {
        group: 'Other',
        numericCeiling: 100
      },
      'u': {
        group: 'Other',
        numericCeiling: 100
      },
      'U': {
        group: 'Other',
        numericCeiling: 1
      },
      'r': {
        group: 'Other',
        numericCeiling: 100
      },
      'F': {
        group: 'Other',
        numericCeiling: 100
      },
      'g': {
        group: 'Other',
        numericCeiling: 100
      },
      'a': {
        group: 'DayPeriod',
        numericCeiling: 1
      },
      'b': {
        group: 'Other',
        numericCeiling: 1
      },
      'B': {
        group: 'Other',
        numericCeiling: 1
      },
      'A': {
        group: 'Other',
        numericCeiling: 100
      }
    };
    var M_DEFAULT_DATA = {
      'orientation': 'left-to-right',
      'languages': {},
      'scripts': {},
      'territories': {},
      'ca-gregorian': {
        'dateFormats': {
          'full': 'EEEE, MMMM d, y',
          'long': 'MMMM d, y',
          'medium': 'MMM d, y',
          'short': 'M/d/yy'
        },
        'timeFormats': {
          'full': 'h:mm:ss a zzzz',
          'long': 'h:mm:ss a z',
          'medium': 'h:mm:ss a',
          'short': 'h:mm a'
        },
        'dateTimeFormats': {
          'full': '{1} \'at\' {0}',
          'long': '{1} \'at\' {0}',
          'medium': '{1}, {0}',
          'short': '{1}, {0}',
          'availableFormats': {
            'd': 'd',
            'E': 'ccc',
            'Ed': 'd E',
            'Ehm': 'E h:mm a',
            'EHm': 'E HH:mm',
            'Ehms': 'E h:mm:ss a',
            'EHms': 'E HH:mm:ss',
            'Gy': 'y G',
            'GyMMM': 'MMM y G',
            'GyMMMd': 'MMM d, y G',
            'GyMMMEd': 'E, MMM d, y G',
            'h': 'h a',
            'H': 'HH',
            'hm': 'h:mm a',
            'Hm': 'HH:mm',
            'hms': 'h:mm:ss a',
            'Hms': 'HH:mm:ss',
            'hmsv': 'h:mm:ss a v',
            'Hmsv': 'HH:mm:ss v',
            'hmv': 'h:mm a v',
            'Hmv': 'HH:mm v',
            'M': 'L',
            'Md': 'M/d',
            'MEd': 'E, M/d',
            'MMM': 'LLL',
            'MMMd': 'MMM d',
            'MMMEd': 'E, MMM d',
            'MMMMd': 'MMMM d',
            'ms': 'mm:ss',
            'y': 'y',
            'yM': 'M/y',
            'yMd': 'M/d/y',
            'yMEd': 'E, M/d/y',
            'yMMM': 'MMM y',
            'yMMMd': 'MMM d, y',
            'yMMMEd': 'E, MMM d, y',
            'yMMMM': 'MMMM y',
            'yQQQ': 'QQQ y',
            'yQQQQ': 'QQQQ y'
          },
          'appendItems': {
            'Day': '{0} ({2}: {1})',
            'Day-Of-Week': '{0} {1}',
            'Era': '{0} {1}',
            'Hour': '{0} ({2}: {1})',
            'Minute': '{0} ({2}: {1})',
            'Month': '{0} ({2}: {1})',
            'Quarter': '{0} ({2}: {1})',
            'Second': '{0} ({2}: {1})',
            'Timezone': '{0} {1}',
            'Week': '{0} ({2}: {1})',
            'Year': '{0} {1}'
          },
          'intervalFormats': {
            'intervalFormatFallback': "{0} \u2013 {1}",
            'd': {
              'd': "d \u2013 d"
            },
            'h': {
              'a': "h a \u2013 h a",
              'h': "h \u2013 h a"
            },
            'H': {
              'H': "HH \u2013 HH"
            },
            'hm': {
              'a': "h:mm a \u2013 h:mm a",
              'h': "h:mm \u2013 h:mm a",
              'm': "h:mm \u2013 h:mm a"
            },
            'Hm': {
              'H': "HH:mm \u2013 HH:mm",
              'm': "HH:mm \u2013 HH:mm"
            },
            'hmv': {
              'a': "h:mm a \u2013 h:mm a v",
              'h': "h:mm \u2013 h:mm a v",
              'm': "h:mm \u2013 h:mm a v"
            },
            'Hmv': {
              'H': "HH:mm \u2013 HH:mm v",
              'm': "HH:mm \u2013 HH:mm v"
            },
            'hv': {
              'a': "h a \u2013 h a v",
              'h': "h \u2013 h a v"
            },
            'Hv': {
              'H': "HH \u2013 HH v"
            },
            'M': {
              'M': "M \u2013 M"
            },
            'Md': {
              'd': "M/d \u2013 M/d",
              'M': "M/d \u2013 M/d"
            },
            'MEd': {
              'd': "E, M/d \u2013 E, M/d",
              'M': "E, M/d \u2013 E, M/d"
            },
            'MMM': {
              'M': "MMM \u2013 MMM"
            },
            'MMMd': {
              'd': "MMM d \u2013 d",
              'M': "MMM d \u2013 MMM d"
            },
            'MMMEd': {
              'd': "E, MMM d \u2013 E, MMM d",
              'M': "E, MMM d \u2013 E, MMM d"
            },
            'y': {
              'y': "y \u2013 y"
            },
            'yM': {
              'M': "M/y \u2013 M/y",
              'y': "M/y \u2013 M/y"
            },
            'yMd': {
              'd': "M/d/y \u2013 M/d/y",
              'M': "M/d/y \u2013 M/d/y",
              'y': "M/d/y \u2013 M/d/y"
            },
            'yMEd': {
              'd': "E, M/d/y \u2013 E, M/d/y",
              'M': "E, M/d/y \u2013 E, M/d/y",
              'y': "E, M/d/y \u2013 E, M/d/y"
            },
            'yMMM': {
              'M': "MMM \u2013 MMM y",
              'y': "MMM y \u2013 MMM y"
            },
            'yMMMd': {
              'd': "MMM d \u2013 d, y",
              'M': "MMM d \u2013 MMM d, y",
              'y': "MMM d, y \u2013 MMM d, y"
            },
            'yMMMEd': {
              'd': "E, MMM d \u2013 E, MMM d, y",
              'M': "E, MMM d \u2013 E, MMM d, y",
              'y': "E, MMM d, y \u2013 E, MMM d, y"
            },
            'yMMMM': {
              'M': "MMMM \u2013 MMMM y",
              'y': "MMMM y \u2013 MMMM y"
            }
          }
        },
        'months': {
          'format': {
            'abbreviated': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            'wide': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          },
          'stand-alone': {
            'abbreviated': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            'wide': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          }
        },
        'days': {
          'format': {
            'abbreviated': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            'short': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            'wide': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          'stand-alone': {
            'abbreviated': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            'short': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            'wide': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          }
        },
        'quarters': {
          'format': {
            'abbreviated': ['Q1', 'Q2', 'Q3', 'Q4'],
            'narrow': ['1', '2', '3', '4'],
            'wide': ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
          },
          'stand-alone': {
            'abbreviated': ['Q1', 'Q2', 'Q3', 'Q4'],
            'narrow': ['1', '2', '3', '4'],
            'wide': ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
          }
        },
        'dayPeriods': {
          'format': {
            'abbreviated': ['AM', 'PM'],
            'narrow': ['a', 'p'],
            'wide': ['AM', 'PM']
          },
          'stand-alone': {
            'abbreviated': ['AM', 'PM'],
            'narrow': ['AM', 'PM'],
            'wide': ['AM', 'PM']
          }
        },
        'era-wide': {
          '0': 'Before Christ',
          '1': 'Anno Domini'
        },
        'era-abbreviated': {
          '0': 'BC',
          '1': 'AD'
        },
        'era-narrow': {
          '0': 'B',
          '1': 'A'
        }
      },
      'eras-gregorian': {
        '0': {
          '_end': '0-12-31'
        },
        '1': {
          '_start': '1-01-01'
        }
      },
      'dateFields': {
        'era': {
          'displayName': 'era'
        },
        'year-wide': {
          'displayName': 'year',
          'relative-type--1': 'last year',
          'relative-type-0': 'this year',
          'relative-type-1': 'next year',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} year',
            'relativeTimePattern-count-other': 'in {0} years'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} year ago',
            'relativeTimePattern-count-other': '{0} years ago'
          }
        },
        'year-short': {
          'displayName': 'yr.',
          'relative-type--1': 'last yr.',
          'relative-type-0': 'this yr.',
          'relative-type-1': 'next yr.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} yr.',
            'relativeTimePattern-count-other': 'in {0} yr.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} yr. ago',
            'relativeTimePattern-count-other': '{0} yr. ago'
          }
        },
        'year-narrow': {
          'displayName': 'yr.',
          'relative-type--1': 'last yr.',
          'relative-type-0': 'this yr.',
          'relative-type-1': 'next yr.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} yr.',
            'relativeTimePattern-count-other': 'in {0} yr.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} yr. ago',
            'relativeTimePattern-count-other': '{0} yr. ago'
          }
        },
        'quarter-wide': {
          'displayName': 'quarter',
          'relative-type--1': 'last quarter',
          'relative-type-0': 'this quarter',
          'relative-type-1': 'next quarter',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} quarter',
            'relativeTimePattern-count-other': 'in {0} quarters'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} quarter ago',
            'relativeTimePattern-count-other': '{0} quarters ago'
          }
        },
        'quarter-short': {
          'displayName': 'qtr.',
          'relative-type--1': 'last qtr.',
          'relative-type-0': 'this qtr.',
          'relative-type-1': 'next qtr.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} qtr.',
            'relativeTimePattern-count-other': 'in {0} qtrs.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} qtr. ago',
            'relativeTimePattern-count-other': '{0} qtrs. ago'
          }
        },
        'quarter-narrow': {
          'displayName': 'qtr.',
          'relative-type--1': 'last qtr.',
          'relative-type-0': 'this qtr.',
          'relative-type-1': 'next qtr.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} qtr.',
            'relativeTimePattern-count-other': 'in {0} qtrs.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} qtr. ago',
            'relativeTimePattern-count-other': '{0} qtrs. ago'
          }
        },
        'month-wide': {
          'displayName': 'month',
          'relative-type--1': 'last month',
          'relative-type-0': 'this month',
          'relative-type-1': 'next month',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} month',
            'relativeTimePattern-count-other': 'in {0} months'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} month ago',
            'relativeTimePattern-count-other': '{0} months ago'
          }
        },
        'month-short': {
          'displayName': 'mo.',
          'relative-type--1': 'last mo.',
          'relative-type-0': 'this mo.',
          'relative-type-1': 'next mo.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} mo.',
            'relativeTimePattern-count-other': 'in {0} mo.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} mo. ago',
            'relativeTimePattern-count-other': '{0} mo. ago'
          }
        },
        'month-narrow': {
          'displayName': 'mo.',
          'relative-type--1': 'last mo.',
          'relative-type-0': 'this mo.',
          'relative-type-1': 'next mo.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} mo.',
            'relativeTimePattern-count-other': 'in {0} mo.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} mo. ago',
            'relativeTimePattern-count-other': '{0} mo. ago'
          }
        },
        'week-wide': {
          'displayName': 'week',
          'relative-type--1': 'last week',
          'relative-type-0': 'this week',
          'relative-type-1': 'next week',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} week',
            'relativeTimePattern-count-other': 'in {0} weeks'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} week ago',
            'relativeTimePattern-count-other': '{0} weeks ago'
          },
          'relativePeriod': 'the week of {0}'
        },
        'week-short': {
          'displayName': 'wk.',
          'relative-type--1': 'last wk.',
          'relative-type-0': 'this wk.',
          'relative-type-1': 'next wk.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} wk.',
            'relativeTimePattern-count-other': 'in {0} wk.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} wk. ago',
            'relativeTimePattern-count-other': '{0} wk. ago'
          },
          'relativePeriod': 'the week of {0}'
        },
        'week-narrow': {
          'displayName': 'wk.',
          'relative-type--1': 'last wk.',
          'relative-type-0': 'this wk.',
          'relative-type-1': 'next wk.',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} wk.',
            'relativeTimePattern-count-other': 'in {0} wk.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} wk. ago',
            'relativeTimePattern-count-other': '{0} wk. ago'
          },
          'relativePeriod': 'the week of {0}'
        },
        'day-wide': {
          'displayName': 'day',
          'relative-type--1': 'yesterday',
          'relative-type-0': 'today',
          'relative-type-1': 'tomorrow',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} day',
            'relativeTimePattern-count-other': 'in {0} days'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} day ago',
            'relativeTimePattern-count-other': '{0} days ago'
          }
        },
        'day-short': {
          'displayName': 'day',
          'relative-type--1': 'yesterday',
          'relative-type-0': 'today',
          'relative-type-1': 'tomorrow',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} day',
            'relativeTimePattern-count-other': 'in {0} days'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} day ago',
            'relativeTimePattern-count-other': '{0} days ago'
          }
        },
        'day-narrow': {
          'displayName': 'day',
          'relative-type--1': 'yesterday',
          'relative-type-0': 'today',
          'relative-type-1': 'tomorrow',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} day',
            'relativeTimePattern-count-other': 'in {0} days'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} day ago',
            'relativeTimePattern-count-other': '{0} days ago'
          }
        },
        'weekday': {
          'displayName': 'day of the week'
        },
        'hour-wide': {
          'displayName': 'hour',
          'relative-type-0': 'this hour',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} hour',
            'relativeTimePattern-count-other': 'in {0} hours'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} hour ago',
            'relativeTimePattern-count-other': '{0} hours ago'
          }
        },
        'hour-short': {
          'displayName': 'hr.',
          'relative-type-0': 'this hour',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} hr.',
            'relativeTimePattern-count-other': 'in {0} hr.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} hr. ago',
            'relativeTimePattern-count-other': '{0} hr. ago'
          }
        },
        'hour-narrow': {
          'displayName': 'hr.',
          'relative-type-0': 'this hour',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} hr.',
            'relativeTimePattern-count-other': 'in {0} hr.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} hr. ago',
            'relativeTimePattern-count-other': '{0} hr. ago'
          }
        },
        'minute-wide': {
          'displayName': 'minute',
          'relative-type-0': 'this minute',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} minute',
            'relativeTimePattern-count-other': 'in {0} minutes'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} minute ago',
            'relativeTimePattern-count-other': '{0} minutes ago'
          }
        },
        'minute-short': {
          'displayName': 'min.',
          'relative-type-0': 'this minute',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} min.',
            'relativeTimePattern-count-other': 'in {0} min.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} min. ago',
            'relativeTimePattern-count-other': '{0} min. ago'
          }
        },
        'minute-narrow': {
          'displayName': 'min.',
          'relative-type-0': 'this minute',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} min.',
            'relativeTimePattern-count-other': 'in {0} min.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} min. ago',
            'relativeTimePattern-count-other': '{0} min. ago'
          }
        },
        'second-wide': {
          'displayName': 'second',
          'relative-type-0': 'now',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} second',
            'relativeTimePattern-count-other': 'in {0} seconds'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} second ago',
            'relativeTimePattern-count-other': '{0} seconds ago'
          }
        },
        'second-short': {
          'displayName': 'sec.',
          'relative-type-0': 'now',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} sec.',
            'relativeTimePattern-count-other': 'in {0} sec.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} sec. ago',
            'relativeTimePattern-count-other': '{0} sec. ago'
          }
        },
        'second-narrow': {
          'displayName': 'sec.',
          'relative-type-0': 'now',
          'relativeTime-type-future': {
            'relativeTimePattern-count-one': 'in {0} sec.',
            'relativeTimePattern-count-other': 'in {0} sec.'
          },
          'relativeTime-type-past': {
            'relativeTimePattern-count-one': '{0} sec. ago',
            'relativeTimePattern-count-other': '{0} sec. ago'
          }
        },
        'zone': {
          'displayName': 'time zone'
        }
      },
      'decimalFormat': {
        'standard': '#,##0.###'
      },
      'currencyFormat': {
        'standard': '\xA4#,##0.00',
        'currencySpacing': {
          'beforeCurrency': {
            'currencyMatch': '[:^S:]',
            'surroundingMatch': '[:digit:]',
            'insertBetween': '\xA0'
          },
          'afterCurrency': {
            'currencyMatch': '[:^S:]',
            'surroundingMatch': '[:digit:]',
            'insertBetween': '\xA0'
          }
        }
      },
      'percentFormat': {
        'standard': '#,##0%'
      },
      'miscPattern': {
        'approximately': '~{0}',
        'atLeast': '{0}+',
        'atMost': "\u2264{0}",
        'range': "{0}\u2013{1}"
      },
      'symbols-latn-decimal': '.',
      'symbols-latn-group': ',',
      'symbols-latn-plusSign': '+',
      'symbols-latn-minusSign': '-',
      'symbols-latn-percentSign': '%',
      'weekData-minDays': 4,
      'weekData-firstDay': 1,
      'weekData-weekendStart': 6,
      'weekData-weekendEnd': 0,
      'timeData': {
        _allowed: 'H h',
        _preferred: 'H'
      },
      'lenient-scope-number': {
        'minusSign': "-\u2010\u2012\u2013\u207B\u208B\u2212\u2796\uFE63",
        'commaSign': ",\u060C\u066B\u3001\uFE10\uFE11\uFE50\uFE51\uFF0C",
        'plusSign': "+\u207A\u208A\u2795\uFB29\uFE62"
      },
      'plurals': {},
      'units': {
        'short': {
          'per': {
            'compoundUnitPattern': '{0}/{1}'
          },
          'acceleration-g-force': {
            'displayName': 'g-force',
            'unitPattern-count-one': '{0} G',
            'unitPattern-count-other': '{0} G'
          },
          'acceleration-meter-per-second-squared': {
            'displayName': 'meters/sec\xB2',
            'unitPattern-count-one': '{0} m/s\xB2',
            'unitPattern-count-other': '{0} m/s\xB2'
          },
          'angle-revolution': {
            'displayName': 'rev',
            'unitPattern-count-one': '{0} rev',
            'unitPattern-count-other': '{0} rev'
          },
          'angle-radian': {
            'displayName': 'radians',
            'unitPattern-count-one': '{0} rad',
            'unitPattern-count-other': '{0} rad'
          },
          'angle-degree': {
            'displayName': 'degrees',
            'unitPattern-count-one': '{0} deg',
            'unitPattern-count-other': '{0} deg'
          },
          'angle-arc-minute': {
            'displayName': 'arcmins',
            'unitPattern-count-one': '{0} arcmin',
            'unitPattern-count-other': '{0} arcmins'
          },
          'angle-arc-second': {
            'displayName': 'arcsecs',
            'unitPattern-count-one': '{0} arcsec',
            'unitPattern-count-other': '{0} arcsecs'
          },
          'area-square-kilometer': {
            'displayName': 'km\xB2',
            'unitPattern-count-one': '{0} km\xB2',
            'unitPattern-count-other': '{0} km\xB2',
            'perUnitPattern': '{0}/km\xB2'
          },
          'area-hectare': {
            'displayName': 'hectares',
            'unitPattern-count-one': '{0} ha',
            'unitPattern-count-other': '{0} ha'
          },
          'area-square-meter': {
            'displayName': 'meters\xB2',
            'unitPattern-count-one': '{0} m\xB2',
            'unitPattern-count-other': '{0} m\xB2',
            'perUnitPattern': '{0}/m\xB2'
          },
          'area-square-centimeter': {
            'displayName': 'cm\xB2',
            'unitPattern-count-one': '{0} cm\xB2',
            'unitPattern-count-other': '{0} cm\xB2',
            'perUnitPattern': '{0}/cm\xB2'
          },
          'area-square-mile': {
            'displayName': 'sq miles',
            'unitPattern-count-one': '{0} sq mi',
            'unitPattern-count-other': '{0} sq mi',
            'perUnitPattern': '{0}/mi\xB2'
          },
          'area-acre': {
            'displayName': 'acres',
            'unitPattern-count-one': '{0} ac',
            'unitPattern-count-other': '{0} ac'
          },
          'area-square-yard': {
            'displayName': 'yards\xB2',
            'unitPattern-count-one': '{0} yd\xB2',
            'unitPattern-count-other': '{0} yd\xB2'
          },
          'area-square-foot': {
            'displayName': 'sq feet',
            'unitPattern-count-one': '{0} sq ft',
            'unitPattern-count-other': '{0} sq ft'
          },
          'area-square-inch': {
            'displayName': 'inches\xB2',
            'unitPattern-count-one': '{0} in\xB2',
            'unitPattern-count-other': '{0} in\xB2',
            'perUnitPattern': '{0}/in\xB2'
          },
          'concentr-karat': {
            'displayName': 'karats',
            'unitPattern-count-one': '{0} kt',
            'unitPattern-count-other': '{0} kt'
          },
          'concentr-milligram-per-deciliter': {
            'displayName': 'mg/dL',
            'unitPattern-count-one': '{0} mg/dL',
            'unitPattern-count-other': '{0} mg/dL'
          },
          'concentr-millimole-per-liter': {
            'displayName': 'millimol/liter',
            'unitPattern-count-one': '{0} mmol/L',
            'unitPattern-count-other': '{0} mmol/L'
          },
          'concentr-part-per-million': {
            'displayName': 'parts/million',
            'unitPattern-count-one': '{0} ppm',
            'unitPattern-count-other': '{0} ppm'
          },
          'consumption-liter-per-kilometer': {
            'displayName': 'liters/km',
            'unitPattern-count-one': '{0} L/km',
            'unitPattern-count-other': '{0} L/km'
          },
          'consumption-liter-per-100kilometers': {
            'displayName': 'L/100 km',
            'unitPattern-count-one': '{0} L/100 km',
            'unitPattern-count-other': '{0} L/100 km'
          },
          'consumption-mile-per-gallon': {
            'displayName': 'miles/gal',
            'unitPattern-count-one': '{0} mpg',
            'unitPattern-count-other': '{0} mpg'
          },
          'consumption-mile-per-gallon-imperial': {
            'displayName': 'miles/gal Imp.',
            'unitPattern-count-one': '{0} mpg Imp.',
            'unitPattern-count-other': '{0} mpg Imp.'
          },
          'digital-terabyte': {
            'displayName': 'TByte',
            'unitPattern-count-one': '{0} TB',
            'unitPattern-count-other': '{0} TB'
          },
          'digital-terabit': {
            'displayName': 'Tbit',
            'unitPattern-count-one': '{0} Tb',
            'unitPattern-count-other': '{0} Tb'
          },
          'digital-gigabyte': {
            'displayName': 'GByte',
            'unitPattern-count-one': '{0} GB',
            'unitPattern-count-other': '{0} GB'
          },
          'digital-gigabit': {
            'displayName': 'Gbit',
            'unitPattern-count-one': '{0} Gb',
            'unitPattern-count-other': '{0} Gb'
          },
          'digital-megabyte': {
            'displayName': 'MByte',
            'unitPattern-count-one': '{0} MB',
            'unitPattern-count-other': '{0} MB'
          },
          'digital-megabit': {
            'displayName': 'Mbit',
            'unitPattern-count-one': '{0} Mb',
            'unitPattern-count-other': '{0} Mb'
          },
          'digital-kilobyte': {
            'displayName': 'kByte',
            'unitPattern-count-one': '{0} kB',
            'unitPattern-count-other': '{0} kB'
          },
          'digital-kilobit': {
            'displayName': 'kbit',
            'unitPattern-count-one': '{0} kb',
            'unitPattern-count-other': '{0} kb'
          },
          'digital-byte': {
            'displayName': 'byte',
            'unitPattern-count-one': '{0} byte',
            'unitPattern-count-other': '{0} byte'
          },
          'digital-bit': {
            'displayName': 'bit',
            'unitPattern-count-one': '{0} bit',
            'unitPattern-count-other': '{0} bit'
          },
          'duration-century': {
            'displayName': 'c',
            'unitPattern-count-one': '{0} c',
            'unitPattern-count-other': '{0} c'
          },
          'duration-year': {
            'displayName': 'years',
            'unitPattern-count-one': '{0} yr',
            'unitPattern-count-other': '{0} yrs',
            'perUnitPattern': '{0}/y'
          },
          'duration-month': {
            'displayName': 'months',
            'unitPattern-count-one': '{0} mth',
            'unitPattern-count-other': '{0} mths',
            'perUnitPattern': '{0}/m'
          },
          'duration-week': {
            'displayName': 'weeks',
            'unitPattern-count-one': '{0} wk',
            'unitPattern-count-other': '{0} wks',
            'perUnitPattern': '{0}/w'
          },
          'duration-day': {
            'displayName': 'days',
            'unitPattern-count-one': '{0} day',
            'unitPattern-count-other': '{0} days',
            'perUnitPattern': '{0}/d'
          },
          'duration-hour': {
            'displayName': 'hours',
            'unitPattern-count-one': '{0} hr',
            'unitPattern-count-other': '{0} hr',
            'perUnitPattern': '{0}/h'
          },
          'duration-minute': {
            'displayName': 'mins',
            'unitPattern-count-one': '{0} min',
            'unitPattern-count-other': '{0} min',
            'perUnitPattern': '{0}/min'
          },
          'duration-second': {
            'displayName': 'secs',
            'unitPattern-count-one': '{0} sec',
            'unitPattern-count-other': '{0} sec',
            'perUnitPattern': '{0}/s'
          },
          'duration-millisecond': {
            'displayName': 'millisecs',
            'unitPattern-count-one': '{0} ms',
            'unitPattern-count-other': '{0} ms'
          },
          'duration-microsecond': {
            'displayName': 'μsecs',
            'unitPattern-count-one': '{0} μs',
            'unitPattern-count-other': '{0} μs'
          },
          'duration-nanosecond': {
            'displayName': 'nanosecs',
            'unitPattern-count-one': '{0} ns',
            'unitPattern-count-other': '{0} ns'
          },
          'electric-ampere': {
            'displayName': 'amps',
            'unitPattern-count-one': '{0} A',
            'unitPattern-count-other': '{0} A'
          },
          'electric-milliampere': {
            'displayName': 'milliamps',
            'unitPattern-count-one': '{0} mA',
            'unitPattern-count-other': '{0} mA'
          },
          'electric-ohm': {
            'displayName': 'ohms',
            'unitPattern-count-one': '{0} Ω',
            'unitPattern-count-other': '{0} Ω'
          },
          'electric-volt': {
            'displayName': 'volts',
            'unitPattern-count-one': '{0} V',
            'unitPattern-count-other': '{0} V'
          },
          'energy-kilocalorie': {
            'displayName': 'kcal',
            'unitPattern-count-one': '{0} kcal',
            'unitPattern-count-other': '{0} kcal'
          },
          'energy-calorie': {
            'displayName': 'cal',
            'unitPattern-count-one': '{0} cal',
            'unitPattern-count-other': '{0} cal'
          },
          'energy-foodcalorie': {
            'displayName': 'Cal',
            'unitPattern-count-one': '{0} Cal',
            'unitPattern-count-other': '{0} Cal'
          },
          'energy-kilojoule': {
            'displayName': 'kilojoule',
            'unitPattern-count-one': '{0} kJ',
            'unitPattern-count-other': '{0} kJ'
          },
          'energy-joule': {
            'displayName': 'joules',
            'unitPattern-count-one': '{0} J',
            'unitPattern-count-other': '{0} J'
          },
          'energy-kilowatt-hour': {
            'displayName': 'kW-hour',
            'unitPattern-count-one': '{0} kWh',
            'unitPattern-count-other': '{0} kWh'
          },
          'frequency-gigahertz': {
            'displayName': 'GHz',
            'unitPattern-count-one': '{0} GHz',
            'unitPattern-count-other': '{0} GHz'
          },
          'frequency-megahertz': {
            'displayName': 'MHz',
            'unitPattern-count-one': '{0} MHz',
            'unitPattern-count-other': '{0} MHz'
          },
          'frequency-kilohertz': {
            'displayName': 'kHz',
            'unitPattern-count-one': '{0} kHz',
            'unitPattern-count-other': '{0} kHz'
          },
          'frequency-hertz': {
            'displayName': 'Hz',
            'unitPattern-count-one': '{0} Hz',
            'unitPattern-count-other': '{0} Hz'
          },
          'length-kilometer': {
            'displayName': 'km',
            'unitPattern-count-one': '{0} km',
            'unitPattern-count-other': '{0} km',
            'perUnitPattern': '{0}/km'
          },
          'length-meter': {
            'displayName': 'm',
            'unitPattern-count-one': '{0} m',
            'unitPattern-count-other': '{0} m',
            'perUnitPattern': '{0}/m'
          },
          'length-decimeter': {
            'displayName': 'dm',
            'unitPattern-count-one': '{0} dm',
            'unitPattern-count-other': '{0} dm'
          },
          'length-centimeter': {
            'displayName': 'cm',
            'unitPattern-count-one': '{0} cm',
            'unitPattern-count-other': '{0} cm',
            'perUnitPattern': '{0}/cm'
          },
          'length-millimeter': {
            'displayName': 'mm',
            'unitPattern-count-one': '{0} mm',
            'unitPattern-count-other': '{0} mm'
          },
          'length-micrometer': {
            'displayName': 'µmeters',
            'unitPattern-count-one': '{0} µm',
            'unitPattern-count-other': '{0} µm'
          },
          'length-nanometer': {
            'displayName': 'nm',
            'unitPattern-count-one': '{0} nm',
            'unitPattern-count-other': '{0} nm'
          },
          'length-picometer': {
            'displayName': 'pm',
            'unitPattern-count-one': '{0} pm',
            'unitPattern-count-other': '{0} pm'
          },
          'length-mile': {
            'displayName': 'miles',
            'unitPattern-count-one': '{0} mi',
            'unitPattern-count-other': '{0} mi'
          },
          'length-yard': {
            'displayName': 'yards',
            'unitPattern-count-one': '{0} yd',
            'unitPattern-count-other': '{0} yd'
          },
          'length-foot': {
            'displayName': 'feet',
            'unitPattern-count-one': '{0} ft',
            'unitPattern-count-other': '{0} ft',
            'perUnitPattern': '{0}/ft'
          },
          'length-inch': {
            'displayName': 'inches',
            'unitPattern-count-one': '{0} in',
            'unitPattern-count-other': '{0} in',
            'perUnitPattern': '{0}/in'
          },
          'length-parsec': {
            'displayName': 'parsecs',
            'unitPattern-count-one': '{0} pc',
            'unitPattern-count-other': '{0} pc'
          },
          'length-light-year': {
            'displayName': 'light yrs',
            'unitPattern-count-one': '{0} ly',
            'unitPattern-count-other': '{0} ly'
          },
          'length-astronomical-unit': {
            'displayName': 'au',
            'unitPattern-count-one': '{0} au',
            'unitPattern-count-other': '{0} au'
          },
          'length-furlong': {
            'displayName': 'furlongs',
            'unitPattern-count-one': '{0} fur',
            'unitPattern-count-other': '{0} fur'
          },
          'length-fathom': {
            'displayName': 'fathoms',
            'unitPattern-count-one': '{0} ftm',
            'unitPattern-count-other': '{0} ftm'
          },
          'length-nautical-mile': {
            'displayName': 'nmi',
            'unitPattern-count-one': '{0} nmi',
            'unitPattern-count-other': '{0} nmi'
          },
          'length-mile-scandinavian': {
            'displayName': 'smi',
            'unitPattern-count-one': '{0} smi',
            'unitPattern-count-other': '{0} smi'
          },
          'length-point': {
            'displayName': 'points',
            'unitPattern-count-one': '{0} pt',
            'unitPattern-count-other': '{0} pt'
          },
          'light-lux': {
            'displayName': 'lux',
            'unitPattern-count-one': '{0} lx',
            'unitPattern-count-other': '{0} lx'
          },
          'mass-metric-ton': {
            'displayName': 't',
            'unitPattern-count-one': '{0} t',
            'unitPattern-count-other': '{0} t'
          },
          'mass-kilogram': {
            'displayName': 'kg',
            'unitPattern-count-one': '{0} kg',
            'unitPattern-count-other': '{0} kg',
            'perUnitPattern': '{0}/kg'
          },
          'mass-gram': {
            'displayName': 'grams',
            'unitPattern-count-one': '{0} g',
            'unitPattern-count-other': '{0} g',
            'perUnitPattern': '{0}/g'
          },
          'mass-milligram': {
            'displayName': 'mg',
            'unitPattern-count-one': '{0} mg',
            'unitPattern-count-other': '{0} mg'
          },
          'mass-microgram': {
            'displayName': 'µg',
            'unitPattern-count-one': '{0} µg',
            'unitPattern-count-other': '{0} µg'
          },
          'mass-ton': {
            'displayName': 'tons',
            'unitPattern-count-one': '{0} tn',
            'unitPattern-count-other': '{0} tn'
          },
          'mass-stone': {
            'displayName': 'stones',
            'unitPattern-count-one': '{0} st',
            'unitPattern-count-other': '{0} st'
          },
          'mass-pound': {
            'displayName': 'pounds',
            'unitPattern-count-one': '{0} lb',
            'unitPattern-count-other': '{0} lb',
            'perUnitPattern': '{0}/lb'
          },
          'mass-ounce': {
            'displayName': 'oz',
            'unitPattern-count-one': '{0} oz',
            'unitPattern-count-other': '{0} oz',
            'perUnitPattern': '{0}/oz'
          },
          'mass-ounce-troy': {
            'displayName': 'oz troy',
            'unitPattern-count-one': '{0} oz t',
            'unitPattern-count-other': '{0} oz t'
          },
          'mass-carat': {
            'displayName': 'carats',
            'unitPattern-count-one': '{0} CD',
            'unitPattern-count-other': '{0} CD'
          },
          'power-gigawatt': {
            'displayName': 'GW',
            'unitPattern-count-one': '{0} GW',
            'unitPattern-count-other': '{0} GW'
          },
          'power-megawatt': {
            'displayName': 'MW',
            'unitPattern-count-one': '{0} MW',
            'unitPattern-count-other': '{0} MW'
          },
          'power-kilowatt': {
            'displayName': 'kW',
            'unitPattern-count-one': '{0} kW',
            'unitPattern-count-other': '{0} kW'
          },
          'power-watt': {
            'displayName': 'watts',
            'unitPattern-count-one': '{0} W',
            'unitPattern-count-other': '{0} W'
          },
          'power-milliwatt': {
            'displayName': 'mW',
            'unitPattern-count-one': '{0} mW',
            'unitPattern-count-other': '{0} mW'
          },
          'power-horsepower': {
            'displayName': 'hp',
            'unitPattern-count-one': '{0} hp',
            'unitPattern-count-other': '{0} hp'
          },
          'pressure-hectopascal': {
            'displayName': 'hPa',
            'unitPattern-count-one': '{0} hPa',
            'unitPattern-count-other': '{0} hPa'
          },
          'pressure-millimeter-of-mercury': {
            'displayName': 'mmHg',
            'unitPattern-count-one': '{0} mmHg',
            'unitPattern-count-other': '{0} mmHg'
          },
          'pressure-pound-per-square-inch': {
            'displayName': 'psi',
            'unitPattern-count-one': '{0} psi',
            'unitPattern-count-other': '{0} psi'
          },
          'pressure-inch-hg': {
            'displayName': 'inHg',
            'unitPattern-count-one': '{0} inHg',
            'unitPattern-count-other': '{0} inHg'
          },
          'pressure-millibar': {
            'displayName': 'mbar',
            'unitPattern-count-one': '{0} mbar',
            'unitPattern-count-other': '{0} mbar'
          },
          'speed-kilometer-per-hour': {
            'displayName': 'km/hour',
            'unitPattern-count-one': '{0} kph',
            'unitPattern-count-other': '{0} kph'
          },
          'speed-meter-per-second': {
            'displayName': 'meters/sec',
            'unitPattern-count-one': '{0} m/s',
            'unitPattern-count-other': '{0} m/s'
          },
          'speed-mile-per-hour': {
            'displayName': 'miles/hour',
            'unitPattern-count-one': '{0} mph',
            'unitPattern-count-other': '{0} mph'
          },
          'speed-knot': {
            'displayName': 'kn',
            'unitPattern-count-one': '{0} kn',
            'unitPattern-count-other': '{0} kn'
          },
          'temperature-generic': {
            'displayName': '\xB0',
            'unitPattern-count-other': '{0}\xB0'
          },
          'temperature-celsius': {
            'displayName': 'deg. C',
            'unitPattern-count-one': '{0}\xB0C',
            'unitPattern-count-other': '{0}\xB0C'
          },
          'temperature-fahrenheit': {
            'displayName': 'deg. F',
            'unitPattern-count-one': '{0}\xB0F',
            'unitPattern-count-other': '{0}\xB0F'
          },
          'temperature-kelvin': {
            'displayName': 'K',
            'unitPattern-count-one': '{0} K',
            'unitPattern-count-other': '{0} K'
          },
          'volume-cubic-kilometer': {
            'displayName': 'km\xB3',
            'unitPattern-count-one': '{0} km\xB3',
            'unitPattern-count-other': '{0} km\xB3'
          },
          'volume-cubic-meter': {
            'displayName': 'm\xB3',
            'unitPattern-count-one': '{0} m\xB3',
            'unitPattern-count-other': '{0} m\xB3',
            'perUnitPattern': '{0}/m\xB3'
          },
          'volume-cubic-centimeter': {
            'displayName': 'cm\xB3',
            'unitPattern-count-one': '{0} cm\xB3',
            'unitPattern-count-other': '{0} cm\xB3',
            'perUnitPattern': '{0}/cm\xB3'
          },
          'volume-cubic-mile': {
            'displayName': 'mi\xB3',
            'unitPattern-count-one': '{0} mi\xB3',
            'unitPattern-count-other': '{0} mi\xB3'
          },
          'volume-cubic-yard': {
            'displayName': 'yards\xB3',
            'unitPattern-count-one': '{0} yd\xB3',
            'unitPattern-count-other': '{0} yd\xB3'
          },
          'volume-cubic-foot': {
            'displayName': 'feet\xB3',
            'unitPattern-count-one': '{0} ft\xB3',
            'unitPattern-count-other': '{0} ft\xB3'
          },
          'volume-cubic-inch': {
            'displayName': 'inches\xB3',
            'unitPattern-count-one': '{0} in\xB3',
            'unitPattern-count-other': '{0} in\xB3'
          },
          'volume-megaliter': {
            'displayName': 'ML',
            'unitPattern-count-one': '{0} ML',
            'unitPattern-count-other': '{0} ML'
          },
          'volume-hectoliter': {
            'displayName': 'hL',
            'unitPattern-count-one': '{0} hL',
            'unitPattern-count-other': '{0} hL'
          },
          'volume-liter': {
            'displayName': 'liters',
            'unitPattern-count-one': '{0} L',
            'unitPattern-count-other': '{0} L',
            'perUnitPattern': '{0}/L'
          },
          'volume-deciliter': {
            'displayName': 'dL',
            'unitPattern-count-one': '{0} dL',
            'unitPattern-count-other': '{0} dL'
          },
          'volume-centiliter': {
            'displayName': 'cL',
            'unitPattern-count-one': '{0} cL',
            'unitPattern-count-other': '{0} cL'
          },
          'volume-milliliter': {
            'displayName': 'mL',
            'unitPattern-count-one': '{0} mL',
            'unitPattern-count-other': '{0} mL'
          },
          'volume-pint-metric': {
            'displayName': 'mpt',
            'unitPattern-count-one': '{0} mpt',
            'unitPattern-count-other': '{0} mpt'
          },
          'volume-cup-metric': {
            'displayName': 'mcup',
            'unitPattern-count-one': '{0} mc',
            'unitPattern-count-other': '{0} mc'
          },
          'volume-acre-foot': {
            'displayName': 'acre ft',
            'unitPattern-count-one': '{0} ac ft',
            'unitPattern-count-other': '{0} ac ft'
          },
          'volume-bushel': {
            'displayName': 'bushels',
            'unitPattern-count-one': '{0} bu',
            'unitPattern-count-other': '{0} bu'
          },
          'volume-gallon': {
            'displayName': 'gal',
            'unitPattern-count-one': '{0} gal',
            'unitPattern-count-other': '{0} gal',
            'perUnitPattern': '{0}/gal US'
          },
          'volume-gallon-imperial': {
            'displayName': 'Imp. gal',
            'unitPattern-count-one': '{0} gal Imp.',
            'unitPattern-count-other': '{0} gal Imp.',
            'perUnitPattern': '{0}/gal Imp.'
          },
          'volume-quart': {
            'displayName': 'qts',
            'unitPattern-count-one': '{0} qt',
            'unitPattern-count-other': '{0} qt'
          },
          'volume-pint': {
            'displayName': 'pints',
            'unitPattern-count-one': '{0} pt',
            'unitPattern-count-other': '{0} pt'
          },
          'volume-cup': {
            'displayName': 'cups',
            'unitPattern-count-one': '{0} c',
            'unitPattern-count-other': '{0} c'
          },
          'volume-fluid-ounce': {
            'displayName': 'fl oz',
            'unitPattern-count-one': '{0} fl oz',
            'unitPattern-count-other': '{0} fl oz'
          },
          'volume-tablespoon': {
            'displayName': 'tbsp',
            'unitPattern-count-one': '{0} tbsp',
            'unitPattern-count-other': '{0} tbsp'
          },
          'volume-teaspoon': {
            'displayName': 'tsp',
            'unitPattern-count-one': '{0} tsp',
            'unitPattern-count-other': '{0} tsp'
          },
          'coordinateUnit': {
            'east': '{0} E',
            'north': '{0} N',
            'south': '{0} S',
            'west': '{0} W'
          }
        }
      }
    };
    var M_ISO639_OLD_TO_NEW$2 = {
      'iw': 'he',
      'ji': 'yi',
      'in': 'id',
      'sh': 'sr'
    };

    var M_SUPPORTED_LOCALES = function () {
      var LOCALES = Locale$1._cldrLocales,
          result = {},
          i;

      if (LOCALES) {
        for (i = 0; i < LOCALES.length; i++) {
          result[LOCALES[i]] = true;
        }
      }

      return result;
    }();

    var mLocaleDatas = {};

    function getCLDRCalendarName(sCalendarType) {
      if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
      }

      return 'ca-' + sCalendarType.toLowerCase();
    }

    function getData(oLocale) {
      var sLanguage = oLocale.getLanguage() || '',
          sScript = oLocale.getScript() || '',
          sRegion = oLocale.getRegion() || '',
          mData;

      function merge(obj, fallbackObj) {
        var name, value, fallbackValue;

        if (!fallbackObj) {
          return;
        }

        for (name in fallbackObj) {
          if (fallbackObj.hasOwnProperty(name)) {
            value = obj[name];
            fallbackValue = fallbackObj[name];

            if (value === undefined) {
              obj[name] = fallbackValue;
            } else if (value === null) {
              delete obj[name];
            } else if (_typeof(value) === 'object' && _typeof(fallbackValue) === 'object') {
              merge(value, fallbackValue);
            }
          }
        }
      }

      function getOrLoad(sId) {
        if (!mLocaleDatas[sId] && (!M_SUPPORTED_LOCALES || M_SUPPORTED_LOCALES[sId] === true)) {
          var data = mLocaleDatas[sId] = LoaderExtensions.loadResource('sap/ui/core/cldr/' + sId + '.json', {
            dataType: 'json',
            failOnError: false
          });

          if (data && data.__fallbackLocale) {
            merge(data, getOrLoad(data.__fallbackLocale));
            delete data.__fallbackLocale;
          }
        }

        return mLocaleDatas[sId];
      }

      sLanguage = sLanguage && M_ISO639_OLD_TO_NEW$2[sLanguage] || sLanguage;

      if (sLanguage === 'no') {
        sLanguage = 'nb';
      }

      if (sLanguage === 'zh' && !sRegion) {
        if (sScript === 'Hans') {
          sRegion = 'CN';
        } else if (sScript === 'Hant') {
          sRegion = 'TW';
        }
      }

      var sId = sLanguage + '_' + sRegion;

      if (sLanguage && sRegion) {
        mData = getOrLoad(sId);
      }

      if (!mData && sLanguage) {
        mData = getOrLoad(sLanguage);
      }

      mLocaleDatas[sId] = mData || M_DEFAULT_DATA;
      return mLocaleDatas[sId];
    }

    var CustomLocaleData = LocaleData.extend('sap.ui.core.CustomLocaleData', {
      constructor: function constructor(oLocale) {
        LocaleData.apply(this, arguments);
        this.mCustomData = Core.getConfiguration().getFormatSettings().getCustomLocaleData();
      },
      _get: function _get() {
        var aArguments = Array.prototype.slice.call(arguments),
            sCalendar,
            sKey;

        if (aArguments[0].indexOf('ca-') == 0) {
          sCalendar = aArguments[0];

          if (sCalendar == getCLDRCalendarName()) {
            aArguments = aArguments.slice(1);
          }
        }

        sKey = aArguments.join('-');
        var vValue = this.mCustomData[sKey];

        if (vValue == null) {
          vValue = this._getDeep(this.mCustomData, arguments);

          if (vValue == null) {
            vValue = this._getDeep(this.mData, arguments);
          }
        }

        return vValue;
      },
      _getMerged: function _getMerged() {
        var mData = this._getDeep(this.mData, arguments);

        var mCustomData = this._getDeep(this.mCustomData, arguments);

        return fnExtend({}, mData, mCustomData);
      }
    });

    LocaleData.getInstance = function (oLocale) {
      return oLocale.hasPrivateUseSubtag('sapufmt') ? new CustomLocaleData(oLocale) : new LocaleData(oLocale);
    };

    var mRegistry = new Map();
    var _Calendars = {
      get: function get(sCalendarType) {
        if (!mRegistry.has(sCalendarType)) {
          throw new Error("Required calendar type: " + sCalendarType + " not loaded.");
        }

        return mRegistry.get(sCalendarType);
      },
      set: function set(sCalendarType, CalendarClass) {
        mRegistry.set(sCalendarType, CalendarClass);
      }
    };

    var UniversalDate = BaseObject$1.extend('sap.ui.core.date.UniversalDate', {
      constructor: function constructor() {
        var clDate = UniversalDate.getClass();
        return this.createDate(clDate, arguments);
      }
    });

    UniversalDate.UTC = function () {
      var clDate = UniversalDate.getClass();
      return clDate.UTC.apply(clDate, arguments);
    };

    UniversalDate.now = function () {
      return Date.now();
    };

    UniversalDate.prototype.createDate = function (clDate, aArgs) {
      switch (aArgs.length) {
        case 0:
          return new clDate();

        case 1:
          return new clDate(aArgs[0]);

        case 2:
          return new clDate(aArgs[0], aArgs[1]);

        case 3:
          return new clDate(aArgs[0], aArgs[1], aArgs[2]);

        case 4:
          return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3]);

        case 5:
          return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4]);

        case 6:
          return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5]);

        case 7:
          return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5], aArgs[6]);
      }
    };

    UniversalDate.getInstance = function (oDate, sCalendarType) {
      var clDate, oInstance;

      if (oDate instanceof UniversalDate) {
        oDate = oDate.getJSDate();
      }

      if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
      }

      clDate = UniversalDate.getClass(sCalendarType);
      oInstance = Object.create(clDate.prototype);
      oInstance.oDate = oDate;
      oInstance.sCalendarType = sCalendarType;
      return oInstance;
    };

    UniversalDate.getClass = function (sCalendarType) {
      if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
      }

      return _Calendars.get(sCalendarType);
    };

    ['getDate', 'getMonth', 'getFullYear', 'getYear', 'getDay', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds', 'getUTCDate', 'getUTCMonth', 'getUTCFullYear', 'getUTCDay', 'getUTCHours', 'getUTCMinutes', 'getUTCSeconds', 'getUTCMilliseconds', 'getTime', 'valueOf', 'getTimezoneOffset', 'toString', 'toDateString', 'setDate', 'setFullYear', 'setYear', 'setMonth', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds', 'setUTCDate', 'setUTCFullYear', 'setUTCMonth', 'setUTCHours', 'setUTCMinutes', 'setUTCSeconds', 'setUTCMilliseconds'].forEach(function (sName) {
      UniversalDate.prototype[sName] = function () {
        return this.oDate[sName].apply(this.oDate, arguments);
      };
    });

    UniversalDate.prototype.getJSDate = function () {
      return this.oDate;
    };

    UniversalDate.prototype.getCalendarType = function () {
      return this.sCalendarType;
    };

    UniversalDate.prototype.getEra = function () {
      return UniversalDate.getEraByDate(this.sCalendarType, this.oDate.getFullYear(), this.oDate.getMonth(), this.oDate.getDate());
    };

    UniversalDate.prototype.setEra = function (iEra) {};

    UniversalDate.prototype.getUTCEra = function () {
      return UniversalDate.getEraByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.oDate.getUTCMonth(), this.oDate.getUTCDate());
    };

    UniversalDate.prototype.setUTCEra = function (iEra) {};

    UniversalDate.prototype.getWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.getFullYear(), this.getMonth(), this.getDate());
    };

    UniversalDate.prototype.setWeek = function (oWeek) {
      var oDate = UniversalDate.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week);
      this.setFullYear(oDate.year, oDate.month, oDate.day);
    };

    UniversalDate.prototype.getUTCWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
    };

    UniversalDate.prototype.setUTCWeek = function (oWeek) {
      var oDate = UniversalDate.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week);
      this.setUTCFullYear(oDate.year, oDate.month, oDate.day);
    };

    UniversalDate.prototype.getQuarter = function () {
      return Math.floor(this.getMonth() / 3);
    };

    UniversalDate.prototype.getUTCQuarter = function () {
      return Math.floor(this.getUTCMonth() / 3);
    };

    UniversalDate.prototype.getDayPeriod = function () {
      if (this.getHours() < 12) {
        return 0;
      } else {
        return 1;
      }
    };

    UniversalDate.prototype.getUTCDayPeriod = function () {
      if (this.getUTCHours() < 12) {
        return 0;
      } else {
        return 1;
      }
    };

    UniversalDate.prototype.getTimezoneShort = function () {
      if (this.oDate.getTimezoneShort) {
        return this.oDate.getTimezoneShort();
      }
    };

    UniversalDate.prototype.getTimezoneLong = function () {
      if (this.oDate.getTimezoneLong) {
        return this.oDate.getTimezoneLong();
      }
    };

    var iMillisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

    UniversalDate.getWeekByDate = function (sCalendarType, iYear, iMonth, iDay) {
      var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(),
          clDate = this.getClass(sCalendarType),
          oFirstDay = getFirstDayOfFirstWeek(clDate, iYear),
          oDate = new clDate(clDate.UTC(iYear, iMonth, iDay)),
          iWeek,
          iLastYear,
          iNextYear,
          oLastFirstDay,
          oNextFirstDay;

      if (oLocale.getRegion() === 'US') {
        iWeek = calculateWeeks(oFirstDay, oDate);
      } else {
        iLastYear = iYear - 1;
        iNextYear = iYear + 1;
        oLastFirstDay = getFirstDayOfFirstWeek(clDate, iLastYear);
        oNextFirstDay = getFirstDayOfFirstWeek(clDate, iNextYear);

        if (oDate >= oNextFirstDay) {
          iYear = iNextYear;
          iWeek = 0;
        } else if (oDate < oFirstDay) {
          iYear = iLastYear;
          iWeek = calculateWeeks(oLastFirstDay, oDate);
        } else {
          iWeek = calculateWeeks(oFirstDay, oDate);
        }
      }

      return {
        year: iYear,
        week: iWeek
      };
    };

    UniversalDate.getFirstDateOfWeek = function (sCalendarType, iYear, iWeek) {
      var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(),
          clDate = this.getClass(sCalendarType),
          oFirstDay = getFirstDayOfFirstWeek(clDate, iYear),
          oDate = new clDate(oFirstDay.valueOf() + iWeek * iMillisecondsInWeek);

      if (oLocale.getRegion() === 'US' && iWeek === 0 && oFirstDay.getUTCFullYear() < iYear) {
        return {
          year: iYear,
          month: 0,
          day: 1
        };
      }

      return {
        year: oDate.getUTCFullYear(),
        month: oDate.getUTCMonth(),
        day: oDate.getUTCDate()
      };
    };

    function getFirstDayOfFirstWeek(clDate, iYear) {
      var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(),
          oLocaleData = LocaleData.getInstance(oLocale),
          iMinDays = oLocaleData.getMinimalDaysInFirstWeek(),
          iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek(),
          oFirstDay = new clDate(clDate.UTC(iYear, 0, 1)),
          iDayCount = 7;

      while (oFirstDay.getUTCDay() !== iFirstDayOfWeek) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() - 1);
        iDayCount--;
      }

      if (iDayCount < iMinDays) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() + 7);
      }

      return oFirstDay;
    }

    function calculateWeeks(oFromDate, oToDate) {
      return Math.floor((oToDate.valueOf() - oFromDate.valueOf()) / iMillisecondsInWeek);
    }

    var mEras = {};

    UniversalDate.getEraByDate = function (sCalendarType, iYear, iMonth, iDay) {
      var aEras = getEras(sCalendarType),
          iTimestamp = new Date(0).setUTCFullYear(iYear, iMonth, iDay),
          oEra;

      for (var i = aEras.length - 1; i >= 0; i--) {
        oEra = aEras[i];

        if (!oEra) {
          continue;
        }

        if (oEra._start && iTimestamp >= oEra._startInfo.timestamp) {
          return i;
        }

        if (oEra._end && iTimestamp < oEra._endInfo.timestamp) {
          return i;
        }
      }
    };

    UniversalDate.getCurrentEra = function (sCalendarType) {
      var oNow = new Date();
      return this.getEraByDate(sCalendarType, oNow.getFullYear(), oNow.getMonth(), oNow.getDate());
    };

    UniversalDate.getEraStartDate = function (sCalendarType, iEra) {
      var aEras = getEras(sCalendarType),
          oEra = aEras[iEra] || aEras[0];

      if (oEra._start) {
        return oEra._startInfo;
      }
    };

    function getEras(sCalendarType) {
      var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(),
          oLocaleData = LocaleData.getInstance(oLocale),
          aEras = mEras[sCalendarType];

      if (!aEras) {
        var aEras = oLocaleData.getEraDates(sCalendarType);

        if (!aEras[0]) {
          aEras[0] = {
            _start: '1-1-1'
          };
        }

        for (var i = 0; i < aEras.length; i++) {
          var oEra = aEras[i];

          if (!oEra) {
            continue;
          }

          if (oEra._start) {
            oEra._startInfo = parseDateString(oEra._start);
          }

          if (oEra._end) {
            oEra._endInfo = parseDateString(oEra._end);
          }
        }

        mEras[sCalendarType] = aEras;
      }

      return aEras;
    }

    function parseDateString(sDateString) {
      var aParts = sDateString.split('-'),
          iYear,
          iMonth,
          iDay;

      if (aParts[0] == '') {
        iYear = -parseInt(aParts[1]);
        iMonth = parseInt(aParts[2]) - 1;
        iDay = parseInt(aParts[3]);
      } else {
        iYear = parseInt(aParts[0]);
        iMonth = parseInt(aParts[1]) - 1;
        iDay = parseInt(aParts[2]);
      }

      return {
        timestamp: new Date(0).setUTCFullYear(iYear, iMonth, iDay),
        year: iYear,
        month: iMonth,
        day: iDay
      };
    }

    var Buddhist = UniversalDate.extend('sap.ui.core.date.Buddhist', {
      constructor: function constructor() {
        var aArgs = arguments;

        if (aArgs.length > 1) {
          aArgs = toGregorianArguments(aArgs);
        }

        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType$1.Buddhist;
      }
    });

    Buddhist.UTC = function () {
      var aArgs = toGregorianArguments(arguments);
      return Date.UTC.apply(Date, aArgs);
    };

    Buddhist.now = function () {
      return Date.now();
    };

    function toBuddhist(oGregorian) {
      var iEraStartYear = UniversalDate.getEraStartDate(CalendarType$1.Buddhist, 0).year,
          iYear = oGregorian.year - iEraStartYear + 1;

      if (oGregorian.year < 1941 && oGregorian.month < 3) {
        iYear -= 1;
      }

      if (oGregorian.year === null) {
        iYear = undefined;
      }

      return {
        year: iYear,
        month: oGregorian.month,
        day: oGregorian.day
      };
    }

    function toGregorian(oBuddhist) {
      var iEraStartYear = UniversalDate.getEraStartDate(CalendarType$1.Buddhist, 0).year,
          iYear = oBuddhist.year + iEraStartYear - 1;

      if (iYear < 1941 && oBuddhist.month < 3) {
        iYear += 1;
      }

      if (oBuddhist.year === null) {
        iYear = undefined;
      }

      return {
        year: iYear,
        month: oBuddhist.month,
        day: oBuddhist.day
      };
    }

    function toGregorianArguments(aArgs) {
      var oBuddhist, oGregorian;
      oBuddhist = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
      };
      oGregorian = toGregorian(oBuddhist);
      aArgs[0] = oGregorian.year;
      return aArgs;
    }

    Buddhist.prototype._getBuddhist = function () {
      var oGregorian = {
        year: this.oDate.getFullYear(),
        month: this.oDate.getMonth(),
        day: this.oDate.getDate()
      };
      return toBuddhist(oGregorian);
    };

    Buddhist.prototype._setBuddhist = function (oBuddhist) {
      var oGregorian = toGregorian(oBuddhist);
      return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Buddhist.prototype._getUTCBuddhist = function () {
      var oGregorian = {
        year: this.oDate.getUTCFullYear(),
        month: this.oDate.getUTCMonth(),
        day: this.oDate.getUTCDate()
      };
      return toBuddhist(oGregorian);
    };

    Buddhist.prototype._setUTCBuddhist = function (oBuddhist) {
      var oGregorian = toGregorian(oBuddhist);
      return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Buddhist.prototype.getYear = function () {
      return this._getBuddhist().year;
    };

    Buddhist.prototype.getFullYear = function () {
      return this._getBuddhist().year;
    };

    Buddhist.prototype.getUTCFullYear = function () {
      return this._getUTCBuddhist().year;
    };

    Buddhist.prototype.setYear = function (iYear) {
      var oBuddhist = this._getBuddhist();

      oBuddhist.year = iYear;
      return this._setBuddhist(oBuddhist);
    };

    Buddhist.prototype.setFullYear = function (iYear, iMonth, iDay) {
      var oBuddhist = this._getBuddhist();

      oBuddhist.year = iYear;

      if (iMonth !== undefined) {
        oBuddhist.month = iMonth;
      }

      if (iDay !== undefined) {
        oBuddhist.day = iDay;
      }

      return this._setBuddhist(oBuddhist);
    };

    Buddhist.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
      var oBuddhist = this._getUTCBuddhist();

      oBuddhist.year = iYear;

      if (iMonth !== undefined) {
        oBuddhist.month = iMonth;
      }

      if (iDay !== undefined) {
        oBuddhist.day = iDay;
      }

      return this._setUTCBuddhist(oBuddhist);
    };

    Buddhist.prototype.getWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getFullYear(), this.getMonth(), this.getDate());
    };

    Buddhist.prototype.getUTCWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
    };

    _Calendars.set(CalendarType$1.Buddhist, Buddhist);

    var Islamic = UniversalDate.extend('sap.ui.core.date.Islamic', {
      constructor: function constructor() {
        var aArgs = arguments;

        if (aArgs.length > 1) {
          aArgs = toGregorianArguments$1(aArgs);
        }

        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType$1.Islamic;
      }
    });

    Islamic.UTC = function () {
      var aArgs = toGregorianArguments$1(arguments);
      return Date.UTC.apply(Date, aArgs);
    };

    Islamic.now = function () {
      return Date.now();
    };

    var BASE_YEAR = 1400,
        GREGORIAN_EPOCH_DAYS = 1721425.5,
        ISLAMIC_EPOCH_DAYS = 1948439.5,
        ISLAMIC_MILLIS = -42521587200000,
        ONE_DAY = 86400000;
    var oCustomizationMap = null;
    var aSupportedIslamicCalendarTypes = ['A', 'B'];

    function toIslamic(oGregorian) {
      var iGregorianYear = oGregorian.year,
          iGregorianMonth = oGregorian.month,
          iGregorianDay = oGregorian.day,
          iIslamicYear,
          iIslamicMonth,
          iIslamicDay,
          iMonths,
          iDays,
          iLeapAdj,
          iJulianDay;
      iLeapAdj = 0;

      if (iGregorianMonth + 1 > 2) {
        iLeapAdj = isGregorianLeapYear(iGregorianYear) ? -1 : -2;
      }

      iJulianDay = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iGregorianYear - 1) + Math.floor((iGregorianYear - 1) / 4) + -Math.floor((iGregorianYear - 1) / 100) + Math.floor((iGregorianYear - 1) / 400) + Math.floor((367 * (iGregorianMonth + 1) - 362) / 12 + iLeapAdj + iGregorianDay);
      iJulianDay = Math.floor(iJulianDay) + 0.5;
      iDays = iJulianDay - ISLAMIC_EPOCH_DAYS;
      iMonths = Math.floor(iDays / 29.530588853);

      if (iMonths < 0) {
        iIslamicYear = Math.floor(iMonths / 12) + 1;
        iIslamicMonth = iMonths % 12;

        if (iIslamicMonth < 0) {
          iIslamicMonth += 12;
        }

        iIslamicDay = iDays - monthStart(iIslamicYear, iIslamicMonth) + 1;
      } else {
        iMonths++;

        while (getCustomMonthStartDays(iMonths) > iDays) {
          iMonths--;
        }

        iIslamicYear = Math.floor(iMonths / 12) + 1;
        iIslamicMonth = iMonths % 12;
        iIslamicDay = iDays - getCustomMonthStartDays(12 * (iIslamicYear - 1) + iIslamicMonth) + 1;
      }

      return {
        day: iIslamicDay,
        month: iIslamicMonth,
        year: iIslamicYear
      };
    }

    function toGregorian$1(oIslamic) {
      var iIslamicYear = oIslamic.year,
          iIslamicMonth = oIslamic.month,
          iIslamicDate = oIslamic.day,
          iMonthStart = iIslamicYear < 1 ? monthStart(iIslamicYear, iIslamicMonth) : getCustomMonthStartDays(12 * (iIslamicYear - 1) + iIslamicMonth),
          iJulianDay = iIslamicDate + iMonthStart + ISLAMIC_EPOCH_DAYS - 1,
          iJulianDayNoon = Math.floor(iJulianDay - 0.5) + 0.5,
          iDaysSinceGregorianEpoch = iJulianDayNoon - GREGORIAN_EPOCH_DAYS,
          iQuadricent = Math.floor(iDaysSinceGregorianEpoch / 146097),
          iQuadricentNormalized = mod(iDaysSinceGregorianEpoch, 146097),
          iCent = Math.floor(iQuadricentNormalized / 36524),
          iCentNormalized = mod(iQuadricentNormalized, 36524),
          iQuad = Math.floor(iCentNormalized / 1461),
          iQuadNormalized = mod(iCentNormalized, 1461),
          iYearIndex = Math.floor(iQuadNormalized / 365),
          iYear = iQuadricent * 400 + iCent * 100 + iQuad * 4 + iYearIndex,
          iMonth,
          iDay,
          iGregorianYearStartDays,
          iDayOfYear,
          tjd,
          tjd2,
          iLeapAdj,
          iLeapAdj2;

      if (!(iCent == 4 || iYearIndex == 4)) {
        iYear++;
      }

      iGregorianYearStartDays = GREGORIAN_EPOCH_DAYS + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400);
      iDayOfYear = iJulianDayNoon - iGregorianYearStartDays;
      tjd = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(iYear) ? -1 : -2) + 1);
      iLeapAdj = 0;

      if (iJulianDayNoon < tjd) {
        iLeapAdj = 0;
      } else {
        iLeapAdj = isGregorianLeapYear(iYear) ? 1 : 2;
      }

      iMonth = Math.floor(((iDayOfYear + iLeapAdj) * 12 + 373) / 367);
      tjd2 = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400);
      iLeapAdj2 = 0;

      if (iMonth > 2) {
        iLeapAdj2 = isGregorianLeapYear(iYear) ? -1 : -2;
      }

      tjd2 += Math.floor((367 * iMonth - 362) / 12 + iLeapAdj2 + 1);
      iDay = iJulianDayNoon - tjd2 + 1;
      return {
        day: iDay,
        month: iMonth - 1,
        year: iYear
      };
    }

    function toGregorianArguments$1(aArgs) {
      var aGregorianArgs = Array.prototype.slice.call(aArgs),
          oIslamic,
          oGregorian;
      oIslamic = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
      };
      oGregorian = toGregorian$1(oIslamic);
      aGregorianArgs[0] = oGregorian.year;
      aGregorianArgs[1] = oGregorian.month;
      aGregorianArgs[2] = oGregorian.day;
      return aGregorianArgs;
    }

    function initCustomizationMap() {
      var sDateFormat, oCustomizationJSON;
      oCustomizationMap = {};
      sDateFormat = Core.getConfiguration().getFormatSettings().getLegacyDateFormat();
      sDateFormat = _isSupportedIslamicCalendarType(sDateFormat) ? sDateFormat : 'A';
      oCustomizationJSON = Core.getConfiguration().getFormatSettings().getLegacyDateCalendarCustomizing();
      oCustomizationJSON = oCustomizationJSON || [];

      if (!oCustomizationJSON.length) {
        Log.warning('No calendar customizations.');
        return;
      }

      oCustomizationJSON.forEach(function (oEntry) {
        if (oEntry.dateFormat === sDateFormat) {
          var date = parseDate(oEntry.gregDate);
          var iGregorianDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
          var iMillis = iGregorianDate.getTime();
          var iIslamicMonthStartDays = (iMillis - ISLAMIC_MILLIS) / ONE_DAY;
          date = parseDate(oEntry.islamicMonthStart);
          var iIslamicMonths = (date.year - 1) * 12 + date.month - 1;
          oCustomizationMap[iIslamicMonths] = iIslamicMonthStartDays;
        }
      });
      Log.info('Working with date format: [' + sDateFormat + '] and customization: ' + JSON.stringify(oCustomizationJSON));
    }

    function parseDate(sDate) {
      return {
        year: parseInt(sDate.substr(0, 4)),
        month: parseInt(sDate.substr(4, 2)),
        day: parseInt(sDate.substr(6, 2))
      };
    }

    function getCustomMonthStartDays(months) {
      if (!oCustomizationMap) {
        initCustomizationMap();
      }

      var iIslamicMonthStartDays = oCustomizationMap[months];

      if (!iIslamicMonthStartDays) {
        var year = Math.floor(months / 12) + 1;
        var month = months % 12;
        iIslamicMonthStartDays = monthStart(year, month);
      }

      return iIslamicMonthStartDays;
    }

    function monthStart(year, month) {
      return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30);
    }

    function mod(a, b) {
      return a - b * Math.floor(a / b);
    }

    function isGregorianLeapYear(iYear) {
      return !(iYear % 400) || !(iYear % 4) && !!(iYear % 100);
    }

    function _isSupportedIslamicCalendarType(sCalendarType) {
      return aSupportedIslamicCalendarTypes.indexOf(sCalendarType) !== -1;
    }

    Islamic.prototype._getIslamic = function () {
      return toIslamic({
        day: this.oDate.getDate(),
        month: this.oDate.getMonth(),
        year: this.oDate.getFullYear()
      });
    };

    Islamic.prototype._setIslamic = function (oIslamic) {
      var oGregorian = toGregorian$1(oIslamic);
      return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Islamic.prototype._getUTCIslamic = function () {
      return toIslamic({
        day: this.oDate.getUTCDate(),
        month: this.oDate.getUTCMonth(),
        year: this.oDate.getUTCFullYear()
      });
    };

    Islamic.prototype._setUTCIslamic = function (oIslamic) {
      var oGregorian = toGregorian$1(oIslamic);
      return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Islamic.prototype.getDate = function (iDate) {
      return this._getIslamic().day;
    };

    Islamic.prototype.getMonth = function () {
      return this._getIslamic().month;
    };

    Islamic.prototype.getYear = function () {
      return this._getIslamic().year - BASE_YEAR;
    };

    Islamic.prototype.getFullYear = function () {
      return this._getIslamic().year;
    };

    Islamic.prototype.setDate = function (iDate) {
      var oIslamic = this._getIslamic();

      oIslamic.day = iDate;
      return this._setIslamic(oIslamic);
    };

    Islamic.prototype.setMonth = function (iMonth, iDay) {
      var oIslamic = this._getIslamic();

      oIslamic.month = iMonth;

      if (iDay !== undefined) {
        oIslamic.day = iDay;
      }

      return this._setIslamic(oIslamic);
    };

    Islamic.prototype.setYear = function (iYear) {
      var oIslamic = this._getIslamic();

      oIslamic.year = iYear + BASE_YEAR;
      return this._setIslamic(oIslamic);
    };

    Islamic.prototype.setFullYear = function (iYear, iMonth, iDay) {
      var oIslamic = this._getIslamic();

      oIslamic.year = iYear;

      if (iMonth !== undefined) {
        oIslamic.month = iMonth;
      }

      if (iDay !== undefined) {
        oIslamic.day = iDay;
      }

      return this._setIslamic(oIslamic);
    };

    Islamic.prototype.getUTCDate = function (iDate) {
      return this._getUTCIslamic().day;
    };

    Islamic.prototype.getUTCMonth = function () {
      return this._getUTCIslamic().month;
    };

    Islamic.prototype.getUTCFullYear = function () {
      return this._getUTCIslamic().year;
    };

    Islamic.prototype.setUTCDate = function (iDate) {
      var oIslamic = this._getUTCIslamic();

      oIslamic.day = iDate;
      return this._setUTCIslamic(oIslamic);
    };

    Islamic.prototype.setUTCMonth = function (iMonth, iDay) {
      var oIslamic = this._getUTCIslamic();

      oIslamic.month = iMonth;

      if (iDay !== undefined) {
        oIslamic.day = iDay;
      }

      return this._setUTCIslamic(oIslamic);
    };

    Islamic.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
      var oIslamic = this._getUTCIslamic();

      oIslamic.year = iYear;

      if (iMonth !== undefined) {
        oIslamic.month = iMonth;
      }

      if (iDay !== undefined) {
        oIslamic.day = iDay;
      }

      return this._setUTCIslamic(oIslamic);
    };

    _Calendars.set(CalendarType$1.Islamic, Islamic);

    var Japanese = UniversalDate.extend('sap.ui.core.date.Japanese', {
      constructor: function constructor() {
        var aArgs = arguments;

        if (aArgs.length > 1) {
          aArgs = toGregorianArguments$2(aArgs);
        }

        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType$1.Japanese;
      }
    });

    Japanese.UTC = function () {
      var aArgs = toGregorianArguments$2(arguments);
      return Date.UTC.apply(Date, aArgs);
    };

    Japanese.now = function () {
      return Date.now();
    };

    function toJapanese(oGregorian) {
      var iEra = UniversalDate.getEraByDate(CalendarType$1.Japanese, oGregorian.year, oGregorian.month, oGregorian.day),
          iEraStartYear = UniversalDate.getEraStartDate(CalendarType$1.Japanese, iEra).year;
      return {
        era: iEra,
        year: oGregorian.year - iEraStartYear + 1,
        month: oGregorian.month,
        day: oGregorian.day
      };
    }

    function toGregorian$2(oJapanese) {
      var iEraStartYear = UniversalDate.getEraStartDate(CalendarType$1.Japanese, oJapanese.era).year;
      return {
        year: iEraStartYear + oJapanese.year - 1,
        month: oJapanese.month,
        day: oJapanese.day
      };
    }

    function toGregorianArguments$2(aArgs) {
      var oJapanese,
          oGregorian,
          iEra,
          vYear = aArgs[0];

      if (typeof vYear == 'number') {
        if (vYear >= 100) {
          return aArgs;
        } else {
          iEra = UniversalDate.getCurrentEra(CalendarType$1.Japanese);
          vYear = [iEra, vYear];
        }
      } else if (!Array.isArray(vYear)) {
        vYear = [];
      }

      oJapanese = {
        era: vYear[0],
        year: vYear[1],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
      };
      oGregorian = toGregorian$2(oJapanese);
      aArgs[0] = oGregorian.year;
      return aArgs;
    }

    Japanese.prototype._getJapanese = function () {
      var oGregorian = {
        year: this.oDate.getFullYear(),
        month: this.oDate.getMonth(),
        day: this.oDate.getDate()
      };
      return toJapanese(oGregorian);
    };

    Japanese.prototype._setJapanese = function (oJapanese) {
      var oGregorian = toGregorian$2(oJapanese);
      return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Japanese.prototype._getUTCJapanese = function () {
      var oGregorian = {
        year: this.oDate.getUTCFullYear(),
        month: this.oDate.getUTCMonth(),
        day: this.oDate.getUTCDate()
      };
      return toJapanese(oGregorian);
    };

    Japanese.prototype._setUTCJapanese = function (oJapanese) {
      var oGregorian = toGregorian$2(oJapanese);
      return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Japanese.prototype.getYear = function () {
      return this._getJapanese().year;
    };

    Japanese.prototype.getFullYear = function () {
      return this._getJapanese().year;
    };

    Japanese.prototype.getEra = function () {
      return this._getJapanese().era;
    };

    Japanese.prototype.getUTCFullYear = function () {
      return this._getUTCJapanese().year;
    };

    Japanese.prototype.getUTCEra = function () {
      return this._getUTCJapanese().era;
    };

    Japanese.prototype.setYear = function (iYear) {
      var oJapanese = this._getJapanese();

      oJapanese.year = iYear;
      return this._setJapanese(oJapanese);
    };

    Japanese.prototype.setFullYear = function (iYear, iMonth, iDay) {
      var oJapanese = this._getJapanese();

      oJapanese.year = iYear;

      if (iMonth !== undefined) {
        oJapanese.month = iMonth;
      }

      if (iDay !== undefined) {
        oJapanese.day = iDay;
      }

      return this._setJapanese(oJapanese);
    };

    Japanese.prototype.setEra = function (iEra, iYear, iMonth, iDay) {
      var oEraStartDate = UniversalDate.getEraStartDate(CalendarType$1.Japanese, iEra),
          oJapanese = toJapanese(oEraStartDate);

      if (iYear !== undefined) {
        oJapanese.year = iYear;
      }

      if (iMonth !== undefined) {
        oJapanese.month = iMonth;
      }

      if (iDay !== undefined) {
        oJapanese.day = iDay;
      }

      return this._setJapanese(oJapanese);
    };

    Japanese.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
      var oJapanese = this._getUTCJapanese();

      oJapanese.year = iYear;

      if (iMonth !== undefined) {
        oJapanese.month = iMonth;
      }

      if (iDay !== undefined) {
        oJapanese.day = iDay;
      }

      return this._setUTCJapanese(oJapanese);
    };

    Japanese.prototype.setUTCEra = function (iEra, iYear, iMonth, iDay) {
      var oEraStartDate = UniversalDate.getEraStartDate(CalendarType$1.Japanese, iEra),
          oJapanese = toJapanese(oEraStartDate);

      if (iYear !== undefined) {
        oJapanese.year = iYear;
      }

      if (iMonth !== undefined) {
        oJapanese.month = iMonth;
      }

      if (iDay !== undefined) {
        oJapanese.day = iDay;
      }

      return this._setUTCJapanese(oJapanese);
    };

    Japanese.prototype.getWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getFullYear(), this.getMonth(), this.getDate());
    };

    Japanese.prototype.getUTCWeek = function () {
      return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
    };

    _Calendars.set(CalendarType$1.Japanese, Japanese);

    var Persian = UniversalDate.extend('sap.ui.core.date.Persian', {
      constructor: function constructor() {
        var aArgs = arguments;

        if (aArgs.length > 1) {
          aArgs = toGregorianArguments$3(aArgs);
        }

        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType$1.Persian;
      }
    });

    Persian.UTC = function () {
      var aArgs = toGregorianArguments$3(arguments);
      return Date.UTC.apply(Date, aArgs);
    };

    Persian.now = function () {
      return Date.now();
    };

    var BASE_YEAR$1 = 1300;

    function toPersian(oGregorian) {
      var iJulianDayNumber = g2d(oGregorian.year, oGregorian.month + 1, oGregorian.day);
      return d2j(iJulianDayNumber);
    }

    function toGregorian$3(oPersian) {
      var iJulianDayNumber = j2d(oPersian.year, oPersian.month + 1, oPersian.day);
      return d2g(iJulianDayNumber);
    }

    function toGregorianArguments$3(aArgs) {
      var aGregorianArgs = Array.prototype.slice.call(aArgs),
          oPersian,
          oGregorian;

      if (typeof aArgs[0] !== 'number' || typeof aArgs[1] !== 'number' || aArgs[2] !== undefined && typeof aArgs[2] != 'number') {
        aGregorianArgs[0] = NaN;
        aGregorianArgs[1] = NaN;
        aGregorianArgs[2] = NaN;
        return aGregorianArgs;
      }

      oPersian = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
      };
      oGregorian = toGregorian$3(oPersian);
      aGregorianArgs[0] = oGregorian.year;
      aGregorianArgs[1] = oGregorian.month;
      aGregorianArgs[2] = oGregorian.day;
      return aGregorianArgs;
    }

    function jalCal(jy) {
      var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178],
          bl = breaks.length,
          gy = jy + 621,
          leapJ = -14,
          jp = breaks[0],
          jm,
          jump,
          leap,
          leapG,
          march,
          n,
          i;

      for (i = 1; i < bl; i += 1) {
        jm = breaks[i];
        jump = jm - jp;

        if (jy < jm) {
          break;
        }

        leapJ = leapJ + div(jump, 33) * 8 + div(mod$1(jump, 33), 4);
        jp = jm;
      }

      n = jy - jp;
      leapJ = leapJ + div(n, 33) * 8 + div(mod$1(n, 33) + 3, 4);

      if (mod$1(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
      }

      leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
      march = 20 + leapJ - leapG;

      if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
      }

      leap = mod$1(mod$1(n + 1, 33) - 1, 4);

      if (leap === -1) {
        leap = 4;
      }

      return {
        leap: leap,
        gy: gy,
        march: march
      };
    }

    function j2d(jy, jm, jd) {
      while (jm < 1) {
        jm += 12;
        jy--;
      }

      while (jm > 12) {
        jm -= 12;
        jy++;
      }

      var r = jalCal(jy);
      return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
    }

    function d2j(jdn) {
      var gy = d2g(jdn).year,
          jy = gy - 621,
          r = jalCal(jy),
          jdn1f = g2d(gy, 3, r.march),
          jd,
          jm,
          k;
      k = jdn - jdn1f;

      if (k >= 0) {
        if (k <= 185) {
          jm = 1 + div(k, 31);
          jd = mod$1(k, 31) + 1;
          return {
            year: jy,
            month: jm - 1,
            day: jd
          };
        } else {
          k -= 186;
        }
      } else {
        jy -= 1;
        k += 179;

        if (r.leap === 1) {
          k += 1;
        }
      }

      jm = 7 + div(k, 30);
      jd = mod$1(k, 30) + 1;
      return {
        year: jy,
        month: jm - 1,
        day: jd
      };
    }

    function g2d(gy, gm, gd) {
      var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod$1(gm + 9, 12) + 2, 5) + gd - 34840408;
      d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
      return d;
    }

    function d2g(jdn) {
      var j, i, gd, gm, gy;
      j = 4 * jdn + 139361631;
      j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
      i = div(mod$1(j, 1461), 4) * 5 + 308;
      gd = div(mod$1(i, 153), 5) + 1;
      gm = mod$1(div(i, 153), 12) + 1;
      gy = div(j, 1461) - 100100 + div(8 - gm, 6);
      return {
        year: gy,
        month: gm - 1,
        day: gd
      };
    }

    function div(a, b) {
      return ~~(a / b);
    }

    function mod$1(a, b) {
      return a - ~~(a / b) * b;
    }

    Persian.prototype._getPersian = function () {
      return toPersian({
        day: this.oDate.getDate(),
        month: this.oDate.getMonth(),
        year: this.oDate.getFullYear()
      });
    };

    Persian.prototype._setPersian = function (oPersian) {
      var oGregorian = toGregorian$3(oPersian);
      return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Persian.prototype._getUTCPersian = function () {
      return toPersian({
        day: this.oDate.getUTCDate(),
        month: this.oDate.getUTCMonth(),
        year: this.oDate.getUTCFullYear()
      });
    };

    Persian.prototype._setUTCPersian = function (oPersian) {
      var oGregorian = toGregorian$3(oPersian);
      return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
    };

    Persian.prototype.getDate = function (iDate) {
      return this._getPersian().day;
    };

    Persian.prototype.getMonth = function () {
      return this._getPersian().month;
    };

    Persian.prototype.getYear = function () {
      return this._getPersian().year - BASE_YEAR$1;
    };

    Persian.prototype.getFullYear = function () {
      return this._getPersian().year;
    };

    Persian.prototype.setDate = function (iDate) {
      var oPersian = this._getPersian();

      oPersian.day = iDate;
      return this._setPersian(oPersian);
    };

    Persian.prototype.setMonth = function (iMonth, iDay) {
      var oPersian = this._getPersian();

      oPersian.month = iMonth;

      if (iDay !== undefined) {
        oPersian.day = iDay;
      }

      return this._setPersian(oPersian);
    };

    Persian.prototype.setYear = function (iYear) {
      var oPersian = this._getPersian();

      oPersian.year = iYear + BASE_YEAR$1;
      return this._setPersian(oPersian);
    };

    Persian.prototype.setFullYear = function (iYear, iMonth, iDay) {
      var oPersian = this._getPersian();

      oPersian.year = iYear;

      if (iMonth !== undefined) {
        oPersian.month = iMonth;
      }

      if (iDay !== undefined) {
        oPersian.day = iDay;
      }

      return this._setPersian(oPersian);
    };

    Persian.prototype.getUTCDate = function (iDate) {
      return this._getUTCPersian().day;
    };

    Persian.prototype.getUTCMonth = function () {
      return this._getUTCPersian().month;
    };

    Persian.prototype.getUTCFullYear = function () {
      return this._getUTCPersian().year;
    };

    Persian.prototype.setUTCDate = function (iDate) {
      var oPersian = this._getUTCPersian();

      oPersian.day = iDate;
      return this._setUTCPersian(oPersian);
    };

    Persian.prototype.setUTCMonth = function (iMonth, iDay) {
      var oPersian = this._getUTCPersian();

      oPersian.month = iMonth;

      if (iDay !== undefined) {
        oPersian.day = iDay;
      }

      return this._setUTCPersian(oPersian);
    };

    Persian.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
      var oPersian = this._getUTCPersian();

      oPersian.year = iYear;

      if (iMonth !== undefined) {
        oPersian.month = iMonth;
      }

      if (iDay !== undefined) {
        oPersian.day = iDay;
      }

      return this._setUTCPersian(oPersian);
    };

    _Calendars.set(CalendarType$1.Persian, Persian);

    var instances = new Map();
    /**
     * Fetches and returns а LocaleData object for the required locale
     * For more information on this object's API, please see:
     * https://ui5.sap.com/#/api/sap.ui.core.LocaleData
     *
     * @param lang - if left empty, will use the configured/current locale
     * @returns {LocaleData}
     */

    var getLocaleData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(lang) {
        var locale, localeLang;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                locale = getLocale(lang);
                localeLang = locale.getLanguage();

                if (instances.has(localeLang)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());

              case 5:
                instances.set(localeLang, LocaleData.getInstance(locale));

              case 6:
                return _context.abrupt("return", instances.get(localeLang));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getLocaleData(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
    var SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
    /* Map for old language names for a few ISO639 codes. */

    var M_ISO639_NEW_TO_OLD = {
      "he": "iw",
      "yi": "ji",
      "id": "in",
      "sr": "sh"
    };
    /**
     * Normalizes the given locale in BCP-47 syntax.
     * @param {string} locale locale to normalize
     * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
     */

    var normalizeLocale = function normalizeLocale(locale) {
      var m;

      if (!locale) {
        return DEFAULT_LOCALE;
      }

      if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) {
        /* eslint-disable-line */
        var language = m[1].toLowerCase();
        var region = m[3] ? m[3].toUpperCase() : undefined;
        var script = m[2] ? m[2].toLowerCase() : undefined;
        var variants = m[4] ? m[4].slice(1) : undefined;
        var isPrivate = m[6];
        language = M_ISO639_NEW_TO_OLD[language] || language; // recognize and convert special SAP supportability locales (overwrites m[]!)

        if (isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate)) ||
        /* eslint-disable-line */
        variants && (m = SAPSupportabilityLocales.exec(variants))) {
          /* eslint-disable-line */
          return "en_US_".concat(m[1].toLowerCase()); // for now enforce en_US (agreed with SAP SLS)
        } // Chinese: when no region but a script is specified, use default region for each script


        if (language === "zh" && !region) {
          if (script === "hans") {
            region = "CN";
          } else if (script === "hant") {
            region = "TW";
          }
        }

        return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : "");
        /* eslint-disable-line */
      }
    };

    /**
     * Calculates the next fallback locale for the given locale.
     *
     * @param {string} locale Locale string in Java format (underscores) or null
     * @returns {string} Next fallback Locale or "en" if no fallbacks found.
     */

    var nextFallbackLocale = function nextFallbackLocale(locale) {
      if (!locale) {
        return DEFAULT_LOCALE;
      }

      if (locale === "zh_HK") {
        return "zh_TW";
      } // if there are multiple segments (separated by underscores), remove the last one


      var p = locale.lastIndexOf("_");

      if (p >= 0) {
        return locale.slice(0, p);
      } // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)


      return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
    };

    var bundleData = new Map();
    var bundleURLs = new Map();
    /**
     * Sets a map with texts and ID the are related to.
     * @param {string} packageName package ID that the i18n bundle will be related to
     * @param {Object} data an object with string locales as keys and text translataions as values
     * @public
     */

    var setI18nBundleData = function setI18nBundleData(packageName, data) {
      bundleData.set(packageName, data);
    };

    var getI18nBundleData = function getI18nBundleData(packageName) {
      return bundleData.get(packageName);
    };
    /**
     * Registers a map of locale/url information, to be used by the <code>fetchI18nBundle</code> method.
     * @param {string} packageName package ID that the i18n bundle will be related to
     * @param {Object} bundle an object with string locales as keys and the URLs of where the corresponding locale can be fetched from, f.e {"en": "path/en.json", ...}
     * @public
     */


    var registerI18nBundle = function registerI18nBundle(packageName, bundle) {
      bundleURLs.set(packageName, bundle);
    };
    /**
     * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
     * each text resource over the network once (even for multiple calls to the same method).
     * It should be fully finished before the i18nBundle class is created in the webcomponents.
     * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
     * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
     * @param {packageName} packageName the NPM package name
     * @public
     */


    var fetchI18nBundle =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(packageName) {
        var bundlesForPackage, language, localeId, bundleURL, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bundlesForPackage = bundleURLs.get(packageName);

                if (bundlesForPackage) {
                  _context.next = 4;
                  break;
                }

                console.warn("Message bundle assets are not configured. Falling back to English texts.",
                /* eslint-disable-line */
                " You need to import ".concat(packageName, "/dist/Assets.js with a build tool that supports JSON imports."));
                /* eslint-disable-line */

                return _context.abrupt("return");

              case 4:
                language = getLocale().getLanguage();
                localeId = normalizeLocale(language);

                while (!bundlesForPackage[localeId]) {
                  localeId = nextFallbackLocale(localeId);
                }

                if (!(localeId === DEFAULT_LANGUAGE)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                bundleURL = bundlesForPackage[localeId];

                if (!(_typeof(bundleURL) === "object")) {
                  _context.next = 13;
                  break;
                }

                // inlined from build
                setI18nBundleData(packageName, bundleURL);
                return _context.abrupt("return");

              case 13:
                _context.next = 15;
                return fetchJsonOnce(bundleURL);

              case 15:
                data = _context.sent;
                setI18nBundleData(packageName, data);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchI18nBundle(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var ar = "/resources/messagebundle_ar.3cb0c9150a0d3b65.json";

    var bg = "/resources/messagebundle_bg.c5b5f09d4cdc05c2.json";

    var ca = "/resources/messagebundle_ca.21eddad79e57b196.json";

    var cs = "/resources/messagebundle_cs.254cf5a554d6c3cf.json";

    var da = "/resources/messagebundle_da.292202a074417518.json";

    var de = "/resources/messagebundle_de.8a37d0d12d5f3fdb.json";

    var el = "/resources/messagebundle_el.20e733cf13266e95.json";

    var en = "/resources/messagebundle_en.2116c2eb907f4239.json";

    var es = "/resources/messagebundle_es.4b7a0782bf89db91.json";

    var et = "/resources/messagebundle_et.32a3ecb2ab90d7e1.json";

    var fi = "/resources/messagebundle_fi.59f4c565254f8bd7.json";

    var fr = "/resources/messagebundle_fr.4823ab3f68b56fff.json";

    var hi = "/resources/messagebundle_hi.169377676442a6c3.json";

    var hr = "/resources/messagebundle_hr.7b0f01264adee46e.json";

    var hu = "/resources/messagebundle_hu.b7073837581b601d.json";

    var it = "/resources/messagebundle_it.7aa517f8f41868e7.json";

    var iw = "/resources/messagebundle_iw.f8e9297bda991f89.json";

    var ja = "/resources/messagebundle_ja.94a03c1b60503735.json";

    var kk = "/resources/messagebundle_kk.8108317e69a7b684.json";

    var ko = "/resources/messagebundle_ko.30d4f96289f472cb.json";

    var lt = "/resources/messagebundle_lt.3132c6a3e0a20741.json";

    var lv = "/resources/messagebundle_lv.6d37db7bca572e88.json";

    var ms = "/resources/messagebundle_ms.96b31d30dbb8df67.json";

    var nl = "/resources/messagebundle_nl.55a55c21aa99f942.json";

    var no = "/resources/messagebundle_no.b9dc8ffcbe8a355c.json";

    var pl = "/resources/messagebundle_pl.6cd59d32e72c298e.json";

    var pt = "/resources/messagebundle_pt.2c1d8ef6246adb51.json";

    var ro = "/resources/messagebundle_ro.fb81096a3806a008.json";

    var ru = "/resources/messagebundle_ru.d749fe9a4410804b.json";

    var sh = "/resources/messagebundle_sh.916eebfe6e3f1a59.json";

    var sk = "/resources/messagebundle_sk.8974857bc54ff0cd.json";

    var sl = "/resources/messagebundle_sl.641196e022a3f742.json";

    var sv = "/resources/messagebundle_sv.80f494abf30df0c1.json";

    var th = "/resources/messagebundle_th.379bcb24bcfc7df4.json";

    var tr = "/resources/messagebundle_tr.afe04d29d9dba0d7.json";

    var uk = "/resources/messagebundle_uk.4afab4a3f061d588.json";

    var vi = "/resources/messagebundle_vi.2c80623c96bff00a.json";

    var zhCN = "/resources/messagebundle_zh_CN.aacf4602bca2861e.json";

    var zhTW = "/resources/messagebundle_zh_TW.e049f5a95536f343.json";

    var bundleMap = {
      ar: ar,
      bg: bg,
      ca: ca,
      cs: cs,
      da: da,
      de: de,
      el: el,
      en: en,
      es: es,
      et: et,
      fi: fi,
      fr: fr,
      hi: hi,
      hr: hr,
      hu: hu,
      it: it,
      iw: iw,
      ja: ja,
      kk: kk,
      ko: ko,
      lt: lt,
      lv: lv,
      ms: ms,
      nl: nl,
      no: no,
      pl: pl,
      pt: pt,
      ro: ro,
      ru: ru,
      sh: sh,
      sk: sk,
      sl: sl,
      sv: sv,
      th: th,
      tr: tr,
      uk: uk,
      vi: vi,
      zh_CN: zhCN,
      zh_TW: zhTW
    };
    var allEntriesInlined = Object.entries(bundleMap).every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _key = _ref2[0],
          value = _ref2[1];

      return _typeof(value) === "object";
    });
    /* eslint-disable */

    if (allEntriesInlined) {
      console.warn("Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them.\nSee rollup-plugin-url or webpack file-loader for more information.\nSuggested pattern: \"assets\\/.*\\.json\"");
    }
    /* eslint-enable */


    registerI18nBundle("@ui5/webcomponents-icons", bundleMap);

    var registry = new Map();
    var iconCollectionPromises = new Map();
    var ICON_NOT_FOUND = "ICON_NOT_FOUND";
    var DEFAULT_COLLECTION = "SAP-icons";

    var calcKey = function calcKey(name, collection) {
      // silently support ui5-compatible URIs
      if (name.startsWith("sap-icon://")) {
        name = name.replace("sap-icon://", "");

        var _name$split$reverse = name.split("/").reverse();

        var _name$split$reverse2 = _slicedToArray(_name$split$reverse, 2);

        name = _name$split$reverse2[0];
        collection = _name$split$reverse2[1];
      }

      collection = collection || DEFAULT_COLLECTION;
      return "".concat(collection, ":").concat(name);
    };

    var registerIcon = function registerIcon(name) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          pathData = _ref.pathData,
          accData = _ref.accData,
          collection = _ref.collection;

      var key = calcKey(name, collection);
      registry.set(key, {
        pathData: pathData,
        accData: accData
      });
    };

    var getIconDataSync = function getIconDataSync(name) {
      var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_COLLECTION;
      var key = calcKey(name, collection);
      return registry.get(key);
    };

    var getIconData =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(name) {
        var collection,
            key,
            iconData,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                collection = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_COLLECTION;
                key = calcKey(name, collection);

                if (!iconCollectionPromises.has(collection)) {
                  iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
                }

                _context.next = 5;
                return iconCollectionPromises.get(collection);

              case 5:
                iconData = _context.sent;

                if (!(iconData === ICON_NOT_FOUND)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", iconData);

              case 8:
                return _context.abrupt("return", registry.get(key));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getIconData(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    var getRegisteredNames =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!iconCollectionPromises.has(DEFAULT_COLLECTION)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return iconCollectionPromises.get(DEFAULT_COLLECTION);

              case 3:
                return _context2.abrupt("return", Array.from(registry.keys()).map(function (k) {
                  return k.split(":")[1];
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function getRegisteredNames() {
        return _ref3.apply(this, arguments);
      };
    }();

    var registerCollectionPromise = function registerCollectionPromise(collection, promise) {
      iconCollectionPromises.set(collection, promise);
    };

    var registerIconBundle =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(collectionName, bundleData) {
        var resolveFn, collectionFetched;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                collectionFetched = new Promise(function (resolve) {
                  resolveFn = resolve;
                });
                registerCollectionPromise(collectionName, collectionFetched);

                if (!(_typeof(bundleData) !== "object")) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return fetchJsonOnce(bundleData);

              case 5:
                bundleData = _context.sent;

              case 6:
                fillRegistry(bundleData);
                resolveFn();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function registerIconBundle(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var fillRegistry = function fillRegistry(bundleData) {
      Object.keys(bundleData.data).forEach(function (iconName) {
        registerIcon(iconName, {
          pathData: bundleData.data[iconName],
          accData: bundleData.accData[iconName],
          collection: bundleData.collection
        });
      });
    };
     // eslint-disable-line

    var SAPIcons = "/resources/SAP-icons.8212fbca93791fd5.json";

    registerIconBundle("SAP-icons", SAPIcons);

    var ar$1 = "/resources/ar.43441c1da168c24d.json";

    var ar_EG = "/resources/ar_EG.2c9d7bc8c6cc480e.json";

    var ar_SA = "/resources/ar_SA.5a58dac7851f3491.json";

    var bg$1 = "/resources/bg.ed8d32010cf321a6.json";

    var ca$1 = "/resources/ca.e7ad42298985cd11.json";

    var cs$1 = "/resources/cs.9c679acdc4b03e38.json";

    var da$1 = "/resources/da.ba9951ef39b201a6.json";

    var de$1 = "/resources/de.6caccc36abcd1ecf.json";

    var de_AT = "/resources/de_AT.0f4ffe37737725a0.json";

    var de_CH = "/resources/de_CH.c148cbc7ceb1a7a5.json";

    var el$1 = "/resources/el.11c4c67dcb9fadcc.json";

    var el_CY = "/resources/el_CY.ed3bddd6e79dc343.json";

    var en$1 = "/resources/en.c4465af466100b5b.json";

    var en_AU = "/resources/en_AU.5cb9fccc9ce24663.json";

    var en_GB = "/resources/en_GB.e31daeeb57c2f1d1.json";

    var en_HK = "/resources/en_HK.0a22405bb092bec2.json";

    var en_IE = "/resources/en_IE.6a062df10dabdb1c.json";

    var en_IN = "/resources/en_IN.bfd20b07e9079267.json";

    var en_NZ = "/resources/en_NZ.18303e8298e4752a.json";

    var en_PG = "/resources/en_PG.9f604c968f3ab77e.json";

    var en_SG = "/resources/en_SG.cc59a6a409e1617e.json";

    var en_ZA = "/resources/en_ZA.198f9641a502d660.json";

    var es$1 = "/resources/es.c10bf80f473caf30.json";

    var es_AR = "/resources/es_AR.7708d7dd7a6d2a15.json";

    var es_BO = "/resources/es_BO.4a1616d9f3425fba.json";

    var es_CL = "/resources/es_CL.5637126713317a15.json";

    var es_CO = "/resources/es_CO.c9436572ca8f4da8.json";

    var es_MX = "/resources/es_MX.b4bce7dc951eb8f4.json";

    var es_PE = "/resources/es_PE.65f448fde1f0de13.json";

    var es_UY = "/resources/es_UY.9ec44031491e9b95.json";

    var es_VE = "/resources/es_VE.152233c7f57ecdab.json";

    var et$1 = "/resources/et.bbc93e8a17832e8f.json";

    var fa = "/resources/fa.083b927b3586b3a3.json";

    var fi$1 = "/resources/fi.1b4c89f38783556e.json";

    var fr$1 = "/resources/fr.ddbb9df1e0bdb6ac.json";

    var fr_BE = "/resources/fr_BE.bf3609280b7b93ee.json";

    var fr_CA = "/resources/fr_CA.b64d0bcd23a5cd3e.json";

    var fr_CH = "/resources/fr_CH.349b221a02887244.json";

    var fr_LU = "/resources/fr_LU.ef7d7c8bb3328d28.json";

    var he = "/resources/he.d628e8bf13a8a2c8.json";

    var hi$1 = "/resources/hi.cc34df8229f656f5.json";

    var hr$1 = "/resources/hr.c920290f50173516.json";

    var hu$1 = "/resources/hu.2d9fa4a9163cd7c0.json";

    var id = "/resources/id.163fdd2a7dbd1dd3.json";

    var it$1 = "/resources/it.b5acbefdd6794dfc.json";

    var it_CH = "/resources/it_CH.ade4cbfb2e49424a.json";

    var ja$1 = "/resources/ja.d882fade5c3e04b5.json";

    var kk$1 = "/resources/kk.ab96b18c66676a99.json";

    var ko$1 = "/resources/ko.a0d63a1580dcbefd.json";

    var lt$1 = "/resources/lt.93bb00f91a74d613.json";

    var lv$1 = "/resources/lv.3c272216d7d4d61c.json";

    var ms$1 = "/resources/ms.e26b54937e5d1516.json";

    var nb = "/resources/nb.a6e9993590a73989.json";

    var nl$1 = "/resources/nl.cac914c3529b7b01.json";

    var nl_BE = "/resources/nl_BE.a3ac6f9f99feba7b.json";

    var pl$1 = "/resources/pl.2cc1c94da23f8c37.json";

    var pt$1 = "/resources/pt.fc8dd9656bc363a4.json";

    var pt_PT = "/resources/pt_PT.be31b641eedfdb48.json";

    var ro$1 = "/resources/ro.fc6a48bc63cf435e.json";

    var ru$1 = "/resources/ru.77f0de46b3b490b1.json";

    var ru_UA = "/resources/ru_UA.4c4e0034fbd799c6.json";

    var sk$1 = "/resources/sk.0d62a8cca83c1dec.json";

    var sl$1 = "/resources/sl.7b303551cc238560.json";

    var sr = "/resources/sr.7fb9ac6ed054ff7d.json";

    var sv$1 = "/resources/sv.6ea04dfd8d1c331b.json";

    var th$1 = "/resources/th.8e8d734a66ed1c51.json";

    var tr$1 = "/resources/tr.dbb9aa836fc4e3f5.json";

    var uk$1 = "/resources/uk.4854089f0c12f77c.json";

    var vi$1 = "/resources/vi.e6ffbde0643d7d75.json";

    var zh_CN = "/resources/zh_CN.6607a3e9e0901e53.json";

    var zh_HK = "/resources/zh_HK.1c2563d3e4dad56e.json";

    var zh_SG = "/resources/zh_SG.db7f1334eecf894d.json";

    var zh_TW = "/resources/zh_TW.a1d00dd87c58d8f0.json";

    var cldrData$1 = {
      ar: ar$1,
      ar_EG: ar_EG,
      ar_SA: ar_SA,
      bg: bg$1,
      ca: ca$1,
      cs: cs$1,
      da: da$1,
      de: de$1,
      de_AT: de_AT,
      de_CH: de_CH,
      el: el$1,
      el_CY: el_CY,
      en: en$1,
      en_AU: en_AU,
      en_GB: en_GB,
      en_HK: en_HK,
      en_IE: en_IE,
      en_IN: en_IN,
      en_NZ: en_NZ,
      en_PG: en_PG,
      en_SG: en_SG,
      en_ZA: en_ZA,
      es: es$1,
      es_AR: es_AR,
      es_BO: es_BO,
      es_CL: es_CL,
      es_CO: es_CO,
      es_MX: es_MX,
      es_PE: es_PE,
      es_UY: es_UY,
      es_VE: es_VE,
      et: et$1,
      fa: fa,
      fi: fi$1,
      fr: fr$1,
      fr_BE: fr_BE,
      fr_CA: fr_CA,
      fr_CH: fr_CH,
      fr_LU: fr_LU,
      he: he,
      hi: hi$1,
      hr: hr$1,
      hu: hu$1,
      id: id,
      it: it$1,
      it_CH: it_CH,
      ja: ja$1,
      kk: kk$1,
      ko: ko$1,
      lt: lt$1,
      lv: lv$1,
      ms: ms$1,
      nb: nb,
      nl: nl$1,
      nl_BE: nl_BE,
      pl: pl$1,
      pt: pt$1,
      pt_PT: pt_PT,
      ro: ro$1,
      ru: ru$1,
      ru_UA: ru_UA,
      sk: sk$1,
      sl: sl$1,
      sr: sr,
      sv: sv$1,
      th: th$1,
      tr: tr$1,
      uk: uk$1,
      vi: vi$1,
      zh_CN: zh_CN,
      zh_HK: zh_HK,
      zh_SG: zh_SG,
      zh_TW: zh_TW
    };
    var allEntriesInlined$1 = Object.entries(cldrData$1).every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _key = _ref2[0],
          value = _ref2[1];

      return _typeof(value) === "object";
    });

    if (allEntriesInlined$1) {
      console.warn("Inefficient bundling detected: consider bundling CLDR imports as URLs instead of inlining them.\nSee rollup-plugin-url or webpack file-loader for more information.\nSuggested pattern: \"assets\\/.*\\.json\"");
    }

    Object.entries(cldrData$1).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      if (_typeof(value) === "object") {
        setCldrData(key, value);
      } else {
        registerCldr(key, value);
      }
    });

    var sap_fiori_3_dark = "/resources/parameters-bundle.css.e19065174fdd4592.json";

    var sap_belize = "/resources/parameters-bundle.css.6c6e759e0d3534d0.json";

    var sap_belize_hcb = "/resources/parameters-bundle.css.dfd19a1252497415.json";

    var sap_belize_hcw = "/resources/parameters-bundle.css.e2ac94de83159e1e.json";

    var isInlined = function isInlined(obj) {
      return _typeof(obj) === "object";
    };

    if (isInlined(sap_fiori_3_dark) || isInlined(sap_belize) || isInlined(sap_belize_hcb) || isInlined(sap_belize_hcw)) {
      console.warn("Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.\nSee rollup-plugin-url or webpack file-loader for more information.\nSuggested pattern: \"assets\\/.*\\.json\"");
    }

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3_dark", sap_fiori_3_dark);
    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize", sap_belize);
    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize_hcb", sap_belize_hcb);
    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize_hcw", sap_belize_hcw);

    var sap_fiori_3_dark$1 = "/resources/parameters-bundle.css.269e704a7b899bc0.json";

    var sap_belize$1 = "/resources/parameters-bundle.css.3edb4d7bb0b5f22e.json";

    var sap_belize_hcb$1 = "/resources/parameters-bundle.css.0e4db04cf5eef4b2.json";

    var sap_belize_hcw$1 = "/resources/parameters-bundle.css.3fff74882428c249.json";

    var isInlined$1 = function isInlined(obj) {
      return _typeof(obj) === "object";
    };

    if (isInlined$1(sap_fiori_3_dark$1) || isInlined$1(sap_belize$1) || isInlined$1(sap_belize_hcb$1) || isInlined$1(sap_belize_hcw$1)) {
      console.warn("Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.\nSee rollup-plugin-url or webpack file-loader for more information.\nSuggested pattern: \"assets\\/.*\\.json\"");
    }

    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3_dark", sap_fiori_3_dark$1);
    registerThemeProperties("@ui5/webcomponents", "sap_belize", sap_belize$1);
    registerThemeProperties("@ui5/webcomponents", "sap_belize_hcb", sap_belize_hcb$1);
    registerThemeProperties("@ui5/webcomponents", "sap_belize_hcw", sap_belize_hcw$1);

    var ar$2 = "/resources/messagebundle_ar.00bef393697900af.json";

    var bg$2 = "/resources/messagebundle_bg.0994e0428165d969.json";

    var ca$2 = "/resources/messagebundle_ca.cc31e37a5765b152.json";

    var cs$2 = "/resources/messagebundle_cs.f73c30a0e39e46e0.json";

    var da$2 = "/resources/messagebundle_da.187b546a523540f7.json";

    var de$2 = "/resources/messagebundle_de.f7c4aa7049a7413d.json";

    var el$2 = "/resources/messagebundle_el.4036ec967453d300.json";

    var en$2 = "/resources/messagebundle_en.743ef216e6a4661f.json";

    var es$2 = "/resources/messagebundle_es.7160ad5caec7a6e9.json";

    var et$2 = "/resources/messagebundle_et.ba47b4ef1b605702.json";

    var fi$2 = "/resources/messagebundle_fi.bcb2444e773b9318.json";

    var fr$2 = "/resources/messagebundle_fr.61b61713186a3aac.json";

    var hi$2 = "/resources/messagebundle_hi.c3470fd5b8f31b3a.json";

    var hr$2 = "/resources/messagebundle_hr.29ad42af33fd6069.json";

    var hu$2 = "/resources/messagebundle_hu.1b2fde0be1b2df3d.json";

    var it$2 = "/resources/messagebundle_it.904ee30138ccdbf6.json";

    var iw$1 = "/resources/messagebundle_iw.d0aebec11436269e.json";

    var ja$2 = "/resources/messagebundle_ja.075ec214569504b9.json";

    var kk$2 = "/resources/messagebundle_kk.dcb9a9b64e6fb16a.json";

    var ko$2 = "/resources/messagebundle_ko.c9ecb699577f3da7.json";

    var lt$2 = "/resources/messagebundle_lt.5fd2c64de27e3c28.json";

    var lv$2 = "/resources/messagebundle_lv.7a3b493b2fbbab8c.json";

    var ms$2 = "/resources/messagebundle_ms.b0c76e717ad86427.json";

    var nl$2 = "/resources/messagebundle_nl.9b0bbd03ae71c42e.json";

    var no$1 = "/resources/messagebundle_no.5a06931ec08deff5.json";

    var pl$2 = "/resources/messagebundle_pl.edfab4780eb6083e.json";

    var pt$2 = "/resources/messagebundle_pt.ec414bc1d02b4ffd.json";

    var ro$2 = "/resources/messagebundle_ro.558c00c45ecc9a3c.json";

    var ru$2 = "/resources/messagebundle_ru.950a13102650a156.json";

    var sh$1 = "/resources/messagebundle_sh.c37f1bf5eeb5b6d5.json";

    var sk$2 = "/resources/messagebundle_sk.63f7189c9d32eef8.json";

    var sl$2 = "/resources/messagebundle_sl.c90abec5dd88885c.json";

    var sv$2 = "/resources/messagebundle_sv.5825cded8a7bf369.json";

    var th$2 = "/resources/messagebundle_th.40f31a581a42bb7b.json";

    var tr$2 = "/resources/messagebundle_tr.c63e3adacf849e48.json";

    var uk$2 = "/resources/messagebundle_uk.d2bb3cd1af53f7db.json";

    var vi$2 = "/resources/messagebundle_vi.af2a1028b9d56323.json";

    var zh_CN$1 = "/resources/messagebundle_zh_CN.5ad63a8457a0206d.json";

    var zh_TW$1 = "/resources/messagebundle_zh_TW.6d8822e8564ae482.json";

    var bundleMap$1 = {
      ar: ar$2,
      bg: bg$2,
      ca: ca$2,
      cs: cs$2,
      da: da$2,
      de: de$2,
      el: el$2,
      en: en$2,
      es: es$2,
      et: et$2,
      fi: fi$2,
      fr: fr$2,
      hi: hi$2,
      hr: hr$2,
      hu: hu$2,
      it: it$2,
      iw: iw$1,
      ja: ja$2,
      kk: kk$2,
      ko: ko$2,
      lt: lt$2,
      lv: lv$2,
      ms: ms$2,
      nl: nl$2,
      no: no$1,
      pl: pl$2,
      pt: pt$2,
      ro: ro$2,
      ru: ru$2,
      sh: sh$1,
      sk: sk$2,
      sl: sl$2,
      sv: sv$2,
      th: th$2,
      tr: tr$2,
      uk: uk$2,
      vi: vi$2,
      zh_CN: zh_CN$1,
      zh_TW: zh_TW$1
    };
    var allEntriesInlined$2 = Object.entries(bundleMap$1).every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _key = _ref2[0],
          value = _ref2[1];

      return _typeof(value) === "object";
    });

    if (allEntriesInlined$2) {
      console.warn("Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them.\nSee rollup-plugin-url or webpack file-loader for more information.\nSuggested pattern: \"assets\\/.*\\.json\"");
    }

    registerI18nBundle("@ui5/webcomponents", bundleMap$1);

    var whenDOMReady = function whenDOMReady() {
      return new Promise(function (resolve) {
        if (document.body) {
          resolve();
        } else {
          document.addEventListener("DOMContentLoaded", function () {
            resolve();
          });
        }
      });
    };

    /**
     * CSS font face used for the texts provided by SAP.
     */
    /* CDN Locations */

    var font72RegularWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents";
    var font72RegularWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents";
    var font72RegularFullWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents";
    var font72RegularFullWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents";
    var font72BoldWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents";
    var font72BoldWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents";
    var font72BoldFullWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents";
    var font72BoldFullWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents";
    var fontFaceCSS = "\n\t@font-face {\n\t\tfont-family: \"72\";\n\t\tfont-style: normal;\n\t\tfont-weight: 400;\n\t\tsrc: local(\"72\"),\n\t\t\turl(".concat(font72RegularWoff2, ") format(\"woff2\"),\n\t\t\turl(").concat(font72RegularWoff, ") format(\"woff\");\n\t}\n\t\n\t@font-face {\n\t\tfont-family: \"72full\";\n\t\tfont-style: normal;\n\t\tfont-weight: 400;\n\t\tsrc: local('72-full'),\n\t\t\turl(").concat(font72RegularFullWoff2, ") format(\"woff2\"),\n\t\t\turl(").concat(font72RegularFullWoff, ") format(\"woff\");\n\t\t\n\t}\n\t\n\t@font-face {\n\t\tfont-family: \"72\";\n\t\tfont-style: normal;\n\t\tfont-weight: 700;\n\t\tsrc: local('72-Bold'),\n\t\t\turl(").concat(font72BoldWoff2, ") format(\"woff2\"),\n\t\t\turl(").concat(font72BoldWoff, ") format(\"woff\");\n\t}\n\t\n\t@font-face {\n\t\tfont-family: \"72full\";\n\t\tfont-style: normal;\n\t\tfont-weight: 700;\n\t\tsrc: local('72-Bold-full'),\n\t\t\turl(").concat(font72BoldFullWoff2, ") format(\"woff2\"),\n\t\t\turl(").concat(font72BoldFullWoff, ") format(\"woff\");\n\t}\n");

    var insertFontFace = function insertFontFace() {
      if (document.querySelector("head>style[data-ui5-font-face]")) {
        return;
      } // If OpenUI5 is found, let it set the font


      var OpenUI5Support = getFeature("OpenUI5Support");

      if (OpenUI5Support && OpenUI5Support.isLoaded()) {
        return;
      }

      createStyleInHead(fontFaceCSS, {
        "data-ui5-font-face": ""
      });
    };

    var polyfillLoadedPromise;

    var whenPolyfillLoaded = function whenPolyfillLoaded() {
      if (polyfillLoadedPromise) {
        return polyfillLoadedPromise;
      }

      polyfillLoadedPromise = new Promise(function (resolve) {
        if (window.WebComponents && !window.WebComponents.ready && window.WebComponents.waitFor) {
          // the polyfill loader is present
          window.WebComponents.waitFor(function () {
            // the polyfills are loaded, safe to execute code depending on their APIs
            resolve();
          });
        } else {
          // polyfill loader missing, modern browsers only
          resolve();
        }
      });
      return polyfillLoadedPromise;
    };

    var bootPromise;

    var boot = function boot() {
      if (bootPromise) {
        return bootPromise;
      }

      bootPromise = new Promise(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(resolve) {
          var OpenUI5Support;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  OpenUI5Support = getFeature("OpenUI5Support");

                  if (!OpenUI5Support) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 4;
                  return OpenUI5Support.init();

                case 4:
                  _context.next = 6;
                  return whenDOMReady();

                case 6:
                  _context.next = 8;
                  return applyTheme(getTheme$1());

                case 8:
                  OpenUI5Support && OpenUI5Support.attachListeners();
                  insertFontFace();
                  _context.next = 12;
                  return whenPolyfillLoaded();

                case 12:
                  resolve();

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      return bootPromise;
    };

    var isDescendantOf = function isDescendantOf(klass, baseKlass) {
      var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (typeof klass !== "function" || typeof baseKlass !== "function") {
        return false;
      }

      if (inclusive && klass === baseKlass) {
        return true;
      }

      var parent = klass;

      do {
        parent = Object.getPrototypeOf(parent);
      } while (parent !== null && parent !== baseKlass);

      return parent === baseKlass;
    };

    var kebabToCamelMap = new Map();
    var camelToKebabMap = new Map();

    var kebabToCamelCase = function kebabToCamelCase(string) {
      if (!kebabToCamelMap.has(string)) {
        var result = toCamelCase(string.split("-"));
        kebabToCamelMap.set(string, result);
      }

      return kebabToCamelMap.get(string);
    };

    var camelToKebabCase = function camelToKebabCase(string) {
      if (!camelToKebabMap.has(string)) {
        var result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        camelToKebabMap.set(string, result);
      }

      return camelToKebabMap.get(string);
    };

    var toCamelCase = function toCamelCase(parts) {
      return parts.map(function (string, index) {
        return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }).join("");
    };

    var isSlot = function isSlot(el) {
      return el && el instanceof HTMLElement && el.localName === "slot";
    };

    /**
     *
     * @class
     * @public
     */

    var UI5ElementMetadata =
    /*#__PURE__*/
    function () {
      function UI5ElementMetadata(metadata) {
        _classCallCheck(this, UI5ElementMetadata);

        this.metadata = metadata;
      }
      /**
       * Only intended for use by UI5Element.js
       * @protected
       */


      _createClass(UI5ElementMetadata, [{
        key: "getTag",

        /**
         * Returns the tag of the UI5 Element
         * @public
         */
        value: function getTag() {
          return this.metadata.tag;
        }
        /**
         * Determines whether a property should have an attribute counterpart
         * @public
         * @param propName
         * @returns {boolean}
         */

      }, {
        key: "hasAttribute",
        value: function hasAttribute(propName) {
          var propData = this.getProperties()[propName];
          return propData.type !== Object && !propData.noAttribute;
        }
        /**
         * Returns an array with the properties of the UI5 Element (in camelCase)
         * @public
         * @returns {string[]}
         */

      }, {
        key: "getPropertiesList",
        value: function getPropertiesList() {
          return Object.keys(this.getProperties());
        }
        /**
         * Returns an array with the attributes of the UI5 Element (in kebab-case)
         * @public
         * @returns {string[]}
         */

      }, {
        key: "getAttributesList",
        value: function getAttributesList() {
          return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
        }
        /**
         * Returns an object with key-value pairs of slots and their metadata definitions
         * @public
         */

      }, {
        key: "getSlots",
        value: function getSlots() {
          return this.metadata.slots || {};
        }
        /**
         * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
         * @returns {boolean}
         */

      }, {
        key: "canSlotText",
        value: function canSlotText() {
          var defaultSlot = this.getSlots()["default"];
          return defaultSlot && defaultSlot.type === Node;
        }
        /**
         * Determines whether this UI5 Element supports any slots
         * @public
         */

      }, {
        key: "hasSlots",
        value: function hasSlots() {
          return !!Object.entries(this.getSlots()).length;
        }
        /**
         * Determines whether this UI5 Element supports any slots with "individualSlots: true"
         * @public
         */

      }, {
        key: "hasIndividualSlots",
        value: function hasIndividualSlots() {
          return this.slotsAreManaged() && Object.entries(this.getSlots()).some(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                _slotName = _ref2[0],
                slotData = _ref2[1];

            return slotData.individualSlots;
          });
        }
        /**
         * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
         * @public
         */

      }, {
        key: "slotsAreManaged",
        value: function slotsAreManaged() {
          return !!this.metadata.managedSlots;
        }
        /**
         * Returns an object with key-value pairs of properties and their metadata definitions
         * @public
         */

      }, {
        key: "getProperties",
        value: function getProperties() {
          return this.metadata.properties || {};
        }
        /**
         * Returns an object with key-value pairs of events and their metadata definitions
         * @public
         */

      }, {
        key: "getEvents",
        value: function getEvents() {
          return this.metadata.events || {};
        }
      }], [{
        key: "validatePropertyValue",
        value: function validatePropertyValue(value, propData) {
          var isMultiple = propData.multiple;

          if (isMultiple) {
            return value.map(function (propValue) {
              return validateSingleProperty(propValue, propData);
            });
          }

          return validateSingleProperty(value, propData);
        }
        /**
         * Only intended for use by UI5Element.js
         * @protected
         */

      }, {
        key: "validateSlotValue",
        value: function validateSlotValue(value, slotData) {
          return validateSingleSlot(value, slotData);
        }
      }]);

      return UI5ElementMetadata;
    }();

    var validateSingleProperty = function validateSingleProperty(value, propData) {
      var propertyType = propData.type;

      if (propertyType === Boolean) {
        return typeof value === "boolean" ? value : false;
      }

      if (propertyType === String) {
        return typeof value === "string" || typeof value === "undefined" || value === null ? value : value.toString();
      }

      if (propertyType === Object) {
        return _typeof(value) === "object" ? value : propData.defaultValue;
      }

      if (isDescendantOf(propertyType, DataType)) {
        return propertyType.isValid(value) ? value : propData.defaultValue;
      }
    };

    var validateSingleSlot = function validateSingleSlot(value, slotData) {
      if (value === null) {
        return value;
      }

      var getSlottedNodes = function getSlottedNodes(el) {
        if (isSlot(el)) {
          return el.assignedNodes({
            flatten: true
          }).filter(function (item) {
            return item instanceof HTMLElement;
          });
        }

        return [el];
      };

      var slottedNodes = getSlottedNodes(value);
      slottedNodes.forEach(function (el) {
        if (!(el instanceof slotData.type)) {
          throw new Error("".concat(el, " is not of type ").concat(slotData.type));
        }
      });
      return value;
    };

    var getStaticAreaInstance = function getStaticAreaInstance() {
      var staticArea = document.querySelector("ui5-static-area");

      if (staticArea) {
        return staticArea;
      } // Create static area if it is not present


      var bodyElement = document.body;
      staticArea = document.createElement("ui5-static-area");
      return bodyElement.insertBefore(staticArea, bodyElement.firstChild);
    };

    var removeStaticArea = function removeStaticArea() {
      getStaticAreaInstance().destroy();
    };

    var StaticAreaElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(StaticAreaElement, _HTMLElement);

      function StaticAreaElement() {
        _classCallCheck(this, StaticAreaElement);

        return _possibleConstructorReturn(this, _getPrototypeOf(StaticAreaElement).call(this));
      }

      _createClass(StaticAreaElement, [{
        key: "destroy",
        value: function destroy() {
          var staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
          staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
        }
      }, {
        key: "isUI5Element",
        get: function get() {
          return true;
        }
      }]);

      return StaticAreaElement;
    }(_wrapNativeSuper(HTMLElement));

    if (!customElements.get("ui5-static-area")) {
      customElements.define("ui5-static-area", StaticAreaElement);
    }

    var RenderQueue =
    /*#__PURE__*/
    function () {
      function RenderQueue() {
        _classCallCheck(this, RenderQueue);

        this.list = []; // Used to store the web components in order

        this.promises = new Map(); // Used to store promises for web component rendering
      }

      _createClass(RenderQueue, [{
        key: "add",
        value: function add(webComponent) {
          if (this.promises.has(webComponent)) {
            return this.promises.get(webComponent);
          }

          var deferredResolve;
          var promise = new Promise(function (resolve) {
            deferredResolve = resolve;
          });
          promise._deferredResolve = deferredResolve;
          this.list.push(webComponent);
          this.promises.set(webComponent, promise);
          return promise;
        }
      }, {
        key: "shift",
        value: function shift() {
          var webComponent = this.list.shift();

          if (webComponent) {
            var promise = this.promises.get(webComponent);
            this.promises["delete"](webComponent);
            return {
              webComponent: webComponent,
              promise: promise
            };
          }
        }
      }, {
        key: "getList",
        value: function getList() {
          return this.list;
        }
      }, {
        key: "isAdded",
        value: function isAdded(webComponent) {
          return this.promises.has(webComponent);
        }
      }]);

      return RenderQueue;
    }();

    var Definitions = new Set();
    var Failures = new Set();
    var failureTimeout;

    var registerTag = function registerTag(tag) {
      Definitions.add(tag);
    };

    var isTagRegistered = function isTagRegistered(tag) {
      return Definitions.has(tag);
    };

    var getAllRegisteredTags = function getAllRegisteredTags() {
      var arr = [];
      Definitions.forEach(function (tag) {
        arr.push(tag);
      });
      return arr;
    };

    var recordTagRegistrationFailure = function recordTagRegistrationFailure(tag) {
      Failures.add(tag);

      if (!failureTimeout) {
        failureTimeout = setTimeout(function () {
          displayFailedRegistrations();
          failureTimeout = undefined;
        }, 1000);
      }
    };

    var displayFailedRegistrations = function displayFailedRegistrations() {
      var tags = []; // IE only supports Set.prototype.forEach

      Failures.forEach(function (tag) {
        tags.push(tag);
      });
      console.warn("The following tags have already been defined by a different UI5 Web Components version: ".concat(tags.join(", "))); // eslint-disable-line

      Failures.clear();
    };

    var MAX_RERENDER_COUNT = 10; // Tells whether a render task is currently scheduled

    var renderTaskId; // Queue for invalidated web components

    var invalidatedWebComponents = new RenderQueue();
    var renderTaskPromise, renderTaskPromiseResolve, taskResult;
    var mutationObserverTimer;
    /**
     * Class that manages the rendering/re-rendering of web components
     * This is always asynchronous
     */

    var RenderScheduler =
    /*#__PURE__*/
    function () {
      function RenderScheduler() {
        _classCallCheck(this, RenderScheduler);

        throw new Error("Static class");
      }
      /**
       * Queues a web component for re-rendering
       * @param webComponent
       */


      _createClass(RenderScheduler, null, [{
        key: "renderDeferred",
        value: function renderDeferred(webComponent) {
          // Enqueue the web component
          var res = invalidatedWebComponents.add(webComponent); // Schedule a rendering task

          RenderScheduler.scheduleRenderTask();
          return res;
        }
      }, {
        key: "renderImmediately",
        value: function renderImmediately(webComponent) {
          // Enqueue the web component
          var res = invalidatedWebComponents.add(webComponent); // Immediately start a render task

          RenderScheduler.runRenderTask();
          return res;
        }
        /**
         * Schedules a rendering task, if not scheduled already
         */

      }, {
        key: "scheduleRenderTask",
        value: function scheduleRenderTask() {
          if (!renderTaskId) {
            // renderTaskId = window.setTimeout(RenderScheduler.renderWebComponents, 3000); // Task
            // renderTaskId = Promise.resolve().then(RenderScheduler.renderWebComponents); // Micro task
            renderTaskId = window.requestAnimationFrame(RenderScheduler.renderWebComponents); // AF
          }
        }
      }, {
        key: "runRenderTask",
        value: function runRenderTask() {
          if (!renderTaskId) {
            renderTaskId = 1; // prevent another rendering task from being scheduled, all web components should use this task

            RenderScheduler.renderWebComponents();
          }
        }
      }, {
        key: "renderWebComponents",
        value: function renderWebComponents() {
          // console.log("------------- NEW RENDER TASK ---------------");
          var webComponentInfo, webComponent, promise;
          var renderStats = new Map();

          while (webComponentInfo = invalidatedWebComponents.shift()) {
            // eslint-disable-line
            webComponent = webComponentInfo.webComponent;
            promise = webComponentInfo.promise;
            var timesRerendered = renderStats.get(webComponent) || 0;

            if (timesRerendered > MAX_RERENDER_COUNT) {
              // console.warn("WARNING RERENDER", webComponent);
              throw new Error("Web component re-rendered too many times this task, max allowed is: ".concat(MAX_RERENDER_COUNT));
            }

            webComponent._render();

            promise._deferredResolve();

            renderStats.set(webComponent, timesRerendered + 1);
          } // wait for Mutation observer just in case


          if (!mutationObserverTimer) {
            mutationObserverTimer = setTimeout(function () {
              mutationObserverTimer = undefined;

              if (invalidatedWebComponents.getList().length === 0) {
                RenderScheduler._resolveTaskPromise();
              }
            }, 200);
          }

          renderTaskId = undefined;
        }
        /**
         * return a promise that will be resolved once all invalidated web components are rendered
         */

      }, {
        key: "whenDOMUpdated",
        value: function whenDOMUpdated() {
          if (renderTaskPromise) {
            return renderTaskPromise;
          }

          renderTaskPromise = new Promise(function (resolve) {
            renderTaskPromiseResolve = resolve;
            window.requestAnimationFrame(function () {
              if (invalidatedWebComponents.getList().length === 0) {
                renderTaskPromise = undefined;
                resolve();
              }
            });
          });
          return renderTaskPromise;
        }
      }, {
        key: "whenAllCustomElementsAreDefined",
        value: function whenAllCustomElementsAreDefined() {
          var definedPromises = getAllRegisteredTags().map(function (tag) {
            return customElements.whenDefined(tag);
          });
          return Promise.all(definedPromises);
        }
      }, {
        key: "whenFinished",
        value: function () {
          var _whenFinished = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return RenderScheduler.whenAllCustomElementsAreDefined();

                  case 2:
                    _context.next = 4;
                    return RenderScheduler.whenDOMUpdated();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function whenFinished() {
            return _whenFinished.apply(this, arguments);
          }

          return whenFinished;
        }()
      }, {
        key: "_resolveTaskPromise",
        value: function _resolveTaskPromise() {
          if (invalidatedWebComponents.getList().length > 0) {
            // More updates are pending. Resolve will be called again
            return;
          }

          if (renderTaskPromiseResolve) {
            renderTaskPromiseResolve.call(this, taskResult);
            renderTaskPromiseResolve = undefined;
            renderTaskPromise = undefined;
          }
        }
      }]);

      return RenderScheduler;
    }();

    /**
     * @class
     * @author SAP SE
     * @private
     * Defines and takes care of ui5-static-are-item items
     */

    var StaticAreaItem =
    /*#__PURE__*/
    function () {
      function StaticAreaItem(_ui5ElementContext) {
        _classCallCheck(this, StaticAreaItem);

        this.ui5ElementContext = _ui5ElementContext;
        this._rendered = false;
      }

      _createClass(StaticAreaItem, [{
        key: "isRendered",
        value: function isRendered() {
          return this._rendered;
        }
        /**
         * @protected
         */

      }, {
        key: "_updateFragment",
        value: function _updateFragment() {
          var renderResult = this.ui5ElementContext.constructor.staticAreaTemplate(this.ui5ElementContext),
              stylesToAdd = window.ShadyDOM ? false : this.ui5ElementContext.constructor.staticAreaStyles;

          if (!this.staticAreaItemDomRef) {
            // Initial rendering of fragment
            this.staticAreaItemDomRef = document.createElement("ui5-static-area-item");
            this.staticAreaItemDomRef.attachShadow({
              mode: "open"
            });
            this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

            getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
            this._rendered = true;
          }

          this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, {
            eventContext: this.ui5ElementContext
          });
        }
        /**
         * @protected
         */

      }, {
        key: "_removeFragmentFromStaticArea",
        value: function _removeFragmentFromStaticArea() {
          if (!this.staticAreaItemDomRef) {
            return;
          }

          var staticArea = getStaticAreaInstance();
          staticArea.removeChild(this.staticAreaItemDomRef);
          this.staticAreaItemDomRef = null; // remove static area

          if (staticArea.childElementCount < 1) {
            removeStaticArea();
          }
        }
        /**
         * @protected
         */

      }, {
        key: "_updateContentDensity",
        value: function _updateContentDensity(isCompact) {
          if (!this.staticAreaItemDomRef) {
            return;
          }

          if (isCompact) {
            this.staticAreaItemDomRef.classList.add("sapUiSizeCompact");
            this.staticAreaItemDomRef.classList.add("ui5-content-density-compact");
          } else {
            this.staticAreaItemDomRef.classList.remove("sapUiSizeCompact");
            this.staticAreaItemDomRef.classList.remove("ui5-content-density-compact");
          }
        }
        /**
         * @protected
         * Returns reference to the DOM element where the current fragment is added.
         */

      }, {
        key: "getDomRef",
        value: function () {
          var _getDomRef = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!this._rendered || !this.staticAreaItemDomRef) {
                      this._updateFragment();
                    }

                    _context.next = 3;
                    return RenderScheduler.whenDOMUpdated();

                  case 3:
                    return _context.abrupt("return", this.staticAreaItemDomRef.shadowRoot);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getDomRef() {
            return _getDomRef.apply(this, arguments);
          }

          return getDomRef;
        }()
      }]);

      return StaticAreaItem;
    }();

    var StaticAreaItemElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(StaticAreaItemElement, _HTMLElement);

      function StaticAreaItemElement() {
        _classCallCheck(this, StaticAreaItemElement);

        return _possibleConstructorReturn(this, _getPrototypeOf(StaticAreaItemElement).call(this));
      }

      _createClass(StaticAreaItemElement, [{
        key: "isUI5Element",
        get: function get() {
          return true;
        }
      }]);

      return StaticAreaItemElement;
    }(_wrapNativeSuper(HTMLElement));

    if (!customElements.get("ui5-static-area-item")) {
      customElements.define("ui5-static-area-item", StaticAreaItemElement);
    }

    window.sap = window.sap || {};
    window.sap.ui = window.sap.ui || {};
    window.sap.ui._UI5WebComponents = window.sap.ui._UI5WebComponents || {
      autoId: 0 // for the unique _id of each UI5Element

    };
    var SharedResources = window.sap.ui._UI5WebComponents;

    // Shorthands
    var w = window; // Map of observer objects per dom node

    var observers = new WeakMap();
    /**
     * Implements universal DOM node observation methods.
     */

    var DOMObserver =
    /*#__PURE__*/
    function () {
      function DOMObserver() {
        _classCallCheck(this, DOMObserver);

        throw new Error("Static class");
      }
      /**
       * This function abstracts out mutation observer usage inside shadow DOM.
       * For native shadow DOM the native mutation observer is used.
       * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
       *
       * @throws Exception
       * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
       *
       * @param node
       * @param callback
       * @param options - Only used for the native mutation observer
       */


      _createClass(DOMObserver, null, [{
        key: "observeDOMNode",
        value: function observeDOMNode(node, callback, options) {
          var observerObject = observers.get(node);

          if (observerObject) {
            throw new Error("A mutation/ShadyDOM observer is already assigned to this node.");
          }

          if (w.ShadyDOM) {
            observerObject = w.ShadyDOM.observeChildren(node, callback);
          } else {
            observerObject = new MutationObserver(callback);
            observerObject.observe(node, options);
          }

          observers.set(node, observerObject);
        }
        /**
         * De-registers the mutation observer, depending on its type
         * @param node
         */

      }, {
        key: "unobserveDOMNode",
        value: function unobserveDOMNode(node) {
          var observerObject = observers.get(node);

          if (!observerObject) {
            return;
          }

          if (observerObject instanceof MutationObserver) {
            observerObject.disconnect();
          } else {
            w.ShadyDOM.unobserveChildren(observerObject);
          }

          observers["delete"](node);
        }
      }]);

      return DOMObserver;
    }();

    var excludeList = ["value-changed"];

    var shouldFireOriginalEvent = function shouldFireOriginalEvent(eventName) {
      return excludeList.includes(eventName);
    };

    var noConflict;

    var shouldNotFireOriginalEvent = function shouldNotFireOriginalEvent(eventName) {
      var nc = getNoConflict$1();
      return !(nc.events && nc.events.includes && nc.events.includes(eventName));
    };

    var getNoConflict$1 = function getNoConflict$1() {
      if (noConflict === undefined) {
        noConflict = getNoConflict();
      }

      return noConflict;
    };

    var skipOriginalEvent = function skipOriginalEvent(eventName) {
      var nc = getNoConflict$1(); // Always fire these events

      if (shouldFireOriginalEvent(eventName)) {
        return false;
      } // Read from the configuration


      if (nc === true) {
        return true;
      }

      return !shouldNotFireOriginalEvent(eventName);
    };

    var setNoConflict = function setNoConflict(noConflictData) {
      noConflict = noConflictData;
    };

    var customCSSFor = {};

    var getCustomCSS = function getCustomCSS(tag) {
      return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
    };

    var getEffectiveStyle = function getEffectiveStyle(ElementClass) {
      var tag = ElementClass.getMetadata().getTag();
      var customStyle = getCustomCSS(tag) || "";
      var componentStyles = ElementClass.styles;

      if (Array.isArray(componentStyles)) {
        componentStyles = componentStyles.join(" ");
      }

      return "".concat(componentStyles, " ").concat(customStyle);
    };

    var constructableStyleMap = new Map();
    /**
     * Returns (and caches) a constructable style sheet for a web component class
     * Note: Chrome
     * @param ElementClass
     * @returns {*}
     */

    var getConstructableStyle = function getConstructableStyle(ElementClass) {
      var tagName = ElementClass.getMetadata().getTag();
      var styleContent = getEffectiveStyle(ElementClass);

      if (constructableStyleMap.has(tagName)) {
        return constructableStyleMap.get(tagName);
      }

      var style = new CSSStyleSheet();
      style.replaceSync(styleContent);
      constructableStyleMap.set(tagName, style);
      return style;
    };

    var findClosingParenthesisPos = function findClosingParenthesisPos(str, openingParenthesisPos) {
      var opened = 1;

      for (var pos = openingParenthesisPos + 1; pos < str.length; pos++) {
        var _char = str.charAt(pos);

        if (_char === "(") {
          opened++;
        } else if (_char === ")") {
          opened--;
        }

        if (opened === 0) {
          return pos;
        }
      }
    };

    var replaceSelector = function replaceSelector(str, selector, selectorStartPos, replacement) {
      var charAfterSelectorPos = selectorStartPos + selector.length;
      var charAfterSelector = str.charAt(charAfterSelectorPos);
      var upToSelector = str.substring(0, selectorStartPos) + replacement;

      if (charAfterSelector === "(") {
        var closingParenthesisPos = findClosingParenthesisPos(str, charAfterSelectorPos);
        return upToSelector + str.substring(charAfterSelectorPos + 1, closingParenthesisPos) + str.substring(closingParenthesisPos + 1);
      }

      return upToSelector + str.substring(charAfterSelectorPos);
    };
    /**
     * :host => ui5-button
     * :host([expr]) => ui5-button[expr]
     * ::slotted(expr) => expr
     * @param str - source string
     * @param selector - :host or ::slotted
     * @param replacement - normally tag name
     * @returns {*}
     */


    var replaceSelectors = function replaceSelectors(str, selector, replacement) {
      var selectorStartPos = str.indexOf(selector);

      while (selectorStartPos !== -1) {
        str = replaceSelector(str, selector, selectorStartPos, replacement);
        selectorStartPos = str.indexOf(selector);
      }

      return str;
    };

    var adaptLinePart = function adaptLinePart(line, tag) {
      line = line.trim();
      line = replaceSelectors(line, "::slotted", ""); // first remove all ::slotted() occurrences
      // Host selector - replace it

      if (line.startsWith(":host")) {
        return replaceSelector(line, ":host", 0, tag);
      } // Leave out @keyframes and keyframe values (0%, 100%, etc...)
      // csso shortens '100%' -> 'to', make sure to leave it untouched


      if (line.match(/^[@0-9]/) || line === "to" || line === "to{") {
        return line;
      } // IE specific selector (directly written with the tag) - keep it


      if (line.match(new RegExp("^".concat(tag, "[^a-zA-Z0-9-]")))) {
        return line;
      } // No host and no tag in the beginning of the selector - prepend the tag


      return "".concat(tag, " ").concat(line);
    };

    var adaptCSSForIE = function adaptCSSForIE(str, tag) {
      str = str.replace(/\n/g, " ");
      str = str.replace(/([{}])/g, "$1\n");
      var result = "";
      var lines = str.split("\n");
      lines.forEach(function (line) {
        var mustProcess = line.match(/{$/); // Only work on lines that end on {, otherwise just append to result

        if (mustProcess) {
          var lineParts = line.split(",");
          var processedLineParts = lineParts.map(function (linePart) {
            return adaptLinePart(linePart, tag);
          });
          line = processedLineParts.join(",");
        }

        result = "".concat(result).concat(line);
      });
      return result;
    };

    var IEStyleSet = new Set();

    var getStaticStyle = function getStaticStyle(ElementClass) {
      var componentStaticStyles = ElementClass.staticAreaStyles;

      if (Array.isArray(componentStaticStyles)) {
        componentStaticStyles = componentStaticStyles.join(" ");
      }

      return componentStaticStyles;
    };
    /**
     * Creates the needed CSS for a web component class in the head tag
     * Note: IE11, Edge
     * @param ElementClass
     */


    var createComponentStyleTag = function createComponentStyleTag(ElementClass) {
      var tag = ElementClass.getMetadata().getTag();

      if (IEStyleSet.has(tag)) {
        return;
      }

      var cssContent = getEffectiveStyle(ElementClass);
      cssContent = adaptCSSForIE(cssContent, tag); // Append static CSS, if any, for IE

      var staticCssContent = getStaticStyle(ElementClass);

      if (staticCssContent) {
        staticCssContent = adaptCSSForIE(staticCssContent, "ui5-static-area-item");
        cssContent = "".concat(cssContent, " ").concat(staticCssContent);
      }

      createStyleInHead(cssContent, {
        "data-ui5-element-styles": tag,
        "disabled": "disabled"
      });

      if (ponyfillNeeded()) {
        schedulePonyfill();
      }

      IEStyleSet.add(tag);
    };

    var Integer =
    /*#__PURE__*/
    function (_DataType) {
      _inherits(Integer, _DataType);

      function Integer() {
        _classCallCheck(this, Integer);

        return _possibleConstructorReturn(this, _getPrototypeOf(Integer).apply(this, arguments));
      }

      _createClass(Integer, null, [{
        key: "isValid",
        value: function isValid(value) {
          return Number.isInteger(value);
        }
      }]);

      return Integer;
    }(DataType);

    // Note: disabled is present in IE so we explicitly allow it here.
    // Others, such as ariaLabel, we explicitly override, so valid too
    var whitelist = ["disabled", "ariaLabel"];
    /**
     * Checks whether a property name is valid (does not collide with existing DOM API properties)
     *
     * @param name
     * @returns {boolean}
     */

    var isValidPropertyName = function isValidPropertyName(name) {
      if (whitelist.includes(name)) {
        return true;
      }

      var classes = [HTMLElement, Element, Node];
      return !classes.some(function (klass) {
        return klass.prototype.hasOwnProperty(name);
      }); // eslint-disable-line
    };

    var metadata = {
      events: {
        _propertyChange: {}
      }
    };
    var elementTimeouts = new Map();
    var GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
    /**
     * Base class for all UI5 Web Components
     *
     * @class
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.base.UI5Element
     * @extends HTMLElement
     * @public
     */

    var UI5Element =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(UI5Element, _HTMLElement);

      function UI5Element() {
        var _this;

        _classCallCheck(this, UI5Element);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(UI5Element).call(this));

        _this._generateId();

        _this._initializeState();

        _this._upgradeAllProperties();

        _this._initializeContainers();

        _this._upToDate = false;
        var deferredResolve;
        _this._domRefReadyPromise = new Promise(function (resolve) {
          deferredResolve = resolve;
        });
        _this._domRefReadyPromise._deferredResolve = deferredResolve;
        _this._monitoredChildProps = new Map();
        _this._firePropertyChange = false;
        return _this;
      }
      /**
       * @private
       */


      _createClass(UI5Element, [{
        key: "_generateId",
        value: function _generateId() {
          this._id = "ui5wc_".concat(++SharedResources.autoId);
        }
        /**
         * @private
         */

      }, {
        key: "_initializeContainers",
        value: function _initializeContainers() {
          var needsShadowDOM = this.constructor._needsShadowDOM();

          var needsStaticArea = this.constructor._needsStaticArea(); // Init Shadow Root


          if (needsShadowDOM) {
            this.attachShadow({
              mode: "open"
            }); // IE11, Edge

            if (window.ShadyDOM) {
              createComponentStyleTag(this.constructor);
            } // Chrome


            if (document.adoptedStyleSheets) {
              var style = getConstructableStyle(this.constructor);
              this.shadowRoot.adoptedStyleSheets = [style];
            }
          } // Init StaticAreaItem only if needed


          if (needsStaticArea) {
            this.staticAreaItem = new StaticAreaItem(this);
          }
        }
        /**
         * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
         * @private
         */

      }, {
        key: "connectedCallback",
        value: function () {
          var _connectedCallback = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var needsShadowDOM, slotsAreManaged;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    needsShadowDOM = this.constructor._needsShadowDOM();
                    slotsAreManaged = this.constructor.getMetadata().slotsAreManaged(); // Render the Shadow DOM

                    if (!needsShadowDOM) {
                      _context.next = 14;
                      break;
                    }

                    if (!slotsAreManaged) {
                      _context.next = 7;
                      break;
                    }

                    // always register the observer before yielding control to the main thread (await)
                    this._startObservingDOMChildren();

                    _context.next = 7;
                    return this._processChildren();

                  case 7:
                    if (this.shadowRoot) {
                      _context.next = 10;
                      break;
                    }

                    _context.next = 10;
                    return Promise.resolve();

                  case 10:
                    _context.next = 12;
                    return RenderScheduler.renderImmediately(this);

                  case 12:
                    this._domRefReadyPromise._deferredResolve();

                    if (typeof this.onEnterDOM === "function") {
                      this.onEnterDOM();
                    }

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function connectedCallback() {
            return _connectedCallback.apply(this, arguments);
          }

          return connectedCallback;
        }()
        /**
         * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
         * @private
         */

      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          var needsShadowDOM = this.constructor._needsShadowDOM();

          var needsStaticArea = this.constructor._needsStaticArea();

          var slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

          if (needsShadowDOM) {
            if (slotsAreManaged) {
              this._stopObservingDOMChildren();
            }

            if (typeof this.onExitDOM === "function") {
              this.onExitDOM();
            }
          }

          if (needsStaticArea) {
            this.staticAreaItem._removeFragmentFromStaticArea();
          }
        }
        /**
         * @private
         */

      }, {
        key: "_startObservingDOMChildren",
        value: function _startObservingDOMChildren() {
          var shouldObserveChildren = this.constructor.getMetadata().hasSlots();

          if (!shouldObserveChildren) {
            return;
          }

          var canSlotText = this.constructor.getMetadata().canSlotText();
          var mutationObserverOptions = {
            childList: true,
            subtree: canSlotText,
            characterData: true
          };
          DOMObserver.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
        }
        /**
         * @private
         */

      }, {
        key: "_stopObservingDOMChildren",
        value: function _stopObservingDOMChildren() {
          DOMObserver.unobserveDOMNode(this);
        }
        /**
         * Note: this method is also manually called by "compatibility/patchNodeValue.js"
         * @private
         */

      }, {
        key: "_processChildren",
        value: function () {
          var _processChildren2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var hasSlots;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    hasSlots = this.constructor.getMetadata().hasSlots();

                    if (!hasSlots) {
                      _context2.next = 4;
                      break;
                    }

                    _context2.next = 4;
                    return this._updateSlots();

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function _processChildren() {
            return _processChildren2.apply(this, arguments);
          }

          return _processChildren;
        }()
        /**
         * @private
         */

      }, {
        key: "_updateSlots",
        value: function () {
          var _updateSlots2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            var _this2 = this;

            var slotsMap, canSlotText, domChildren, _i, _Object$entries, _Object$entries$_i, slotName, slotData, autoIncrementMap, slottedChildrenMap, allChildrenUpgraded;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    slotsMap = this.constructor.getMetadata().getSlots();
                    canSlotText = this.constructor.getMetadata().canSlotText();
                    domChildren = Array.from(canSlotText ? this.childNodes : this.children); // Init the _state object based on the supported slots

                    for (_i = 0, _Object$entries = Object.entries(slotsMap); _i < _Object$entries.length; _i++) {
                      _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), slotName = _Object$entries$_i[0], slotData = _Object$entries$_i[1];

                      // eslint-disable-line
                      this._clearSlot(slotName, slotData);
                    }

                    autoIncrementMap = new Map();
                    slottedChildrenMap = new Map();
                    allChildrenUpgraded = domChildren.map(
                    /*#__PURE__*/
                    function () {
                      var _ref = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee3(child, idx) {
                        var slotName, slotData, validValues, nextIndex, localName, isCustomElement, isDefined, whenDefinedPromise, timeoutPromise, propertyName;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                // Determine the type of the child (mainly by the slot attribute)
                                slotName = _this2.constructor._getSlotName(child);
                                slotData = slotsMap[slotName]; // Check if the slotName is supported

                                if (!(slotData === undefined)) {
                                  _context3.next = 6;
                                  break;
                                }

                                validValues = Object.keys(slotsMap).join(", ");
                                console.warn("Unknown slotName: ".concat(slotName, ", ignoring"), child, "Valid values are: ".concat(validValues)); // eslint-disable-line

                                return _context3.abrupt("return");

                              case 6:
                                // For children that need individual slots, calculate them
                                if (slotData.individualSlots) {
                                  nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
                                  autoIncrementMap.set(slotName, nextIndex);
                                  child._individualSlot = "".concat(slotName, "-").concat(nextIndex);
                                } // Await for not-yet-defined custom elements


                                if (!(child instanceof HTMLElement)) {
                                  _context3.next = 19;
                                  break;
                                }

                                localName = child.localName;
                                isCustomElement = localName.includes("-");

                                if (!isCustomElement) {
                                  _context3.next = 19;
                                  break;
                                }

                                isDefined = window.customElements.get(localName);

                                if (isDefined) {
                                  _context3.next = 18;
                                  break;
                                }

                                whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet

                                timeoutPromise = elementTimeouts.get(localName);

                                if (!timeoutPromise) {
                                  timeoutPromise = new Promise(function (resolve) {
                                    return setTimeout(resolve, 1000);
                                  });
                                  elementTimeouts.set(localName, timeoutPromise);
                                }

                                _context3.next = 18;
                                return Promise.race([whenDefinedPromise, timeoutPromise]);

                              case 18:
                                window.customElements.upgrade(child);

                              case 19:
                                child = _this2.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

                                if (child.isUI5Element && slotData.listenFor) {
                                  _this2._attachChildPropertyUpdated(child, slotData.listenFor);
                                }

                                if (isSlot(child)) {
                                  _this2._attachSlotChange(child);
                                }

                                propertyName = slotData.propertyName || slotName;

                                if (slottedChildrenMap.has(propertyName)) {
                                  slottedChildrenMap.get(propertyName).push({
                                    child: child,
                                    idx: idx
                                  });
                                } else {
                                  slottedChildrenMap.set(propertyName, [{
                                    child: child,
                                    idx: idx
                                  }]);
                                }

                              case 24:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));

                      return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                      };
                    }());
                    _context4.next = 9;
                    return Promise.all(allChildrenUpgraded);

                  case 9:
                    // Distribute the child in the _state object, keeping the Light DOM order,
                    // not the order elements are defined.
                    slottedChildrenMap.forEach(function (children, slot) {
                      _this2._state[slot] = children.sort(function (a, b) {
                        return a.idx - b.idx;
                      }).map(function (_) {
                        return _.child;
                      });
                    });

                    this._invalidate("slots");

                  case 11:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function _updateSlots() {
            return _updateSlots2.apply(this, arguments);
          }

          return _updateSlots;
        }()
        /**
         * Removes all children from the slot and detaches listeners, if any
         * @private
         */

      }, {
        key: "_clearSlot",
        value: function _clearSlot(slotName, slotData) {
          var _this3 = this;

          var propertyName = slotData.propertyName || slotName;
          var children = this._state[propertyName];

          if (!Array.isArray(children)) {
            children = [children];
          }

          children.forEach(function (child) {
            if (child && child.isUI5Element) {
              _this3._detachChildPropertyUpdated(child);
            }

            if (isSlot(child)) {
              _this3._detachSlotChange(child);
            }
          });
          this._state[propertyName] = [];

          this._invalidate(propertyName, []);
        }
        /**
         * Do not override this method in derivatives of UI5Element
         * @private
         */

      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name, oldValue, newValue) {
          var properties = this.constructor.getMetadata().getProperties();
          var realName = name.replace(/^ui5-/, "");
          var nameInCamelCase = kebabToCamelCase(realName);

          if (properties.hasOwnProperty(nameInCamelCase)) {
            // eslint-disable-line
            var propertyTypeClass = properties[nameInCamelCase].type;

            if (propertyTypeClass === Boolean) {
              newValue = newValue !== null;
            }

            if (propertyTypeClass === Integer) {
              newValue = parseInt(newValue);
            }

            this[nameInCamelCase] = newValue;
          }
        }
        /**
         * @private
         */

      }, {
        key: "_updateAttribute",
        value: function _updateAttribute(name, newValue) {
          if (!this.constructor.getMetadata().hasAttribute(name)) {
            return;
          }

          if (_typeof(newValue) === "object") {
            return;
          }

          var attrName = camelToKebabCase(name);
          var attrValue = this.getAttribute(attrName);

          if (typeof newValue === "boolean") {
            if (newValue === true && attrValue === null) {
              this.setAttribute(attrName, "");
            } else if (newValue === false && attrValue !== null) {
              this.removeAttribute(attrName);
            }
          } else if (attrValue !== newValue) {
            this.setAttribute(attrName, newValue);
          }
        }
        /**
         * @private
         */

      }, {
        key: "_upgradeProperty",
        value: function _upgradeProperty(prop) {
          if (this.hasOwnProperty(prop)) {
            // eslint-disable-line
            var value = this[prop];
            delete this[prop];
            this[prop] = value;
          }
        }
        /**
         * @private
         */

      }, {
        key: "_upgradeAllProperties",
        value: function _upgradeAllProperties() {
          var allProps = this.constructor.getMetadata().getPropertiesList();
          allProps.forEach(this._upgradeProperty, this);
        }
        /**
         * @private
         */

      }, {
        key: "_initializeState",
        value: function _initializeState() {
          var defaultState = this.constructor._getDefaultState();

          this._state = Object.assign({}, defaultState);
        }
        /**
         * @private
         */

      }, {
        key: "_attachChildPropertyUpdated",
        value: function _attachChildPropertyUpdated(child, listenFor) {
          var childMetadata = child.constructor.getMetadata(),
              slotName = this.constructor._getSlotName(child),
              // all slotted children have the same configuration
          childProperties = childMetadata.getProperties();

          var observedProps = [],
              notObservedProps = [];

          if (Array.isArray(listenFor)) {
            observedProps = listenFor;
          } else {
            observedProps = Array.isArray(listenFor.props) ? listenFor.props : Object.keys(childProperties);
            notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
          }

          if (!this._monitoredChildProps.has(slotName)) {
            this._monitoredChildProps.set(slotName, {
              observedProps: observedProps,
              notObservedProps: notObservedProps
            });
          }

          child.addEventListener("_propertyChange", this._invalidateParentOnPropertyUpdate);
          child._firePropertyChange = true;
        }
        /**
         * @private
         */

      }, {
        key: "_detachChildPropertyUpdated",
        value: function _detachChildPropertyUpdated(child) {
          child.removeEventListener("_propertyChange", this._invalidateParentOnPropertyUpdate);
          child._firePropertyChange = false;
        }
        /**
         * @private
         */

      }, {
        key: "_propertyChange",
        value: function _propertyChange(name, value) {
          this._updateAttribute(name, value);

          if (this._firePropertyChange) {
            this.dispatchEvent(new CustomEvent("_propertyChange", {
              detail: {
                name: name,
                newValue: value
              },
              composed: false,
              bubbles: true
            }));
          }
        }
        /**
         * @private
         */

      }, {
        key: "_invalidateParentOnPropertyUpdate",
        value: function _invalidateParentOnPropertyUpdate(prop) {
          // The web component to be invalidated
          var parentNode = this.parentNode;

          if (!parentNode) {
            return;
          }

          var slotName = parentNode.constructor._getSlotName(this);

          var propsMetadata = parentNode._monitoredChildProps.get(slotName);

          if (!propsMetadata) {
            return;
          }

          var observedProps = propsMetadata.observedProps,
              notObservedProps = propsMetadata.notObservedProps;

          if (observedProps.includes(prop.detail.name) && !notObservedProps.includes(prop.detail.name)) {
            parentNode._invalidate("_parent_", this);
          }
        }
        /**
         * @private
         */

      }, {
        key: "_attachSlotChange",
        value: function _attachSlotChange(child) {
          var _this4 = this;

          if (!this._invalidateOnSlotChange) {
            this._invalidateOnSlotChange = function () {
              _this4._invalidate("slotchange");
            };
          }

          child.addEventListener("slotchange", this._invalidateOnSlotChange);
        }
        /**
         * @private
         */

      }, {
        key: "_detachSlotChange",
        value: function _detachSlotChange(child) {
          child.removeEventListener("slotchange", this._invalidateOnSlotChange);
        }
        /**
         * Asynchronously re-renders an already rendered web component
         * @private
         */

      }, {
        key: "_invalidate",
        value: function _invalidate() {
          if (!this._upToDate) {
            // console.log("already invalidated", this, ...arguments);
            return;
          }

          if (this.getDomRef() && !this._suppressInvalidation) {
            this._upToDate = false; // console.log("INVAL", this, ...arguments);

            RenderScheduler.renderDeferred(this);
          }
        }
        /**
         * Do not call this method directly, only intended to be called by RenderScheduler.js
         * @protected
         */

      }, {
        key: "_render",
        value: function _render() {
          var hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots(); // suppress invalidation to prevent state changes scheduling another rendering

          this._suppressInvalidation = true;

          if (typeof this.onBeforeRendering === "function") {
            this.onBeforeRendering();
          } // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered


          if (this._onComponentStateFinalized) {
            this._onComponentStateFinalized();
          } // resume normal invalidation handling


          delete this._suppressInvalidation; // Update the shadow root with the render result
          // console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);

          this._upToDate = true;

          this._updateShadowRoot();

          if (this._shouldUpdateFragment()) {
            this.staticAreaItem._updateFragment(this);
          } // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM


          if (hasIndividualSlots) {
            this._assignIndividualSlotsToChildren();
          } // Call the onAfterRendering hook


          if (typeof this.onAfterRendering === "function") {
            this.onAfterRendering();
          }
        }
        /**
         * @private
         */

      }, {
        key: "_updateShadowRoot",
        value: function _updateShadowRoot() {
          if (!this.constructor._needsShadowDOM()) {
            return;
          }

          var styleToPrepend;
          var renderResult = this.constructor.template(this);

          if (!document.adoptedStyleSheets && !window.ShadyDOM) {
            styleToPrepend = getEffectiveStyle(this.constructor);
          }

          this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, {
            eventContext: this
          });
        }
        /**
         * @private
         */

      }, {
        key: "_assignIndividualSlotsToChildren",
        value: function _assignIndividualSlotsToChildren() {
          var domChildren = Array.from(this.children);
          domChildren.forEach(function (child) {
            if (child._individualSlot) {
              child.setAttribute("slot", child._individualSlot);
            }
          });
        }
        /**
         * @private
         */

      }, {
        key: "_waitForDomRef",
        value: function _waitForDomRef() {
          return this._domRefReadyPromise;
        }
        /**
         * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
         * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
         * @public
         */

      }, {
        key: "getDomRef",
        value: function getDomRef() {
          if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
            return;
          }

          return this.shadowRoot.children.length === 1 ? this.shadowRoot.children[0] : this.shadowRoot.children[1];
        }
        /**
         * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
         * This is the element that will receive the focus by default.
         * @public
         */

      }, {
        key: "getFocusDomRef",
        value: function getFocusDomRef() {
          var domRef = this.getDomRef();

          if (domRef) {
            var focusRef = domRef.querySelector("[data-sap-focus-ref]");
            return focusRef || domRef;
          }
        }
        /**
         * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
         * @public
         */

      }, {
        key: "focus",
        value: function () {
          var _focus = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5() {
            var focusDomRef;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return this._waitForDomRef();

                  case 2:
                    focusDomRef = this.getFocusDomRef();

                    if (focusDomRef && typeof focusDomRef.focus === "function") {
                      focusDomRef.focus();
                    }

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function focus() {
            return _focus.apply(this, arguments);
          }

          return focus;
        }()
        /**
         *
         * @public
         * @param name - name of the event
         * @param data - additional data for the event
         * @param cancelable - true, if the user can call preventDefault on the event object
         * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
         */

      }, {
        key: "fireEvent",
        value: function fireEvent(name, data, cancelable) {
          var compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"

          var noConflictEvent = new CustomEvent("ui5-".concat(name), {
            detail: data,
            composed: false,
            bubbles: true,
            cancelable: cancelable
          }); // This will be false if the compat event is prevented

          compatEventResult = this.dispatchEvent(noConflictEvent);

          if (skipOriginalEvent(name)) {
            return compatEventResult;
          }

          var customEvent = new CustomEvent(name, {
            detail: data,
            composed: false,
            bubbles: true,
            cancelable: cancelable
          }); // This will be false if the normal event is prevented

          var normalEventResult = this.dispatchEvent(customEvent); // Return false if any of the two events was prevented (its result was false).

          return normalEventResult && compatEventResult;
        }
        /**
         * Returns the actual children, associated with a slot.
         * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
         * @public
         */

      }, {
        key: "getSlottedNodes",
        value: function getSlottedNodes(slotName) {
          var reducer = function reducer(acc, curr) {
            if (!isSlot(curr)) {
              return acc.concat([curr]);
            }

            return acc.concat(curr.assignedNodes({
              flatten: true
            }).filter(function (item) {
              return item instanceof HTMLElement;
            }));
          };

          return this[slotName].reduce(reducer, []);
        }
      }, {
        key: "updateStaticAreaItemContentDensity",
        value: function updateStaticAreaItemContentDensity() {
          if (this.staticAreaItem) {
            this.staticAreaItem._updateContentDensity(this.isCompact);
          }
        }
        /**
         * Used to duck-type UI5 elements without using instanceof
         * @returns {boolean}
         * @public
         */

      }, {
        key: "_shouldUpdateFragment",
        value: function _shouldUpdateFragment() {
          return this.constructor._needsStaticArea() && this.staticAreaItem.isRendered();
        }
        /**
         * @private
         */

      }, {
        key: "getStaticAreaItemDomRef",

        /**
         * @public
         */
        value: function getStaticAreaItemDomRef() {
          return this.staticAreaItem.getDomRef();
        }
        /**
         * @private
         */

      }, {
        key: "isCompact",
        get: function get() {
          return getComputedStyle(this).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR) === "compact";
        }
      }, {
        key: "isUI5Element",
        get: function get() {
          return true;
        }
        /**
         * Do not override this method in derivatives of UI5Element, use metadata properties instead
         * @private
         */

      }], [{
        key: "_getSlotName",

        /**
         * @private
         */
        value: function _getSlotName(child) {
          // Text nodes can only go to the default slot
          if (!(child instanceof HTMLElement)) {
            return "default";
          } // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)


          var slot = child.getAttribute("slot");

          if (slot) {
            var match = slot.match(/^(.+?)-\d+$/);
            return match ? match[1] : slot;
          } // Use default slot as a fallback


          return "default";
        }
        /**
         * @private
         */

      }, {
        key: "_needsShadowDOM",
        value: function _needsShadowDOM() {
          return !!this.template;
        }
      }, {
        key: "_needsStaticArea",
        value: function _needsStaticArea() {
          return typeof this.staticAreaTemplate === "function";
        }
      }, {
        key: "_getDefaultState",
        value: function _getDefaultState() {
          if (this._defaultState) {
            return this._defaultState;
          }

          var MetadataClass = this.getMetadata();
          var defaultState = {};
          var slotsAreManaged = MetadataClass.slotsAreManaged(); // Initialize properties

          var props = MetadataClass.getProperties();

          for (var propName in props) {
            // eslint-disable-line
            var propType = props[propName].type;
            var propDefaultValue = props[propName].defaultValue;

            if (propType === Boolean) {
              defaultState[propName] = false;

              if (propDefaultValue !== undefined) {
                console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
              }
            } else if (props[propName].multiple) {
              defaultState[propName] = [];
            } else if (propType === Object) {
              defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
            } else if (propType === String) {
              defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
            } else {
              defaultState[propName] = propDefaultValue;
            }
          } // Initialize slots


          if (slotsAreManaged) {
            var slots = MetadataClass.getSlots();

            for (var _i2 = 0, _Object$entries2 = Object.entries(slots); _i2 < _Object$entries2.length; _i2++) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                  slotName = _Object$entries2$_i[0],
                  slotData = _Object$entries2$_i[1];

              // eslint-disable-line
              var propertyName = slotData.propertyName || slotName;
              defaultState[propertyName] = [];
            }
          }

          this._defaultState = defaultState;
          return defaultState;
        }
        /**
         * @private
         */

      }, {
        key: "_generateAccessors",
        value: function _generateAccessors() {
          var proto = this.prototype;
          var slotsAreManaged = this.getMetadata().slotsAreManaged(); // Properties

          var properties = this.getMetadata().getProperties();

          var _loop2 = function _loop2() {
            var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                prop = _Object$entries3$_i[0],
                propData = _Object$entries3$_i[1];

            // eslint-disable-line
            if (!isValidPropertyName(prop)) {
              throw new Error("\"".concat(prop, "\" is not a valid property name. Use a name that does not collide with DOM APIs"));
            }

            if (propData.type === Boolean && propData.defaultValue) {
              throw new Error("Cannot set a default value for property \"".concat(prop, "\". All booleans are false by default."));
            }

            if (propData.type === Array) {
              throw new Error("Wrong type for property \"".concat(prop, "\". Properties cannot be of type Array - use \"multiple: true\" and set \"type\" to the single value type, such as \"String\", \"Object\", etc..."));
            }

            if (propData.type === Object && propData.defaultValue) {
              throw new Error("Cannot set a default value for property \"".concat(prop, "\". All properties of type \"Object\" are empty objects by default."));
            }

            if (propData.multiple && propData.defaultValue) {
              throw new Error("Cannot set a default value for property \"".concat(prop, "\". All multiple properties are empty arrays by default."));
            }

            Object.defineProperty(proto, prop, {
              get: function get() {
                if (this._state[prop] !== undefined) {
                  return this._state[prop];
                }

                var propDefaultValue = propData.defaultValue;

                if (propData.type === Boolean) {
                  return false;
                } else if (propData.type === String) {
                  // eslint-disable-line
                  return propDefaultValue;
                } else if (propData.multiple) {
                  // eslint-disable-line
                  return [];
                } else {
                  return propDefaultValue;
                }
              },
              set: function set(value) {
                value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);
                var oldState = this._state[prop];

                if (oldState !== value) {
                  this._state[prop] = value;

                  this._invalidate(prop, value);

                  this._propertyChange(prop, value);
                }
              }
            });
          };

          for (var _i3 = 0, _Object$entries3 = Object.entries(properties); _i3 < _Object$entries3.length; _i3++) {
            _loop2();
          } // Slots


          if (slotsAreManaged) {
            var slots = this.getMetadata().getSlots();

            var _loop = function _loop() {
              var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
                  slotName = _Object$entries4$_i[0],
                  slotData = _Object$entries4$_i[1];

              // eslint-disable-line
              if (!isValidPropertyName(slotName)) {
                throw new Error("\"".concat(slotName, "\" is not a valid property name. Use a name that does not collide with DOM APIs"));
              }

              var propertyName = slotData.propertyName || slotName;
              Object.defineProperty(proto, propertyName, {
                get: function get() {
                  if (this._state[propertyName] !== undefined) {
                    return this._state[propertyName];
                  }

                  return [];
                },
                set: function set() {
                  throw new Error("Cannot set slots directly, use the DOM APIs");
                }
              });
            };

            for (var _i4 = 0, _Object$entries4 = Object.entries(slots); _i4 < _Object$entries4.length; _i4++) {
              _loop();
            }
          }
        }
        /**
         * Returns the metadata object for this UI5 Web Component Class
         * @protected
         */

      }, {
        key: "define",

        /**
         * Registers a UI5 Web Component in the browser window object
         * @public
         * @returns {Promise<UI5Element>}
         */
        value: function () {
          var _define = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee6() {
            var tag, definedLocally, definedGlobally;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return boot();

                  case 2:
                    if (!this.onDefine) {
                      _context6.next = 5;
                      break;
                    }

                    _context6.next = 5;
                    return this.onDefine();

                  case 5:
                    tag = this.getMetadata().getTag();
                    definedLocally = isTagRegistered(tag);
                    definedGlobally = customElements.get(tag);

                    if (definedGlobally && !definedLocally) {
                      recordTagRegistrationFailure(tag);
                    } else if (!definedGlobally) {
                      this._generateAccessors();

                      registerTag(tag);
                      window.customElements.define(tag, this);
                    }

                    return _context6.abrupt("return", this);

                  case 10:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function define() {
            return _define.apply(this, arguments);
          }

          return define;
        }()
        /**
         * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
         * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
         * @public
         * @returns {UI5ElementMetadata}
         */

      }, {
        key: "getMetadata",
        value: function getMetadata() {
          if (this.hasOwnProperty("_metadata")) {
            // eslint-disable-line
            return this._metadata;
          }

          var metadataObjects = [this.metadata];
          var klass = this; // eslint-disable-line

          while (klass !== UI5Element) {
            klass = Object.getPrototypeOf(klass);
            metadataObjects.unshift(klass.metadata);
          }

          var mergedMetadata = fnMerge$1.apply(void 0, [{}].concat(metadataObjects));
          this._metadata = new UI5ElementMetadata(mergedMetadata);
          return this._metadata;
        }
      }, {
        key: "observedAttributes",
        get: function get() {
          return this.getMetadata().getAttributesList();
        }
      }, {
        key: "metadata",
        get: function get() {
          return metadata;
        }
        /**
         * Returns the CSS for this UI5 Web Component Class
         * @protected
         */

      }, {
        key: "styles",
        get: function get() {
          return "";
        }
        /**
         * Returns the Static Area CSS for this UI5 Web Component Class
         * @protected
         */

      }, {
        key: "staticAreaStyles",
        get: function get() {
          return "";
        }
      }]);

      return UI5Element;
    }(_wrapNativeSuper(HTMLElement));

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    var directives = new WeakMap();
    /**
     * Brands a function as a directive factory function so that lit-html will call
     * the function during template rendering, rather than passing as a value.
     *
     * A _directive_ is a function that takes a Part as an argument. It has the
     * signature: `(part: Part) => void`.
     *
     * A directive _factory_ is a function that takes arguments for data and
     * configuration and returns a directive. Users of directive usually refer to
     * the directive factory as the directive. For example, "The repeat directive".
     *
     * Usually a template author will invoke a directive factory in their template
     * with relevant arguments, which will then return a directive function.
     *
     * Here's an example of using the `repeat()` directive factory that takes an
     * array and a function to render an item:
     *
     * ```js
     * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
     * ```
     *
     * When `repeat` is invoked, it returns a directive function that closes over
     * `items` and the template function. When the outer template is rendered, the
     * return directive function is called with the Part for the expression.
     * `repeat` then performs it's custom logic to render multiple items.
     *
     * @param f The directive factory function. Must be a function that returns a
     * function of the signature `(part: Part) => void`. The returned function will
     * be called with the part object.
     *
     * @example
     *
     * import {directive, html} from 'lit-html';
     *
     * const immutable = directive((v) => (part) => {
     *   if (part.value !== v) {
     *     part.setValue(v)
     *   }
     * });
     */

    var directive = function directive(f) {
      return function () {
        var d = f.apply(void 0, arguments);
        directives.set(d, true);
        return d;
      };
    };
    var isDirective = function isDirective(o) {
      return typeof o === 'function' && directives.has(o);
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */

    /**
     * True if the custom elements polyfill is in use.
     */
    var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
    /**
     * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
     * into another container (could be the same container), before `before`. If
     * `before` is null, it appends the nodes to the container.
     */

    var reparentNodes = function reparentNodes(container, start) {
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      while (start !== end) {
        var n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
      }
    };
    /**
     * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
     * `container`.
     */

    var removeNodes = function removeNodes(container, start) {
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      while (start !== end) {
        var n = start.nextSibling;
        container.removeChild(start);
        start = n;
      }
    };

    /**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */

    /**
     * A sentinel value that signals that a value was handled by a directive and
     * should not be written to the DOM.
     */
    var noChange = {};
    /**
     * A sentinel value that signals a NodePart to fully clear its content.
     */

    var nothing = {};

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */

    /**
     * An expression marker with embedded unique key to avoid collision with
     * possible text in templates.
     */
    var marker = "{{lit-".concat(String(Math.random()).slice(2), "}}");
    /**
     * An expression marker used text-positions, multi-binding attributes, and
     * attributes with markup-like text values.
     */

    var nodeMarker = "<!--".concat(marker, "-->");
    var markerRegex = new RegExp("".concat(marker, "|").concat(nodeMarker));
    /**
     * Suffix appended to all bound attribute names.
     */

    var boundAttributeSuffix = '$lit$';
    /**
     * An updateable Template that tracks the location of dynamic parts.
     */

    var Template = function Template(result, element) {
      _classCallCheck(this, Template);

      this.parts = [];
      this.element = element;
      var nodesToRemove = [];
      var stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

      var walker = document.createTreeWalker(element.content, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      var lastPartIndex = 0;
      var index = -1;
      var partIndex = 0;
      var strings = result.strings,
          length = result.values.length;

      while (partIndex < length) {
        var node = walker.nextNode();

        if (node === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          continue;
        }

        index++;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              var attributes = node.attributes;
              var _length = attributes.length; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondence between part index and attribute index.

              var count = 0;

              for (var i = 0; i < _length; i++) {
                if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                var stringForPart = strings[partIndex]; // Find the attribute name

                var name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // All bound attributes have had a suffix added in
                // TemplateResult#getHTML to opt out of special attribute
                // handling. To look up the attribute value we also need to add
                // the suffix.

                var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                var attributeValue = node.getAttribute(attributeLookupName);
                node.removeAttribute(attributeLookupName);
                var statics = attributeValue.split(markerRegex);
                this.parts.push({
                  type: 'attribute',
                  index: index,
                  name: name,
                  strings: statics
                });
                partIndex += statics.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              stack.push(node);
              walker.currentNode = node.content;
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            var data = node.data;

            if (data.indexOf(marker) >= 0) {
              var parent = node.parentNode;

              var _strings = data.split(markerRegex);

              var lastIndex = _strings.length - 1; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (var _i = 0; _i < lastIndex; _i++) {
                var insert = void 0;
                var s = _strings[_i];

                if (s === '') {
                  insert = createMarker();
                } else {
                  var match = lastAttributeNameRegex.exec(s);

                  if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                    s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                  }

                  insert = document.createTextNode(s);
                }

                parent.insertBefore(insert, node);
                this.parts.push({
                  type: 'node',
                  index: ++index
                });
              } // If there's no text, we must insert a comment to mark our place.
              // Else, we can trust it will stick around after cloning.


              if (_strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = _strings[lastIndex];
              } // We have a part for each match found


              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.data === marker) {
              var _parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * The previousSibling is already the start of a previous part

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;

                _parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;
              this.parts.push({
                type: 'node',
                index: index
              }); // If we don't have a nextSibling, keep this node so we have an end.
              // Else, we can remove it to save future costs.

              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              var _i2 = -1;

              while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                this.parts.push({
                  type: 'node',
                  index: -1
                });
                partIndex++;
              }
            }
          }
      } // Remove text binding nodes after the walk to not disturb the TreeWalker


      for (var _i3 = 0, _nodesToRemove = nodesToRemove; _i3 < _nodesToRemove.length; _i3++) {
        var n = _nodesToRemove[_i3];
        n.parentNode.removeChild(n);
      }
    };

    var endsWith = function endsWith(str, suffix) {
      var index = str.length - suffix.length;
      return index >= 0 && str.slice(index) === suffix;
    };

    var isTemplatePartActive = function isTemplatePartActive(part) {
      return part.index !== -1;
    }; // Allows `document.createComment('')` to be renamed for a
    // small manual size-savings.

    var createMarker = function createMarker() {
      return document.createComment('');
    };
    /**
     * This regex extracts the attribute name preceding an attribute-position
     * expression. It does this by matching the syntax allowed for attributes
     * against the string literal directly preceding the expression, assuming that
     * the expression is in an attribute-value position.
     *
     * See attributes in the HTML spec:
     * https://www.w3.org/TR/html5/syntax.html#elements-attributes
     *
     * " \x09\x0a\x0c\x0d" are HTML space characters:
     * https://www.w3.org/TR/html5/infrastructure.html#space-characters
     *
     * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
     * space character except " ".
     *
     * So an attribute is:
     *  * The name: any character except a control character, space character, ('),
     *    ("), ">", "=", or "/"
     *  * Followed by zero or more space characters
     *  * Followed by "="
     *  * Followed by zero or more space characters
     *  * Followed by:
     *    * Any character except space, ('), ("), "<", ">", "=", (`), or
     *    * (") then any non-("), or
     *    * (') then any non-(')
     */

    var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

    /**
     * An instance of a `Template` that can be attached to the DOM and updated
     * with new values.
     */

    var TemplateInstance =
    /*#__PURE__*/
    function () {
      function TemplateInstance(template, processor, options) {
        _classCallCheck(this, TemplateInstance);

        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
      }

      _createClass(TemplateInstance, [{
        key: "update",
        value: function update(values) {
          var i = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.__parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var part = _step.value;

              if (part !== undefined) {
                part.setValue(values[i]);
              }

              i++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.__parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _part = _step2.value;

              if (_part !== undefined) {
                _part.commit();
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "_clone",
        value: function _clone() {
          // There are a number of steps in the lifecycle of a template instance's
          // DOM fragment:
          //  1. Clone - create the instance fragment
          //  2. Adopt - adopt into the main document
          //  3. Process - find part markers and create parts
          //  4. Upgrade - upgrade custom elements
          //  5. Update - set node, attribute, property, etc., values
          //  6. Connect - connect to the document. Optional and outside of this
          //     method.
          //
          // We have a few constraints on the ordering of these steps:
          //  * We need to upgrade before updating, so that property values will pass
          //    through any property setters.
          //  * We would like to process before upgrading so that we're sure that the
          //    cloned fragment is inert and not disturbed by self-modifying DOM.
          //  * We want custom elements to upgrade even in disconnected fragments.
          //
          // Given these constraints, with full custom elements support we would
          // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
          //
          // But Safari dooes not implement CustomElementRegistry#upgrade, so we
          // can not implement that order and still have upgrade-before-update and
          // upgrade disconnected fragments. So we instead sacrifice the
          // process-before-upgrade constraint, since in Custom Elements v1 elements
          // must not modify their light DOM in the constructor. We still have issues
          // when co-existing with CEv0 elements like Polymer 1, and with polyfills
          // that don't strictly adhere to the no-modification rule because shadow
          // DOM, which may be created in the constructor, is emulated by being placed
          // in the light DOM.
          //
          // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
          // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
          // in one step.
          //
          // The Custom Elements v1 polyfill supports upgrade(), so the order when
          // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
          // Connect.
          var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
          var stack = [];
          var parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

          var walker = document.createTreeWalker(fragment, 133
          /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
          , null, false);
          var partIndex = 0;
          var nodeIndex = 0;
          var part;
          var node = walker.nextNode(); // Loop through all the nodes and parts of a template

          while (partIndex < parts.length) {
            part = parts[partIndex];

            if (!isTemplatePartActive(part)) {
              this.__parts.push(undefined);

              partIndex++;
              continue;
            } // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.


            while (nodeIndex < part.index) {
              nodeIndex++;

              if (node.nodeName === 'TEMPLATE') {
                stack.push(node);
                walker.currentNode = node.content;
              }

              if ((node = walker.nextNode()) === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                node = walker.nextNode();
              }
            } // We've arrived at our part's node.


            if (part.type === 'node') {
              var _part2 = this.processor.handleTextExpression(this.options);

              _part2.insertAfterNode(node.previousSibling);

              this.__parts.push(_part2);
            } else {
              var _this$__parts;

              (_this$__parts = this.__parts).push.apply(_this$__parts, _toConsumableArray$1(this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options)));
            }

            partIndex++;
          }

          if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
          }

          return fragment;
        }
      }]);

      return TemplateInstance;
    }();

    var commentMarker = " ".concat(marker, " ");
    /**
     * The return type of `html`, which holds a Template and the values from
     * interpolated expressions.
     */

    var TemplateResult =
    /*#__PURE__*/
    function () {
      function TemplateResult(strings, values, type, processor) {
        _classCallCheck(this, TemplateResult);

        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
      }
      /**
       * Returns a string of HTML used to create a `<template>` element.
       */


      _createClass(TemplateResult, [{
        key: "getHTML",
        value: function getHTML() {
          var l = this.strings.length - 1;
          var html = '';
          var isCommentBinding = false;

          for (var i = 0; i < l; i++) {
            var s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.

            var commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.

            isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.

            var attributeMatch = lastAttributeNameRegex.exec(s);

            if (attributeMatch === null) {
              // We're only in this branch if we don't have a attribute-like
              // preceeding sequence. For comments, this guards against unusual
              // attribute values like <div foo="<!--${'bar'}">. Cases like
              // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
              // below.
              html += s + (isCommentBinding ? commentMarker : nodeMarker);
            } else {
              // For attributes we use just a marker sentinel, and also append a
              // $lit$ suffix to the name to opt-out of attribute-specific parsing
              // that IE and Edge do for style and certain SVG attributes.
              html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
            }
          }

          html += this.strings[l];
          return html;
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var template = document.createElement('template');
          template.innerHTML = this.getHTML();
          return template;
        }
      }]);

      return TemplateResult;
    }();
    /**
     * A TemplateResult for SVG fragments.
     *
     * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
     * SVG namespace, then modifies the template to remove the `<svg>` tag so that
     * clones only container the original fragment.
     */

    var SVGTemplateResult =
    /*#__PURE__*/
    function (_TemplateResult) {
      _inherits(SVGTemplateResult, _TemplateResult);

      function SVGTemplateResult() {
        _classCallCheck(this, SVGTemplateResult);

        return _possibleConstructorReturn(this, _getPrototypeOf(SVGTemplateResult).apply(this, arguments));
      }

      _createClass(SVGTemplateResult, [{
        key: "getHTML",
        value: function getHTML() {
          return "<svg>".concat(_get(_getPrototypeOf(SVGTemplateResult.prototype), "getHTML", this).call(this), "</svg>");
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var template = _get(_getPrototypeOf(SVGTemplateResult.prototype), "getTemplateElement", this).call(this);

          var content = template.content;
          var svgElement = content.firstChild;
          content.removeChild(svgElement);
          reparentNodes(content, svgElement.firstChild);
          return template;
        }
      }]);

      return SVGTemplateResult;
    }(TemplateResult);

    var isPrimitive = function isPrimitive(value) {
      return value === null || !(_typeof(value) === 'object' || typeof value === 'function');
    };
    var isIterable = function isIterable(value) {
      return Array.isArray(value) || // tslint:disable-next-line:no-any
      !!(value && value[Symbol.iterator]);
    };
    /**
     * Writes attribute values to the DOM for a group of AttributeParts bound to a
     * single attibute. The value is only set once even if there are multiple parts
     * for an attribute.
     */

    var AttributeCommitter =
    /*#__PURE__*/
    function () {
      function AttributeCommitter(element, name, strings) {
        _classCallCheck(this, AttributeCommitter);

        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];

        for (var i = 0; i < strings.length - 1; i++) {
          this.parts[i] = this._createPart();
        }
      }
      /**
       * Creates a single part. Override this to create a differnt type of part.
       */


      _createClass(AttributeCommitter, [{
        key: "_createPart",
        value: function _createPart() {
          return new AttributePart(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          var strings = this.strings;
          var l = strings.length - 1;
          var text = '';

          for (var i = 0; i < l; i++) {
            text += strings[i];
            var part = this.parts[i];

            if (part !== undefined) {
              var v = part.value;

              if (isPrimitive(v) || !isIterable(v)) {
                text += typeof v === 'string' ? v : String(v);
              } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var t = _step.value;
                    text += typeof t === 'string' ? t : String(t);
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              }
            }
          }

          text += strings[l];
          return text;
        }
      }, {
        key: "commit",
        value: function commit() {
          if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
          }
        }
      }]);

      return AttributeCommitter;
    }();
    /**
     * A Part that controls all or part of an attribute value.
     */

    var AttributePart =
    /*#__PURE__*/
    function () {
      function AttributePart(committer) {
        _classCallCheck(this, AttributePart);

        this.value = undefined;
        this.committer = committer;
      }

      _createClass(AttributePart, [{
        key: "setValue",
        value: function setValue(value) {
          if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value; // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().

            if (!isDirective(value)) {
              this.committer.dirty = true;
            }
          }
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this.value)) {
            var directive = this.value;
            this.value = noChange;
            directive(this);
          }

          if (this.value === noChange) {
            return;
          }

          this.committer.commit();
        }
      }]);

      return AttributePart;
    }();
    /**
     * A Part that controls a location within a Node tree. Like a Range, NodePart
     * has start and end locations and can set and update the Nodes between those
     * locations.
     *
     * NodeParts support several value types: primitives, Nodes, TemplateResults,
     * as well as arrays and iterables of those types.
     */

    var NodePart =
    /*#__PURE__*/
    function () {
      function NodePart(options) {
        _classCallCheck(this, NodePart);

        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
      }
      /**
       * Appends this part into a container.
       *
       * This part must be empty, as its contents are not automatically moved.
       */


      _createClass(NodePart, [{
        key: "appendInto",
        value: function appendInto(container) {
          this.startNode = container.appendChild(createMarker());
          this.endNode = container.appendChild(createMarker());
        }
        /**
         * Inserts this part after the `ref` node (between `ref` and `ref`'s next
         * sibling). Both `ref` and its next sibling must be static, unchanging nodes
         * such as those that appear in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "insertAfterNode",
        value: function insertAfterNode(ref) {
          this.startNode = ref;
          this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "appendIntoPart",
        value: function appendIntoPart(part) {
          part.__insert(this.startNode = createMarker());

          part.__insert(this.endNode = createMarker());
        }
        /**
         * Inserts this part after the `ref` part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "insertAfterPart",
        value: function insertAfterPart(ref) {
          ref.__insert(this.startNode = createMarker());

          this.endNode = ref.endNode;
          ref.endNode = this.startNode;
        }
      }, {
        key: "setValue",
        value: function setValue(value) {
          this.__pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this.__pendingValue)) {
            var directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
          }

          var value = this.__pendingValue;

          if (value === noChange) {
            return;
          }

          if (isPrimitive(value)) {
            if (value !== this.value) {
              this.__commitText(value);
            }
          } else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
          } else if (value instanceof Node) {
            this.__commitNode(value);
          } else if (isIterable(value)) {
            this.__commitIterable(value);
          } else if (value === nothing) {
            this.value = nothing;
            this.clear();
          } else {
            // Fallback, will render the string representation
            this.__commitText(value);
          }
        }
      }, {
        key: "__insert",
        value: function __insert(node) {
          this.endNode.parentNode.insertBefore(node, this.endNode);
        }
      }, {
        key: "__commitNode",
        value: function __commitNode(value) {
          if (this.value === value) {
            return;
          }

          this.clear();

          this.__insert(value);

          this.value = value;
        }
      }, {
        key: "__commitText",
        value: function __commitText(value) {
          var node = this.startNode.nextSibling;
          value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
          // it can't be implicitly converted - i.e. it's a symbol.

          var valueAsString = typeof value === 'string' ? value : String(value);

          if (node === this.endNode.previousSibling && node.nodeType === 3
          /* Node.TEXT_NODE */
          ) {
              // If we only have a single text node between the markers, we can just
              // set its value, rather than replacing it.
              // TODO(justinfagnani): Can we just check if this.value is primitive?
              node.data = valueAsString;
            } else {
            this.__commitNode(document.createTextNode(valueAsString));
          }

          this.value = value;
        }
      }, {
        key: "__commitTemplateResult",
        value: function __commitTemplateResult(value) {
          var template = this.options.templateFactory(value);

          if (this.value instanceof TemplateInstance && this.value.template === template) {
            this.value.update(value.values);
          } else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            var instance = new TemplateInstance(template, value.processor, this.options);

            var fragment = instance._clone();

            instance.update(value.values);

            this.__commitNode(fragment);

            this.value = instance;
          }
        }
      }, {
        key: "__commitIterable",
        value: function __commitIterable(value) {
          // For an Iterable, we create a new InstancePart per item, then set its
          // value to the item. This is a little bit of overhead for every item in
          // an Iterable, but it lets us recurse easily and efficiently update Arrays
          // of TemplateResults that will be commonly returned from expressions like:
          // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
          // If _value is an array, then the previous render was of an
          // iterable and _value will contain the NodeParts from the previous
          // render. If _value is not an array, clear this part and make a new
          // array for NodeParts.
          if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
          } // Lets us keep track of how many items we stamped so we can clear leftover
          // items from a previous render


          var itemParts = this.value;
          var partIndex = 0;
          var itemPart;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;
              // Try to reuse an existing part
              itemPart = itemParts[partIndex]; // If no existing part, create a new one

              if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);

                if (partIndex === 0) {
                  itemPart.appendIntoPart(this);
                } else {
                  itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
              }

              itemPart.setValue(item);
              itemPart.commit();
              partIndex++;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
          }
        }
      }, {
        key: "clear",
        value: function clear() {
          var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
          removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
      }]);

      return NodePart;
    }();
    /**
     * Implements a boolean attribute, roughly as defined in the HTML
     * specification.
     *
     * If the value is truthy, then the attribute is present with a value of
     * ''. If the value is falsey, the attribute is removed.
     */

    var BooleanAttributePart =
    /*#__PURE__*/
    function () {
      function BooleanAttributePart(element, name, strings) {
        _classCallCheck(this, BooleanAttributePart);

        this.value = undefined;
        this.__pendingValue = undefined;

        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
          throw new Error('Boolean attributes can only contain a single expression');
        }

        this.element = element;
        this.name = name;
        this.strings = strings;
      }

      _createClass(BooleanAttributePart, [{
        key: "setValue",
        value: function setValue(value) {
          this.__pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this.__pendingValue)) {
            var directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
          }

          if (this.__pendingValue === noChange) {
            return;
          }

          var value = !!this.__pendingValue;

          if (this.value !== value) {
            if (value) {
              this.element.setAttribute(this.name, '');
            } else {
              this.element.removeAttribute(this.name);
            }

            this.value = value;
          }

          this.__pendingValue = noChange;
        }
      }]);

      return BooleanAttributePart;
    }();
    /**
     * Sets attribute values for PropertyParts, so that the value is only set once
     * even if there are multiple parts for a property.
     *
     * If an expression controls the whole property value, then the value is simply
     * assigned to the property under control. If there are string literals or
     * multiple expressions, then the strings are expressions are interpolated into
     * a string first.
     */

    var PropertyCommitter =
    /*#__PURE__*/
    function (_AttributeCommitter) {
      _inherits(PropertyCommitter, _AttributeCommitter);

      function PropertyCommitter(element, name, strings) {
        var _this;

        _classCallCheck(this, PropertyCommitter);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(PropertyCommitter).call(this, element, name, strings));
        _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
        return _this;
      }

      _createClass(PropertyCommitter, [{
        key: "_createPart",
        value: function _createPart() {
          return new PropertyPart(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          if (this.single) {
            return this.parts[0].value;
          }

          return _get(_getPrototypeOf(PropertyCommitter.prototype), "_getValue", this).call(this);
        }
      }, {
        key: "commit",
        value: function commit() {
          if (this.dirty) {
            this.dirty = false; // tslint:disable-next-line:no-any

            this.element[this.name] = this._getValue();
          }
        }
      }]);

      return PropertyCommitter;
    }(AttributeCommitter);
    var PropertyPart =
    /*#__PURE__*/
    function (_AttributePart) {
      _inherits(PropertyPart, _AttributePart);

      function PropertyPart() {
        _classCallCheck(this, PropertyPart);

        return _possibleConstructorReturn(this, _getPrototypeOf(PropertyPart).apply(this, arguments));
      }

      return PropertyPart;
    }(AttributePart); // Detect event listener options support. If the `capture` property is read
    // from the options object, then options are supported. If not, then the thrid
    // argument to add/removeEventListener is interpreted as the boolean capture
    // value so we should only pass the `capture` property.

    var eventOptionsSupported = false;

    try {
      var options = {
        get capture() {
          eventOptionsSupported = true;
          return false;
        }

      }; // tslint:disable-next-line:no-any

      window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

      window.removeEventListener('test', options, options);
    } catch (_e) {}

    var EventPart =
    /*#__PURE__*/
    function () {
      function EventPart(element, eventName, eventContext) {
        var _this2 = this;

        _classCallCheck(this, EventPart);

        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;

        this.__boundHandleEvent = function (e) {
          return _this2.handleEvent(e);
        };
      }

      _createClass(EventPart, [{
        key: "setValue",
        value: function setValue(value) {
          this.__pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this.__pendingValue)) {
            var directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
          }

          if (this.__pendingValue === noChange) {
            return;
          }

          var newListener = this.__pendingValue;
          var oldListener = this.value;
          var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
          var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

          if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
          }

          if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
          }

          this.value = newListener;
          this.__pendingValue = noChange;
        }
      }, {
        key: "handleEvent",
        value: function handleEvent(event) {
          if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
          } else {
            this.value.handleEvent(event);
          }
        }
      }]);

      return EventPart;
    }(); // We copy options because of the inconsistent behavior of browsers when reading
    // the third argument of add/removeEventListener. IE11 doesn't support options
    // at all. Chrome 41 only reads `capture` if the argument is an object.

    var getOptions = function getOptions(o) {
      return o && (eventOptionsSupported ? {
        capture: o.capture,
        passive: o.passive,
        once: o.once
      } : o.capture);
    };

    /**
     * Creates Parts when a template is instantiated.
     */

    var DefaultTemplateProcessor =
    /*#__PURE__*/
    function () {
      function DefaultTemplateProcessor() {
        _classCallCheck(this, DefaultTemplateProcessor);
      }

      _createClass(DefaultTemplateProcessor, [{
        key: "handleAttributeExpressions",

        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        value: function handleAttributeExpressions(element, name, strings, options) {
          var prefix = name[0];

          if (prefix === '.') {
            var _committer = new PropertyCommitter(element, name.slice(1), strings);

            return _committer.parts;
          }

          if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
          }

          if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
          }

          var committer = new AttributeCommitter(element, name, strings);
          return committer.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */

      }, {
        key: "handleTextExpression",
        value: function handleTextExpression(options) {
          return new NodePart(options);
        }
      }]);

      return DefaultTemplateProcessor;
    }();
    var defaultTemplateProcessor = new DefaultTemplateProcessor();

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * The default TemplateFactory which caches Templates keyed on
     * result.type and result.strings.
     */

    function templateFactory(result) {
      var templateCache = templateCaches.get(result.type);

      if (templateCache === undefined) {
        templateCache = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
      }

      var template = templateCache.stringsArray.get(result.strings);

      if (template !== undefined) {
        return template;
      } // If the TemplateStringsArray is new, generate a key from the strings
      // This key is shared between all templates with identical content


      var key = result.strings.join(marker); // Check if we already have a Template for this key

      template = templateCache.keyString.get(key);

      if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

        templateCache.keyString.set(key, template);
      } // Cache all future queries for this TemplateStringsArray


      templateCache.stringsArray.set(result.strings, template);
      return template;
    }
    var templateCaches = new Map();

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    var parts = new WeakMap();
    /**
     * Renders a template result or other value to a container.
     *
     * To update a container with new values, reevaluate the template literal and
     * call `render` with the new result.
     *
     * @param result Any value renderable by NodePart - typically a TemplateResult
     *     created by evaluating a template tag like `html` or `svg`.
     * @param container A DOM parent to render to. The entire contents are either
     *     replaced, or efficiently updated if the same result type was previous
     *     rendered there.
     * @param options RenderOptions for the entire render tree rendered to this
     *     container. Render options must *not* change between renders to the same
     *     container, as those changes will not effect previously rendered DOM.
     */

    var render = function render(result, container, options) {
      var part = parts.get(container);

      if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({
          templateFactory: templateFactory
        }, options)));
        part.appendInto(container);
      }

      part.setValue(result);
      part.commit();
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    // This line will be used in regexes to search for lit-html usage.
    // TODO(justinfagnani): inject version number at build time

    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
    /**
     * Interprets a template literal as an HTML template that can efficiently
     * render to and update a container.
     */

    var html = function html(strings) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
    };
    /**
     * Interprets a template literal as an SVG template that can efficiently
     * render to and update a container.
     */

    var svg = function svg(strings) {
      for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      return new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
    };

    /**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * Stores the ClassInfo object applied to a given AttributePart.
     * Used to unset existing values when a new ClassInfo object is applied.
     */

    var classMapCache = new WeakMap();
    /**
     * A directive that applies CSS classes. This must be used in the `class`
     * attribute and must be the only part used in the attribute. It takes each
     * property in the `classInfo` argument and adds the property name to the
     * element's `classList` if the property value is truthy; if the property value
     * is falsey, the property name is removed from the element's `classList`. For
     * example
     * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
     * @param classInfo {ClassInfo}
     */

    var classMap = directive(function (classInfo) {
      return function (part) {
        if (!(part instanceof AttributePart) || part instanceof PropertyPart || part.committer.name !== 'class' || part.committer.parts.length > 1) {
          throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
        }

        var committer = part.committer;
        var element = committer.element; // handle static classes

        if (!classMapCache.has(part)) {
          element.className = committer.strings.join(' ');
        }

        var classList = element.classList; // remove old classes that no longer apply

        var oldInfo = classMapCache.get(part);

        for (var name in oldInfo) {
          if (!(name in classInfo)) {
            classList.remove(name);
          }
        } // add new classes


        for (var _name in classInfo) {
          var value = classInfo[_name];

          if (!oldInfo || value !== oldInfo[_name]) {
            // We explicitly want a loose truthy check here because
            // it seems more convenient that '' and 0 are skipped.
            var method = value ? 'add' : 'remove';
            classList[method](_name);
          }
        }

        classMapCache.set(part, classInfo);
      };
    });

    function _templateObject() {
      var data = _taggedTemplateLiteral(["<style>", "</style>", ""]);

      _templateObject = function _templateObject() {
        return data;
      };

      return data;
    }

    var litRender = function litRender(templateResult, domNode, styles) {
      var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          eventContext = _ref.eventContext;

      if (styles) {
        templateResult = html(_templateObject(), styles, templateResult);
      }

      render(templateResult, domNode, {
        eventContext: eventContext
      });
    };

    var KeyCodes = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CONTROL: 17,
      ALT: 18,
      BREAK: 19,
      CAPS_LOCK: 20,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
      PRINT: 44,
      INSERT: 45,
      DELETE: 46,
      DIGIT_0: 48,
      DIGIT_1: 49,
      DIGIT_2: 50,
      DIGIT_3: 51,
      DIGIT_4: 52,
      DIGIT_5: 53,
      DIGIT_6: 54,
      DIGIT_7: 55,
      DIGIT_8: 56,
      DIGIT_9: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      WINDOWS: 91,
      CONTEXT_MENU: 93,
      TURN_OFF: 94,
      SLEEP: 95,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      NUMPAD_ASTERISK: 106,
      NUMPAD_PLUS: 107,
      NUMPAD_MINUS: 109,
      NUMPAD_COMMA: 110,
      NUMPAD_SLASH: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUM_LOCK: 144,
      SCROLL_LOCK: 145,
      OPEN_BRACKET: 186,
      PLUS: 187,
      COMMA: 188,
      SLASH: 189,
      DOT: 190,
      PIPE: 191,
      SEMICOLON: 192,
      MINUS: 219,
      GREAT_ACCENT: 220,
      EQUALS: 221,
      SINGLE_QUOTE: 222,
      BACKSLASH: 226
    };

    var isEnter = function isEnter(event) {
      return (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);
    };

    var isSpace = function isSpace(event) {
      return (event.key ? event.key === "Spacebar" || event.key === " " : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);
    };

    var hasModifierKeys = function hasModifierKeys(event) {
      return event.shiftKey || event.altKey || getCtrlKey(event);
    };

    var getCtrlKey = function getCtrlKey(event) {
      return !!(event.metaKey || event.ctrlKey);
    }; // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.

    var M_ISO639_OLD_TO_NEW$3 = {
      "iw": "he",
      "ji": "yi",
      "in": "id",
      "sh": "sr"
    };
    var A_RTL_LOCALES$1 = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];

    var impliesRTL = function impliesRTL(language) {
      language = language && M_ISO639_OLD_TO_NEW$3[language] || language;
      return A_RTL_LOCALES$1.indexOf(language) >= 0;
    };

    var getRTL$1 = function getRTL$1() {
      var configurationRTL = getRTL();

      if (configurationRTL !== null) {
        return !!configurationRTL;
      }

      return impliesRTL(getLanguage$1() || detectNavigatorLanguage());
    };
     // eslint-disable-line

    var messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

    var formatMessage = function formatMessage(text, values) {
      values = values || [];
      return text.replace(messageFormatRegEX, function ($0, $1, $2, $3, offset) {
        if ($1) {
          return '\'';
          /* eslint-disable-line */
        }

        if ($2) {
          return $2.replace(/''/g, '\'');
          /* eslint-disable-line */
        }

        if ($3) {
          return String(values[parseInt($3)]);
        }

        throw new Error("[i18n]: pattern syntax error at pos ".concat(offset));
      });
    };

    var I18nBundleInstances = new Map();

    var I18nBundle =
    /*#__PURE__*/
    function () {
      function I18nBundle(packageName) {
        _classCallCheck(this, I18nBundle);

        this.packageName = packageName;
      }

      _createClass(I18nBundle, [{
        key: "getText",
        value: function getText(textObj) {
          if (!textObj || !textObj.key || !textObj.defaultText) {
            return "";
          }

          var bundle = getI18nBundleData(this.packageName);
          var messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText;

          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          return formatMessage(messageText, params);
        }
      }]);

      return I18nBundle;
    }();

    var getI18nBundle = function getI18nBundle(packageName) {
      if (I18nBundleInstances.has(packageName)) {
        return I18nBundleInstances.get(packageName);
      }

      var i18nBundle = new I18nBundle(packageName);
      I18nBundleInstances.set(packageName, i18nBundle);
      return i18nBundle;
    };

    var findNodeOwner = function findNodeOwner(node) {
      if (!(node instanceof HTMLElement)) {
        throw new Error("Argument node should be of type HTMLElement");
      }

      var ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
      var currentShadowRootFlag = true;
      var currentCustomElementFlag = true;

      while (node) {
        if (node.toString() === "[object ShadowRoot]") {
          // Web Component
          // or the shadow root of web component with attached shadow root
          if (currentShadowRootFlag) {
            currentShadowRootFlag = false;
          }

          if (!currentCustomElementFlag && !currentShadowRootFlag) {
            return node;
          }
        } else if (node.tagName && node.tagName.indexOf("-") > -1) {
          if (currentCustomElementFlag) {
            currentCustomElementFlag = false;
          } else {
            return node;
          }
        } else if (ownerTypes.indexOf(node.constructor) > -1) {
          // Document or Iframe reached
          return node;
        }

        node = node.parentNode || node.host;
      }
    };

    /**
     * @lends sap.ui.webcomponents.main.types.ButtonDesign.prototype
     * @public
     */

    var ButtonTypes = {
      /**
       * default type (no special styling)
       * @public
       * @type {Default}
       */
      Default: "Default",

      /**
       * accept type (green button)
       * @public
       * @type {Positive}
       */
      Positive: "Positive",

      /**
       * reject style (red button)
       * @public
       * @type {Negative}
       */
      Negative: "Negative",

      /**
       * transparent type
       * @public
       * @type {Transparent}
       */
      Transparent: "Transparent",

      /**
       * emphasized type
       * @public
       * @type {Emphasized}
       */
      Emphasized: "Emphasized"
    };
    /**
     * @class
     * Different types of Button.
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.types.ButtonDesign
     * @public
     * @enum {string}
     */

    var ButtonDesign =
    /*#__PURE__*/
    function (_DataType) {
      _inherits(ButtonDesign, _DataType);

      function ButtonDesign() {
        _classCallCheck(this, ButtonDesign);

        return _possibleConstructorReturn(this, _getPrototypeOf(ButtonDesign).apply(this, arguments));
      }

      _createClass(ButtonDesign, null, [{
        key: "isValid",
        value: function isValid(value) {
          return !!ButtonTypes[value];
        }
      }]);

      return ButtonDesign;
    }(DataType);

    ButtonDesign.generataTypeAcessors(ButtonTypes);

    /*
    	lit-html directive that removes and attribute if it is undefined
    */

    var ifDefined = directive(function (value) {
      return function (part) {
        if (value === undefined && part instanceof AttributePart) {
          if (value !== part.value) {
            var name = part.committer.name;
            part.committer.element.removeAttribute(name);
          }
        } else if (part.committer && part.committer.element && part.committer.element.getAttribute(part.committer.name) === value) {
          part.setValue(noChange);
        } else {
          part.setValue(value);
        }
      };
    });

    function _templateObject3() {
      var data = _taggedTemplateLiteral(["<span class=\"ui5-hidden-text\">", "</span>"]);

      _templateObject3 = function _templateObject3() {
        return data;
      };

      return data;
    }

    function _templateObject2() {
      var data = _taggedTemplateLiteral(["<ui5-icon class=\"ui5-button-icon\" name=\"", "\" show-tooltip=", "></ui5-icon>"]);

      _templateObject2 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject$1() {
      var data = _taggedTemplateLiteral(["<button type=\"button\" class=\"ui5-button-root\" ?disabled=\"", "\" data-sap-focus-ref  dir=\"", "\" @focusout=", " @focusin=", " @click=", " @mousedown=", " @mouseup=", " @keydown=", " @keyup=", " tabindex=", " aria-expanded=\"", "\" aria-controls=\"", "\" aria-haspopup=\"", "\" aria-label=\"", "\" title=\"", "\" part=\"button\">", "<span id=\"", "-content\" class=\"ui5-button-text\"><bdi><slot></slot></bdi></span>", "</button>"]);

      _templateObject$1 = function _templateObject() {
        return data;
      };

      return data;
    }

    var block0 = function block0(context) {
      return html(_templateObject$1(), context.disabled, ifDefined(context.rtl), context._onfocusout, context._onfocusin, context._onclick, context._onmousedown, context._onmouseup, context._onkeydown, context._onkeyup, ifDefined(context.tabIndexValue), ifDefined(context.accInfo.ariaExpanded), ifDefined(context.accInfo.ariaControls), ifDefined(context.accInfo.ariaHaspopup), ifDefined(context.ariaLabelText), ifDefined(context.accInfo.title), context.icon ? block1(context) : undefined, ifDefined(context._id), context.hasButtonType ? block2(context) : undefined);
    };

    var block1 = function block1(context) {
      return html(_templateObject2(), ifDefined(context.icon), ifDefined(context.iconOnly));
    };

    var block2 = function block2(context) {
      return html(_templateObject3(), ifDefined(context.buttonTypeText));
    };

    function _templateObject3$1() {
      var data = _taggedTemplateLiteral(["", "<g role=\"presentation\"><path transform=\"translate(0, 512) scale(1, -1)\" d=\"", "\"/></g>"]);

      _templateObject3$1 = function _templateObject3() {
        return data;
      };

      return data;
    }

    function _templateObject2$1() {
      var data = _taggedTemplateLiteral(["<title id=\"", "-tooltip\">", "</title>"]);

      _templateObject2$1 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject$2() {
      var data = _taggedTemplateLiteral(["<svg class=\"ui5-icon-root\" tabindex=\"", "\" dir=\"", "\" viewBox=\"0 0 512 512\" role=\"", "\" focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" aria-label=\"", "\" xmlns=\"http://www.w3.org/2000/svg\" @focusin=", " @focusout=", " @keydown=", " @keyup=", " @click=", ">", "</svg>"]);

      _templateObject$2 = function _templateObject() {
        return data;
      };

      return data;
    }

    var block0$1 = function block0(context) {
      return html(_templateObject$2(), ifDefined(context.tabIndex), ifDefined(context.dir), ifDefined(context.role), ifDefined(context.accessibleNameText), context._onfocusin, context._onfocusout, context._onkeydown, context._onkeyup, context._onclick, blockSVG1(context));
    };

    var block1$1 = function block1(context) {
      return svg(_templateObject2$1(), ifDefined(context._id), ifDefined(context.accessibleNameText));
    };

    var blockSVG1 = function blockSVG1(context) {
      return svg(_templateObject3$1(), context.hasIconTooltip ? block1$1(context) : undefined, ifDefined(context.pathData));
    };

    var defaultThemeBase = ":root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#e9730c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#e9730c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#e9730c;--sapInformativeTextColor:#053b70;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#e9730c;--sapWarningBorderColor:#e9730c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#e9730c;--sapIndicationColor_3_Hover_Background:#da6c0b;--sapIndicationColor_3_Active_Background:#cc650b;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:lucida console,monospace;--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#e0e0e0;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#e0e0e0 0%,#e0e0e0 35%,#d3d3d3 50%,#e0e0e0 65%,#e0e0e0);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#fff;--sapShell_Navigation_SelectedColor:#0854a0;--sapShell_Navigation_Selected_TextColor:#0854a0;--sapShell_Navigation_TextColor:#32363a;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#e9730c;--sapButton_Attention_TextColor:#e9730c;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#e9730c;--sapButton_Attention_Hover_TextColor:#e9730c;--sapButton_Attention_Active_Background:#d1670b;--sapButton_Attention_Active_BorderColor:#d1670b;--sapButton_Attention_Selected_Background:#d1670b;--sapButton_Attention_Selected_BorderColor:#d1670b;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#e9730c;--sapButton_Attention_Selected_Hover_BorderColor:#e9730c;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Critical_Background:#e9730c;--sapButton_Critical_BorderColor:#e9730c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#c7620a;--sapButton_Critical_Hover_BorderColor:#c7620a;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#b85b0a;--sapButton_Critical_Active_BorderColor:#b85b0a;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_WarningColor:#e9730c;--sapField_WarningBackground:#fff;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e4e4e4;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e4e4e4;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#fafafa;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d8d8d8;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d8d8d8;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d8d8d8;--sapList_TableFixedBorderColor:#d8d8d8;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}";

    var defaultTheme = ":root{--_ui5_content_density:cozy;--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_custom_list_item_height:3rem;--_ui5_custom_list_item_rb_min_width:3rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_input_inner_padding:0 0.75rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapMFontLargeSize);--_ui5_list_item_img_size:2rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:3rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_size:1rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_rb_height:2.75rem;--_ui5_rb_label_side_padding:.875rem;--_ui5_rb_focus_dist:.5rem;--_ui5_rb_inner_size:2.75rem;--_ui5_rb_svg_size:1.375rem;--_ui5_rb_label_width:calc(100% - 2.75rem);--_ui5_rb_rtl_focus_right:0.5rem;--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_text_text_only:3rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_size:1.5rem;--_ui5_tc_item_add_text_margin_top:0.625rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5-responnsive_popover_header_height:2.75rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--ui5-badge-font-size:0.75em;--_ui5_button_base_min_compact_width:2rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_transparent_border_color:transparent;--_ui5_button_transparent_hover_border_color:var(--sapButton_BorderColor);--_ui5_button_active_border_color:var(--sapButton_Active_BorderColor);--_ui5_button_positive_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_positive_border_hover_color:var(--sapButton_Accept_Hover_BorderColor);--_ui5_button_positive_border_active_color:var(--sapButton_Accept_Active_BorderColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_negative_active_border_color:var(--sapButton_Reject_Active_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_border_radius:0.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_card_border_color:var(--sapTile_SeparatorColor);--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--_ui5_card_border_color);--_ui5_card_header_focus_border:1px dotted var(--sapContent_FocusColor);--ui5_carousel_button_size:2.125rem;--ui5_carousel_dot_border:none;--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_focus_outline:1px dotted var(--sapContent_FocusColor);--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_datepicker_icon_border:none;--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.125rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.125rem);--_ui5_daypicker_item_selected_hover_background_color:var(--sapActiveColor_Lighten3);--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_compact_height:1.625rem;--_ui5_input_state_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_BorderColor);--_ui5_input_disabled_background:var(--sapField_Background);--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5_input_height:2.25rem;--_ui5_input_disabled_opacity:0.4;--_ui5_input_wrapper_border_radius:0.125rem;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_link_outline_element_size:calc(100% - 0.125rem);--_ui5_link_opacity:0.4;--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--_ui5_listitembase_focus_width:1px;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_messagestrip_icon_width:2.5rem;--_ui5_messagestrip_border_radius:0.1875rem;--_ui5_messagestrip_button_border_width:0;--_ui5_messagestrip_button_border_style:none;--_ui5_messagestrip_button_border_color:transparent;--_ui5_messagestrip_button_border_radius:0;--_ui5_messagestrip_padding:0.125rem .125rem;--_ui5_messagestrip_button_height:1.625rem;--_ui5_messagestrip_border_width:1px;--_ui5_messagestrip_close_button_border:none;--_ui5_messagestrip_close_button_size:1.625rem;--_ui5_messagestrip_icon_top:0.4375rem;--_ui5_messagestrip_focus_width:1px;--_ui5_panel_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popover_content_padding:.4375em;--_ui5_radiobutton_min_width:2.75rem;--_ui5_radiobutton_min_width_compact:2rem;--_ui5_radiobutton_hover_fill:var(--sapField_Hover_Background);--_ui5_radiobutton_border_width:1px;--_ui5_radiobutton_selected_fill:var(--sapSelectedColor);--_ui5_radiobutton_selected_error_fill:var(--sapField_InvalidColor);--_ui5_radiobutton_selected_warning_fill:var(--sapField_TextColor);--_ui5_radiobutton_warning_error_border_dash:0;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_outline:1px;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_compact_no_label_height:1rem;--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_border_radius:0.75rem;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height:4.6875rem;--_ui5_tc_header_height_compact:3.6875rem;--_ui5_tc_header_height_text_only:3rem;--_ui5_tc_header_height_text_only_compact:2rem;--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headerItem_positive_selected_border_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_selected_border_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_selected_border_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_selected_border_color:var(--sapNeutralColor);--_ui5_tc_headerItem_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItemContent_border_bottom:0.188rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapHighlightColor);--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_warning_border_width:2px;--_ui5_TimelineItem_arrow_size:1.625rem;--_ui5_TimelineItem_bubble_outline_width:0.0625rem;--_ui5_TimelineItem_bubble_outline_top:-0.125rem;--_ui5_TimelineItem_bubble_outline_right:-0.125rem;--_ui5_TimelineItem_bubble_outline_bottom:-0.125rem;--_ui5_TimelineItem_bubble_outline_left:-0.625rem;--_ui5_TimelineItem_bubble_rtl_left_offset:-0.125rem;--_ui5_TimelineItem_bubble_rtl_right_offset:-0.625rem;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:15rem;--_ui5_wheelslider_mobile_height:27rem;--_ui5_wheelslider_arrows_visibility:hidden;--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapList_Hover_Background);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_item_width:3rem;--_ui5_wheelslider_item_height:2.875rem;--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_header_row_outline_width:1px;--ui5_table_row_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5-multi_combobox_token_margin_top:1px}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_token_wrapper_left_padding:0;--_ui5_button_icon_font_size:1rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2)}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact;--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_padding:0;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_custom_list_item_height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_size:1.75rem;--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_size:.75rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_rb_height:2rem;--_ui5_rb_label_side_padding:.5rem;--_ui5_rb_focus_dist:.375rem;--_ui5_rb_inner_size:2rem;--_ui5_rb_svg_size:1rem;--_ui5_rb_label_width:calc(100% - 2rem + 1px);--_ui5_rb_rtl_focus_right:0.375rem;--_ui5_wheelslider_item_width:4rem;--_ui5_wheelslider_item_height:2rem;--_ui5_wheelslider_height:14rem;--_ui5_wheelslider_arrows_visibility:visible;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_track_no_label_height:var(--_ui5_switch_track_compact_no_label_height);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_icon_size:1rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_radiobutton_min_width:var(--_ui5_radiobutton_min_width_compact);--_ui5-responnsive_popover_header_height:2.5rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem}";

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
    var iconCss = ":host(:not([hidden])){display:inline-block}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scale(-1);transform-origin:center}.ui5-icon-root{display:flex;transform:scaleY(-1);transform-origin:center;outline:none}";

    var ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";
    /**
     * @public
     */

    var metadata$1 = {
      tag: "ui5-icon",
      properties:
      /** @lends sap.ui.webcomponents.main.Icon.prototype */
      {
        /**
         * Defines if the icon is interactive (focusable and pressable)
         * @type {boolean}
         * @defaultvalue false
         * @public
         * @since 1.0.0-rc.8
         */
        interactive: {
          type: Boolean
        },

        /**
         * Defines the unique identifier (icon name) of each <code>ui5-icon</code>.
         * <br><br>
         * To browse all available icons, see the
         * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
         * <br><br>
         * Example:
         * <br>
         * <code>name='add'</code>, <code>name='delete'</code>, <code>name='employee'</code>.
         *
         * @type {string}
         * @defaultvalue ""
         * @public
        */
        name: {
          type: String
        },

        /**
         * Defines the text alternative of the <code>ui5-icon</code>.
         * If not provided a default text alternative will be set, if present.
         * <br><br>
         * <b>Note:</b> Every icon should have a text alternative in order to
         * calculate its accessible name.
         *
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        accessibleName: {
          type: String
        },

        /**
         * Defines whether the <code>ui5-icon</code> should have a tooltip.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        showTooltip: {
          type: Boolean
        },

        /**
         * @private
         */
        pathData: {
          type: String,
          noAttribute: true
        },

        /**
         * @private
         */
        accData: {
          type: Object,
          noAttribute: true
        },

        /**
         * @private
         */
        focused: {
          type: Boolean
        },

        /**
        * @private
        */
        invalid: {
          type: Boolean
        }
      },
      events: {
        /**
         * Fired on mouseup, space and enter if icon is interactive
         * @private
         * @since 1.0.0-rc.8
         */
        click: {}
      }
    };
    /**
     * @class
     * <h3 class="comment-api-title">Overview</h3>
     *
     * The <code>ui5-icon</code> component represents an SVG icon.
     * There are two main scenarios how the <code>ui5-icon</code> component is used:
     * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
     * <br><br>
     * A large set of built-in icons is available
     * and they can be used by setting the <code>name</code> property on the <code>ui5-icon</code>.
     *
     * <h3>ES6 Module Import</h3>
     *
     * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
     *
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.Icon
     * @extends sap.ui.webcomponents.base.UI5Element
     * @tagname ui5-icon
     * @public
     */

    var Icon =
    /*#__PURE__*/
    function (_UI5Element) {
      _inherits(Icon, _UI5Element);

      function Icon() {
        var _this;

        _classCallCheck(this, Icon);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Icon).call(this));
        _this.i18nBundle = getI18nBundle("@ui5/webcomponents");
        return _this;
      }

      _createClass(Icon, [{
        key: "_onfocusin",
        value: function _onfocusin(event) {
          if (this.interactive) {
            this.focused = true;
          }
        }
      }, {
        key: "_onfocusout",
        value: function _onfocusout(event) {
          this.focused = false;
        }
      }, {
        key: "_onkeydown",
        value: function _onkeydown(event) {
          if (this.interactive && isEnter(event)) {
            this.fireEvent("click");
          }
        }
      }, {
        key: "_onkeyup",
        value: function _onkeyup(event) {
          if (this.interactive && isSpace(event)) {
            this.fireEvent("click");
          }
        }
      }, {
        key: "_onclick",
        value: function _onclick(event) {
          if (this.interactive) {
            event.preventDefault(); // Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown

            this.fireEvent("click");
          }
        }
      }, {
        key: "onBeforeRendering",
        value: function () {
          var _onBeforeRendering = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var name, iconData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    name = this.name;

                    if (name) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt("return", console.warn("Icon name property is required", this));

                  case 3:
                    iconData = getIconDataSync(name);

                    if (iconData) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 7;
                    return getIconData(name);

                  case 7:
                    iconData = _context.sent;

                  case 8:
                    if (!(iconData === ICON_NOT_FOUND$1)) {
                      _context.next = 11;
                      break;
                    }

                    this.invalid = true;
                    /* eslint-disable-next-line */

                    return _context.abrupt("return", console.warn("Required icon is not registered. You can either import the icon as a module in order to use it e.g. \"@ui5/webcomponents-icons/dist/icons/".concat(name.replace("sap-icon://", ""), ".js\", or setup a JSON build step and import \"@ui5/webcomponents-icons/dist/Assets.js\".")));

                  case 11:
                    if (iconData) {
                      _context.next = 14;
                      break;
                    }

                    this.invalid = true;
                    /* eslint-disable-next-line */

                    return _context.abrupt("return", console.warn("Required icon is not registered. Invalid icon name: ".concat(this.name)));

                  case 14:
                    this.pathData = iconData.pathData;
                    this.accData = iconData.accData;

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function onBeforeRendering() {
            return _onBeforeRendering.apply(this, arguments);
          }

          return onBeforeRendering;
        }()
      }, {
        key: "onEnterDOM",
        value: function () {
          var _onEnterDOM = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var _this2 = this;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    setTimeout(function () {
                      _this2.constructor.removeGlobalStyle(); // remove the global style as Icon.css is already in place

                    }, 0);

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function onEnterDOM() {
            return _onEnterDOM.apply(this, arguments);
          }

          return onEnterDOM;
        }()
      }, {
        key: "tabIndex",
        get: function get() {
          return this.interactive ? "0" : "-1";
        }
      }, {
        key: "role",
        get: function get() {
          if (this.interactive) {
            return "button";
          }

          return this.accessibleNameText ? "img" : "presentation";
        }
      }, {
        key: "hasIconTooltip",
        get: function get() {
          return this.showTooltip && this.accessibleNameText;
        }
      }, {
        key: "accessibleNameText",
        get: function get() {
          if (this.accessibleName) {
            return this.accessibleName;
          }

          return this.i18nBundle.getText(this.accData) || undefined;
        }
      }, {
        key: "dir",
        get: function get() {
          return getRTL$1() ? "rtl" : "ltr";
        }
      }], [{
        key: "onDefine",
        value: function () {
          var _onDefine = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.createGlobalStyle(); // hide all icons until the first icon has rendered (and added the Icon.css)

                    _context3.next = 3;
                    return fetchI18nBundle("@ui5/webcomponents");

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function onDefine() {
            return _onDefine.apply(this, arguments);
          }

          return onDefine;
        }()
      }, {
        key: "createGlobalStyle",
        value: function createGlobalStyle() {
          if (!window.ShadyDOM) {
            return;
          }

          var styleElement = document.head.querySelector("style[data-ui5-icon-global]");

          if (!styleElement) {
            createStyleInHead("ui5-icon { display: none !important; }", {
              "data-ui5-icon-global": ""
            });
          }
        }
      }, {
        key: "removeGlobalStyle",
        value: function removeGlobalStyle() {
          if (!window.ShadyDOM) {
            return;
          }

          var styleElement = document.head.querySelector("style[data-ui5-icon-global]");

          if (styleElement) {
            document.head.removeChild(styleElement);
          }
        }
      }, {
        key: "metadata",
        get: function get() {
          return metadata$1;
        }
      }, {
        key: "render",
        get: function get() {
          return litRender;
        }
      }, {
        key: "template",
        get: function get() {
          return block0$1;
        }
      }, {
        key: "styles",
        get: function get() {
          return iconCss;
        }
      }]);

      return Icon;
    }(UI5Element);

    Icon.define();

    var ARIA_LABEL_CARD_CONTENT = {
      key: "ARIA_LABEL_CARD_CONTENT",
      defaultText: "Card Content"
    };
    var ARIA_ROLEDESCRIPTION_CARD = {
      key: "ARIA_ROLEDESCRIPTION_CARD",
      defaultText: "Card"
    };
    var ARIA_ROLEDESCRIPTION_CARD_HEADER = {
      key: "ARIA_ROLEDESCRIPTION_CARD_HEADER",
      defaultText: "Card Header"
    };
    var ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = {
      key: "ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER",
      defaultText: "Interactive Card Header"
    };
    var AVATAR_TOOLTIP = {
      key: "AVATAR_TOOLTIP",
      defaultText: "Avatar"
    };
    var BUTTON_ARIA_TYPE_ACCEPT = {
      key: "BUTTON_ARIA_TYPE_ACCEPT",
      defaultText: "Positive Action"
    };
    var BUTTON_ARIA_TYPE_REJECT = {
      key: "BUTTON_ARIA_TYPE_REJECT",
      defaultText: "Negative Action"
    };
    var BUTTON_ARIA_TYPE_EMPHASIZED = {
      key: "BUTTON_ARIA_TYPE_EMPHASIZED",
      defaultText: "Emphasized"
    };
    var LINK_SUBTLE = {
      key: "LINK_SUBTLE",
      defaultText: "Subtle"
    };
    var LINK_EMPHASIZED = {
      key: "LINK_EMPHASIZED",
      defaultText: "Emphasized"
    };

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
    var buttonCss = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit}:host(:not([active]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background)}.ui5-button-icon{font-size:var(--_ui5_button_icon_font_size);height:0;top:-.5rem;position:relative;color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{max-width:calc(100% - 1rem);margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([active]:not([disabled])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--_ui5_button_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([active]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--_ui5_button_positive_border_color);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--_ui5_button_positive_border_hover_color)}:host([design=Positive][active]){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--_ui5_button_positive_border_active_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Positive][focused]){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([design=Negative][active]){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--_ui5_button_negative_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor)}:host([design=Empasized][active]){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]){outline-color:var(--sapContent_ContrastFocusColor);border-color:var(--_ui5_button_emphasized_focused_border_color)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--_ui5_button_transparent_border_color)}:host([design=Transparent]):hover{background-color:var(--sapButton_Lite_Hover_Background)}:host([design=Transparent][active]){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--_ui5_button_transparent_hover_border_color)}ui5-button[focused]{outline:none}ui5-button[focused] .ui5-button-root{position:relative}ui5-button[focused] .ui5-button-root:after{content:\"\";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}ui5-button[active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}ui5-button[design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}ui5-button[design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button ui5-icon.ui5-button-icon{height:1rem;top:0}";

    var isGlobalHandlerAttached = false;
    var activeButton = null;
    /**
     * @public
     */

    var metadata$2 = {
      tag: "ui5-button",
      properties:
      /** @lends sap.ui.webcomponents.main.Button.prototype */
      {
        /**
         * Defines the <code>ui5-button</code> design.
         * <br><br>
         * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
         * "Negative", and "Transparent".
         *
         * @type {ButtonDesign}
         * @defaultvalue "Default"
         * @public
         */
        design: {
          type: ButtonDesign,
          defaultValue: ButtonDesign.Default
        },

        /**
         * Defines whether the <code>ui5-button</code> is disabled
         * (default is set to <code>false</code>).
         * A disabled <code>ui5-button</code> can't be pressed or
         * focused, and it is not in the tab chain.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        disabled: {
          type: Boolean
        },

        /**
         * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
         * The SAP-icons font provides numerous options.
         * <br><br>
         * Example:
         * <br>
         * <pre>ui5-button icon="palette"</pre>
         *
         * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
         *
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        icon: {
          type: String
        },

        /**
         * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        iconEnd: {
          type: Boolean
        },

        /**
         * When set to <code>true</code>, the <code>ui5-button</code> will
         * automatically submit the nearest form element upon <code>press</code>.
         * <br><br>
         * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
         * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        submits: {
          type: Boolean
        },

        /**
         * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
         * @private
         */
        active: {
          type: Boolean
        },

        /**
         * Defines if a content has been added to the default slot
         * @private
         */
        iconOnly: {
          type: Boolean
        },

        /**
         * Indicates if the elements is on focus
         * @private
         */
        focused: {
          type: Boolean
        },

        /**
         * Indicates if the elements has a slotted icon
         * @private
         */
        hasIcon: {
          type: Boolean
        },

        /**
         * Defines the aria-label attribute for the button
         * @type {String}
         * @defaultvalue: ""
         * @private
         * @since 1.0.0-rc.7
         */
        ariaLabel: {
          type: String,
          defaultValue: undefined
        },

        /**
         * Receives id(or many ids) of the elements that label the button
         * @type {String}
         * @defaultvalue ""
         * @private
         * @since 1.0.0-rc.7
         */
        ariaLabelledby: {
          type: String,
          defaultValue: ""
        },

        /**
         * Indicates if the element if focusable
         * @private
         */
        nonFocusable: {
          type: Boolean
        },
        _iconSettings: {
          type: Object
        },
        _buttonAccInfo: {
          type: Object
        },

        /**
         * Defines the tabIndex of the component.
         * @private
         */
        _tabIndex: {
          type: String,
          defaultValue: "0",
          noAttribute: true
        }
      },
      managedSlots: true,
      slots:
      /** @lends sap.ui.webcomponents.main.Button.prototype */
      {
        /**
         * Defines the text of the <code>ui5-button</code>.
         * <br><br>
         * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
         *
         * @type {Node[]}
         * @slot
         * @public
         */
        "default": {
          type: Node
        }
      },
      events:
      /** @lends sap.ui.webcomponents.main.Button.prototype */
      {
        /**
         * Fired when the <code>ui5-button</code> is activated either with a
         * mouse/tap or by using the Enter or Space key.
         * <br><br>
         * <b>Note:</b> The event will not be fired if the <code>disabled</code>
         * property is set to <code>true</code>.
         *
         * @event
         * @public
         */
        click: {}
      }
    };
    /**
     * @class
     *
     * <h3 class="comment-api-title">Overview</h3>
     *
     * The <code>ui5-button</code> component represents a simple push button.
     * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
     * certain keyboard keys, such as Enter.
     *
     *
     * <h3>Usage</h3>
     *
     * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
     * whether the text or the icon is displayed first.
     * <br><br>
     * You can choose from a set of predefined types that offer different
     * styling to correspond to the triggered action.
     * <br><br>
     * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
     * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
     * its style to provide visual feedback to the user that it is pressed or hovered over with
     * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
     *
     * <h3>ES6 Module Import</h3>
     *
     * <code>import "@ui5/webcomponents/dist/Button";</code>
     *
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.Button
     * @extends UI5Element
     * @tagname ui5-button
     * @public
     */

    var Button =
    /*#__PURE__*/
    function (_UI5Element) {
      _inherits(Button, _UI5Element);

      _createClass(Button, null, [{
        key: "metadata",
        get: function get() {
          return metadata$2;
        }
      }, {
        key: "styles",
        get: function get() {
          return buttonCss;
        }
      }, {
        key: "render",
        get: function get() {
          return litRender;
        }
      }, {
        key: "template",
        get: function get() {
          return block0;
        }
      }]);

      function Button() {
        var _this;

        _classCallCheck(this, Button);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));

        _this._deactivate = function () {
          if (activeButton) {
            activeButton.active = false;
          }
        };

        if (!isGlobalHandlerAttached) {
          document.addEventListener("mouseup", _this._deactivate);
          isGlobalHandlerAttached = true;
        }

        _this.i18nBundle = getI18nBundle("@ui5/webcomponents");
        return _this;
      }

      _createClass(Button, [{
        key: "onBeforeRendering",
        value: function onBeforeRendering() {
          var FormSupport = getFeature("FormSupport");

          if (this.submits && !FormSupport) {
            console.warn("In order for the \"submits\" property to have effect, you should also: import \"@ui5/webcomponents/dist/features/InputElementsFormSupport.js\";"); // eslint-disable-line
          }

          this.iconOnly = !this.textContent;
          this.hasIcon = !!this.icon;
        }
      }, {
        key: "_onclick",
        value: function _onclick(event) {
          event.isMarked = "button";
          var FormSupport = getFeature("FormSupport");

          if (FormSupport) {
            FormSupport.triggerFormSubmit(this);
          }
        }
      }, {
        key: "_onmousedown",
        value: function _onmousedown(event) {
          event.isMarked = "button";
          this.active = true;
          activeButton = this; // eslint-disable-line
        }
      }, {
        key: "_onmouseup",
        value: function _onmouseup(event) {
          event.isMarked = "button";
        }
      }, {
        key: "_onkeydown",
        value: function _onkeydown(event) {
          event.isMarked = "button";

          if (isSpace(event) || isEnter(event)) {
            this.active = true;
          }
        }
      }, {
        key: "_onkeyup",
        value: function _onkeyup(event) {
          if (isSpace(event) || isEnter(event)) {
            this.active = false;
          }
        }
      }, {
        key: "_onfocusout",
        value: function _onfocusout(_event) {
          this.active = false;
          this.focused = false;
        }
      }, {
        key: "_onfocusin",
        value: function _onfocusin(event) {
          event.isMarked = "button";
          this.focused = true;
        }
      }, {
        key: "rtl",
        get: function get() {
          return getRTL$1() ? "rtl" : undefined;
        }
      }, {
        key: "hasButtonType",
        get: function get() {
          return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
        }
      }, {
        key: "accInfo",
        get: function get() {
          return {
            "ariaExpanded": this._buttonAccInfo && this._buttonAccInfo.ariaExpanded,
            "ariaControls": this._buttonAccInfo && this._buttonAccInfo.ariaControls,
            "ariaHaspopup": this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
            "title": this._buttonAccInfo && this._buttonAccInfo.title
          };
        }
      }, {
        key: "ariaLabelText",
        get: function get() {
          if (!this.ariaLabelledby) {
            if (this.ariaLabel) {
              return this.ariaLabel;
            }

            return undefined;
          }

          var ids = this.ariaLabelledby.split(" ");
          var owner = findNodeOwner(this);
          var result = "";
          ids.forEach(function (elementId, index) {
            var element = owner.querySelector("[id='".concat(elementId, "']"));
            result += "".concat(element ? element.textContent : "");

            if (index < ids.length - 1) {
              result += " ";
            }
          });
          return result;
        }
      }, {
        key: "buttonTypeText",
        get: function get() {
          return this.i18nBundle.getText(Button.typeTextMappings()[this.design]);
        }
      }, {
        key: "tabIndexValue",
        get: function get() {
          var tabindex = this.getAttribute("tabindex");

          if (tabindex) {
            return tabindex;
          }

          return this.nonFocusable ? "-1" : this._tabIndex;
        }
      }], [{
        key: "typeTextMappings",
        value: function typeTextMappings() {
          return {
            "Positive": BUTTON_ARIA_TYPE_ACCEPT,
            "Negative": BUTTON_ARIA_TYPE_REJECT,
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED
          };
        }
      }, {
        key: "onDefine",
        value: function () {
          var _onDefine = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return Promise.all([Icon.define(), fetchI18nBundle("@ui5/webcomponents")]);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onDefine() {
            return _onDefine.apply(this, arguments);
          }

          return onDefine;
        }()
      }]);

      return Button;
    }(UI5Element);

    Button.define();

    function _templateObject5() {
      var data = _taggedTemplateLiteral(["<div id=\"", "-subheading\" class=\"ui5-card-subheading\" part=\"subheading\">", "</div>"]);

      _templateObject5 = function _templateObject5() {
        return data;
      };

      return data;
    }

    function _templateObject4() {
      var data = _taggedTemplateLiteral(["<div id=\"", "-heading\" class=\"ui5-card-heading\" part=\"heading\">", "</div>"]);

      _templateObject4 = function _templateObject4() {
        return data;
      };

      return data;
    }

    function _templateObject3$2() {
      var data = _taggedTemplateLiteral(["<div class=\"ui5-card-avatar\" aria-label=\"", "\"><slot name=\"avatar\"></slot></div>"]);

      _templateObject3$2 = function _templateObject3() {
        return data;
      };

      return data;
    }

    function _templateObject2$2() {
      var data = _taggedTemplateLiteral(["<div class=\"", "\" @click=\"", "\" @keydown=\"", "\" @keyup=\"", "\" role=\"", "\" aria-labelledby=\"", "-subheading ", "-status\" aria-level=\"", "\" aria-roledescription=\"", "\" tabindex=\"0\">", "<div class=\"ui5-card-header-text\">", "", "</div><span id=\"", "-status\" part=\"status\" class=\"ui5-card-status\">", "</span></div>"]);

      _templateObject2$2 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject$3() {
      var data = _taggedTemplateLiteral(["<div class=\"", "\" dir=\"", "\" role=\"region\" aria-labelledby=\"", "-desc ", "-heading\">", "<section role=\"group\" aria-label=\"", "\"><slot></slot></section><span id=\"", "-desc\" class=\"ui5-hidden-text\">", "</span></div>"]);

      _templateObject$3 = function _templateObject() {
        return data;
      };

      return data;
    }

    var block0$2 = function block0(context) {
      return html(_templateObject$3(), classMap(context.classes.main), ifDefined(context.rtl), ifDefined(context._id), ifDefined(context._id), context.hasHeader ? block1$2(context) : undefined, ifDefined(context.ariaCardContentLabel), ifDefined(context._id), ifDefined(context.ariaCardRoleDescription));
    };

    var block1$2 = function block1(context) {
      return html(_templateObject2$2(), classMap(context.classes.header), context._headerClick, context._headerKeydown, context._headerKeyup, ifDefined(context.ariaHeaderRole), ifDefined(context._id), ifDefined(context._id), ifDefined(context.ariaLevel), ifDefined(context.ariaCardHeaderRoleDescription), context.hasAvatar ? block2$1(context) : undefined, context.heading ? block3(context) : undefined, context.subheading ? block4(context) : undefined, ifDefined(context._id), ifDefined(context.status));
    };

    var block2$1 = function block2(context) {
      return html(_templateObject3$2(), ifDefined(context.ariaCardAvatarLabel));
    };

    var block3 = function block3(context) {
      return html(_templateObject4(), ifDefined(context._id), ifDefined(context.heading));
    };

    var block4 = function block4(context) {
      return html(_templateObject5(), ifDefined(context._id), ifDefined(context.subheading));
    };

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
    var cardCss = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block;width:100%}.ui5-card-root{width:100%;height:100%;color:var(--sapGroup_TitleTextColor);background:var(--sapTile_Background);box-shadow:var(--sapContent_Shadow0);border-radius:.25rem;border:1px solid var(--_ui5_card_border_color);overflow:hidden;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);box-sizing:border-box}.ui5-card-header{position:relative;display:flex;align-items:flex-start;background:var(--sapTile_Background);border-bottom:1px solid var(--_ui5_card_header_border_color);padding:var(--_ui5_card_content_padding)}.ui5-card-root.ui5-card--nocontent{height:auto}.ui5-card-root.ui5-card--nocontent .ui5-card-header{border-bottom:none}.ui5-card-header:focus:before{outline:none;content:\"\";position:absolute;border:var(--_ui5_card_header_focus_border);pointer-events:none;top:1px;left:1px;right:1px;bottom:1px}.ui5-card-header.ui5-card-header--interactive:hover{cursor:pointer;background:var(--_ui5_card_header_hover_bg)}.ui5-card-header.ui5-card-header--active,.ui5-card-header.ui5-card-header--interactive:active{background:var(--_ui5_card_header_active_bg)}.ui5-card-header .ui5-card-header-text{flex:1}.ui5-card-header .ui5-card-avatar{height:3rem;width:3rem;display:flex;align-items:center;justify-content:center;margin-right:.75rem}::slotted(ui5-icon){width:1.5rem;height:1.5rem;color:var(--sapTile_IconColor)}::slotted(img){width:100%;height:100%;border-radius:50%}.ui5-card-header .ui5-card-status{display:inline-block;font-family:var(--sapFontFamily);font-size:var(--sapFontSmallSize);color:var(--sapTile_TextColor);text-align:left;line-height:1.125rem;padding-left:1rem;margin-left:auto;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ui5-card-header .ui5-card-header-text .ui5-card-heading{font-family:var(--sapFontFamily);font-size:var(--sapMFontHeader5Size);font-weight:400;color:var(--sapTile_TitleTextColor);max-height:3.5rem}.ui5-card-header .ui5-card-header-text .ui5-card-subheading{font-family:var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;color:var(--sapTile_TextColor);margin-top:.5rem;max-height:2.1rem}.ui5-card-header .ui5-card-header-text .ui5-card-heading,.ui5-card-header .ui5-card-header-text .ui5-card-subheading{text-align:left;text-overflow:ellipsis;white-space:normal;word-wrap:break-word;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;max-width:100%}[dir=rtl] .ui5-card-header .ui5-card-avatar{margin-left:.75rem;margin-right:0}[dir=rtl] .ui5-card-header .ui5-card-status{padding-right:1rem;padding-left:0;margin-right:auto}[dir=rtl] .ui5-card-header .ui5-card-header-text .ui5-card-heading{text-align:right}[dir=rtl] .ui5-card-header .ui5-card-header-text .ui5-card-subheading{text-align:right}";

    /**
     * @public
     */

    var metadata$3 = {
      tag: "ui5-card",
      managedSlots: true,
      slots:
      /** @lends sap.ui.webcomponents.main.Card.prototype */
      {
        /**
         * Defines the content of the <code>ui5-card</code>.
         * @type {HTMLElement[]}
         * @slot
         * @public
         */
        "default": {
          propertyName: "content",
          type: HTMLElement
        },

        /**
         * Defines the visual representation in the header of the card.
         * Supports images and icons.
         * <br><br>
         * <b>Note:</b>
         * SAP-icons font provides numerous options. To find all the available icons, see the
         * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
         * @type {HTMLElement[]}
         * @slot
         * @public
         */
        avatar: {
          type: HTMLElement
        }
      },
      properties:
      /** @lends sap.ui.webcomponents.main.Card.prototype */
      {
        /**
         * Defines the title displayed in the <code>ui5-card</code> header.
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        heading: {
          type: String
        },

        /**
         * Defines the subheading displayed in the <code>ui5-card</code> header.
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        subheading: {
          type: String
        },

        /**
         * Defines the status displayed in the <code>ui5-card</code> header.
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        status: {
          type: String
        },

        /**
         * Defines if the <code>ui5-card</code> header would be interactive,
         * e.g gets hover effect, gets focused and <code>headerPress</code> event is fired, when it is pressed.
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        headerInteractive: {
          type: Boolean
        },
        _headerActive: {
          type: Boolean,
          noAttribute: true
        }
      },
      events:
      /** @lends sap.ui.webcomponents.main.Card.prototype */
      {
        /**
         * Fired when the <code>ui5-card</code> header is activated
         * by mouse/tap or by using the Enter or Space key.
         * <br><br>
         * <b>Note:</b> The event would be fired only if the <code>headerInteractive</code> property is set to true.
         * @event
         * @public
         * @since 0.10.0
         */
        headerClick: {}
      }
    };
    /**
     * @class
     * <h3 class="comment-api-title">Overview</h3>
     *
     * The <code>ui5-card</code> is a component that represents information in the form of a
     * tile with separate header and content areas.
     * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
     * The header can be used through several properties, such as:
     * <code>heading</code>, <code>subheading</code>, <code>status</code>
     * and a slot:
     * <code>avatar</code>.
     *
     * <h3>Keyboard handling</h3>
     * In case you enable <code>headerInteractive</code> property, you can press the <code>ui5-card</code> header by Space and Enter keys.
     *
     * <h3>ES6 Module Import</h3>
     *
     * <code>import "@ui5/webcomponents/dist/Card";</code>
     *
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.Card
     * @extends sap.ui.webcomponents.base.UI5Element
     * @tagname ui5-card
     * @public
     */

    var Card =
    /*#__PURE__*/
    function (_UI5Element) {
      _inherits(Card, _UI5Element);

      function Card() {
        var _this;

        _classCallCheck(this, Card);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this));
        _this.i18nBundle = getI18nBundle("@ui5/webcomponents");
        return _this;
      }

      _createClass(Card, [{
        key: "_headerClick",
        value: function _headerClick() {
          if (this.headerInteractive) {
            this.fireEvent("headerClick");
          }
        }
      }, {
        key: "_headerKeydown",
        value: function _headerKeydown(event) {
          if (!this.headerInteractive) {
            return;
          }

          var enter = isEnter(event);
          var space = isSpace(event);
          this._headerActive = enter || space;

          if (enter) {
            this.fireEvent("headerClick");
            return;
          }

          if (space) {
            event.preventDefault();
          }
        }
      }, {
        key: "_headerKeyup",
        value: function _headerKeyup(event) {
          if (!this.headerInteractive) {
            return;
          }

          var space = isSpace(event);
          this._headerActive = false;

          if (space) {
            this.fireEvent("headerClick");
          }
        }
      }, {
        key: "classes",
        get: function get() {
          return {
            main: {
              "ui5-card-root": true,
              "ui5-card--nocontent": !this.content.length
            },
            header: {
              "ui5-card-header": true,
              "ui5-card-header--interactive": this.headerInteractive,
              "ui5-card-header--active": this.headerInteractive && this._headerActive
            }
          };
        }
      }, {
        key: "icon",
        get: function get() {
          return !!this.avatar && this.avatar.startsWith("sap-icon://");
        }
      }, {
        key: "image",
        get: function get() {
          return !!this.avatar && !this.icon;
        }
      }, {
        key: "ariaHeaderRole",
        get: function get() {
          return this.headerInteractive ? "button" : "heading";
        }
      }, {
        key: "ariaLevel",
        get: function get() {
          return this.headerInteractive ? undefined : "3";
        }
      }, {
        key: "hasHeader",
        get: function get() {
          return !!(this.heading || this.subheading || this.status || this.avatar);
        }
      }, {
        key: "rtl",
        get: function get() {
          return getRTL$1() ? "rtl" : undefined;
        }
      }, {
        key: "ariaCardRoleDescription",
        get: function get() {
          return this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD);
        }
      }, {
        key: "ariaCardHeaderRoleDescription",
        get: function get() {
          return this.headerInteractive ? this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
        }
      }, {
        key: "ariaCardAvatarLabel",
        get: function get() {
          return this.i18nBundle.getText(AVATAR_TOOLTIP);
        }
      }, {
        key: "ariaCardContentLabel",
        get: function get() {
          return this.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
        }
      }, {
        key: "hasAvatar",
        get: function get() {
          return !!this.avatar.length;
        }
      }], [{
        key: "onDefine",
        value: function () {
          var _onDefine = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return Promise.all([Icon.define(), fetchI18nBundle("@ui5/webcomponents")]);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onDefine() {
            return _onDefine.apply(this, arguments);
          }

          return onDefine;
        }()
      }, {
        key: "metadata",
        get: function get() {
          return metadata$3;
        }
      }, {
        key: "render",
        get: function get() {
          return litRender;
        }
      }, {
        key: "template",
        get: function get() {
          return block0$2;
        }
      }, {
        key: "styles",
        get: function get() {
          return cardCss;
        }
      }]);

      return Card;
    }(UI5Element);

    Card.define();

    function _templateObject$4() {
      var data = _taggedTemplateLiteral(["<label class=\"ui5-label-root\" dir=\"", "\" @click=", "  for=\"", "\"><span class=\"ui5-label-text-wrapper\"><bdi id=\"", "-bdi\"><slot></slot></bdi></span><span class=\"ui5-label-required-colon\"></span></label>"]);

      _templateObject$4 = function _templateObject() {
        return data;
      };

      return data;
    }

    var block0$3 = function block0(context) {
      return html(_templateObject$4(), ifDefined(context.rtl), context._onclick, ifDefined(context["for"]), ifDefined(context._id));
    };

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
    var labelCss = ":host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}:host(:not([wrap])) .ui5-label-root{width:100%;font-weight:inherit;display:inline-block;white-space:nowrap;cursor:inherit;overflow:hidden}bdi{content:\"\";padding-right:.15625rem}:host(:not([wrap])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;max-width:100%}:host(:not([wrap])[required][show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .85rem)}:host(:not([wrap])[required]) .ui5-label-text-wrapper{max-width:calc(100% - .475rem)}:host(:not([wrap])[show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .2rem)}:host([show-colon]) .ui5-label-required-colon:before{content:\":\"}:host([required]) .ui5-label-required-colon:after{content:\"*\";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-right:0;margin-left:.125rem}:host([required][show-colon]) [dir=rtl] .ui5-label-required-colon:after{margin-right:.125rem;margin-left:0}";

    /**
     * @public
     */

    var metadata$4 = {
      tag: "ui5-label",
      properties:
      /** @lends sap.ui.webcomponents.main.Label.prototype */
      {
        /**
         * Defines whether an asterisk character is added to the <code>ui5-label</code> text.
         * <br><br>
         * <b>Note:</b> Usually indicates that user input is required.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        required: {
          type: Boolean
        },

        /**
         * Determines whether the <code>ui5-label</code> should wrap, when there is not enough space.
         * <br><br>
         * <b>Note:</b> By default the text would truncate.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        wrap: {
          type: Boolean
        },

        /**
         * Defines whether semi-colon is added to the <code>ui5-label</code> text.
         * <br><br>
         * <b>Note:</b> Usually used in forms.
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        showColon: {
          type: Boolean
        },

        /**
         * Defines the labeled input by providing its ID.
         * <br><br>
         * <b>Note:</b> Can be used with both <code>ui5-input</code> and native input.
         *
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        "for": {
          type: String
        }
      },
      slots:
      /** @lends sap.ui.webcomponents.main.Label.prototype */
      {
        /**
         * Defines the text of the <code>ui5-label</code>.
         * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
         *
         * @type {Node[]}
         * @slot
         * @public
         */
        "default": {
          type: Node
        }
      }
    };
    /**
     * @class
     *
     * <h3 class="comment-api-title">Overview</h3>
     *
     * The <code>ui5-label</code> is a component used to represent a label,
     * providing valuable information to the user.
     * Usually it is placed next to a value holder, such as a text field.
     * It informs the user about what data is displayed or expected in the value holder.
     * <br><br>
     * The <code>ui5-label</code> appearance can be influenced by properties,
     * such as <code>required</code> and <code>wrap</code>.
     * The appearance of the Label can be configured in a limited way by using the design property.
     * For a broader choice of designs, you can use custom styles.
     *
     * <h3>ES6 Module Import</h3>
     *
     * <code>import "@ui5/webcomponents/dist/Label";</code>
     *
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.Label
     * @extends sap.ui.webcomponents.base.UI5Element
     * @tagname ui5-label
     * @public
     */

    var Label =
    /*#__PURE__*/
    function (_UI5Element) {
      _inherits(Label, _UI5Element);

      function Label() {
        _classCallCheck(this, Label);

        return _possibleConstructorReturn(this, _getPrototypeOf(Label).apply(this, arguments));
      }

      _createClass(Label, [{
        key: "_onclick",
        value: function _onclick() {
          var elementToFocus = document.getElementById(this["for"]);

          if (elementToFocus) {
            elementToFocus.focus();
          }
        }
      }, {
        key: "rtl",
        get: function get() {
          return getRTL$1() ? "rtl" : undefined;
        }
      }], [{
        key: "metadata",
        get: function get() {
          return metadata$4;
        }
      }, {
        key: "render",
        get: function get() {
          return litRender;
        }
      }, {
        key: "template",
        get: function get() {
          return block0$3;
        }
      }, {
        key: "styles",
        get: function get() {
          return labelCss;
        }
      }]);

      return Label;
    }(UI5Element);

    Label.define();

    /**
     * @lends sap.ui.webcomponents.main.types.LinkDesign.prototype
     * @public
     */

    var LinkTypes = {
      /**
       * default type (no special styling)
       * @public
       * @type {Default}
       */
      Default: "Default",

      /**
       * subtle type (appears as regular text, rather than a link)
       * @public
       * @type {Subtle}
       */
      Subtle: "Subtle",

      /**
       * emphasized type
       * @public
       * @type {Emphasized}
       */
      Emphasized: "Emphasized"
    };
    /**
     * @class
     * Different types of Button.
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.types.LinkDesign
     * @public
     * @enum {string}
     */

    var LinkDesign =
    /*#__PURE__*/
    function (_DataType) {
      _inherits(LinkDesign, _DataType);

      function LinkDesign() {
        _classCallCheck(this, LinkDesign);

        return _possibleConstructorReturn(this, _getPrototypeOf(LinkDesign).apply(this, arguments));
      }

      _createClass(LinkDesign, null, [{
        key: "isValid",
        value: function isValid(value) {
          return !!LinkTypes[value];
        }
      }]);

      return LinkDesign;
    }(DataType);

    LinkDesign.generataTypeAcessors(LinkTypes);

    function _templateObject2$3() {
      var data = _taggedTemplateLiteral(["<span class=\"ui5-hidden-text\">", "</span>"]);

      _templateObject2$3 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject$5() {
      var data = _taggedTemplateLiteral(["<a class=\"ui5-link-root\" role=\"link\" href=\"", "\" target=\"", "\" rel=\"", "\" tabindex=\"", "\" ?disabled=\"", "\" aria-disabled=\"", "\" @focusin=", " @click=", " @keydown=", " @keyup=", "><slot></slot>", "</a>"]);

      _templateObject$5 = function _templateObject() {
        return data;
      };

      return data;
    }

    var block0$4 = function block0(context) {
      return html(_templateObject$5(), ifDefined(context.parsedRef), ifDefined(context.target), ifDefined(context._rel), ifDefined(context.tabIndex), context.disabled, ifDefined(context.ariaDisabled), context._onfocusin, context._onclick, context._onkeydown, context._onkeyup, context.hasLinkType ? block1$3(context) : undefined);
    };

    var block1$3 = function block1(context) {
      return html(_templateObject2$3(), ifDefined(context.linkTypeText));
    };

    registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
    registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
    var linkCss = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapLinkColor);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);cursor:pointer}:host([disabled]){pointer-events:none}:host(:not([disabled])) .ui5-link-root:hover{text-decoration:underline;color:var(--sapLinkColor)}:host([disabled]) .ui5-link-root{text-shadow:none;outline:none;cursor:default;pointer-events:none;opacity:var(--_ui5_link_opacity)}:host([design=Emphasized]) .ui5-link-root{font-weight:700}:host([design=Subtle]) .ui5-link-root,:host([design=Subtle]) .ui5-link-root:visited{color:var(--sapLink_SubtleColor)}:host([design=Subtle]) .ui5-link-root:focus{color:var(--sapLinkColor)}:host([wrap]) .ui5-link-root{white-space:normal;word-wrap:break-word}.ui5-link-root{display:inline-block;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-wrap:normal;text-decoration:none;outline:none}.ui5-link-root,.ui5-link-root:active,.ui5-link-root:visited{color:currentColor}.ui5-link-root:focus{text-decoration:underline}.ui5-link-root:focus:after{content:\"\";width:var(--_ui5_link_outline_element_size);height:var(--_ui5_link_outline_element_size);position:absolute;left:0;border:1px dotted var(--sapContent_FocusColor);top:0;outline:none}";

    /**
     * @public
     */

    var metadata$5 = {
      tag: "ui5-link",
      properties:
      /** @lends  sap.ui.webcomponents.main.Link.prototype */
      {
        /**
         * Defines whether the <code>ui5-link</code> is disabled.
         * <br><br>
         * <b>Note:</b> When disabled, the <code>ui5-link</code> cannot be triggered by the user.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        disabled: {
          type: Boolean
        },

        /**
         * Defines the <code>ui5-link</code> href.
         * <br><br>
         * <b>Note:</b> Standard hyperlink behavior is supported.
         *
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        href: {
          type: String
        },

        /**
         * Defines the <code>ui5-link</code> target.
         * <br><br>
         * <b>Notes:</b>
         * <ul>
         * <li>Available options are the standard values: <code>_self</code>, <code>_top</code>,
         * <code>_blank</code>, <code>_parent</code>, and <code>_search</code>.</li>
         * <li>This property must only be used when the <code>href</code> property is set.</li>
         * </ul>
         *
         * @type {string}
         * @defaultvalue ""
         * @public
         */
        target: {
          type: String
        },

        /**
         * Defines the <code>ui5-link</code> design.
         * <br><br>
         * <b>Note:</b> Avaialble options are <code>Default</code>, <code>Subtle</code>, and <code>Emphasized</code>.
         *
         * @type {LinkDesign}
         * @defaultvalue "Default"
         * @public
         */
        design: {
          type: LinkDesign,
          defaultValue: LinkDesign.Default
        },

        /**
         * Defines whether the <code>ui5-link</code> text should wrap
         * when there is no sufficient space.
         * <br><br>
         * <b>Note:</b> The text is truncated by default.
         *
         * @type {boolean}
         * @defaultvalue false
         * @public
         */
        wrap: {
          type: Boolean
        },
        _rel: {
          type: String,
          noAttribute: true
        }
      },
      slots:
      /** @lends sap.ui.webcomponents.main.Link.prototype */
      {
        /**
         * Defines the text of the <code>ui5-link</code>.
         * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
         *
         * @type {Node[]}
         * @slot
         * @public
         */
        "default": {
          type: Node
        }
      },
      events:
      /** @lends sap.ui.webcomponents.main.Link.prototype */
      {
        /**
         * Fired when the <code>ui5-link</code> is triggered either with a mouse/tap
         * or by using the Enter key.
         *
         * @event
         * @public
         */
        click: {}
      }
    };
    /**
     * @class
     *
     * <h3 class="comment-api-title">Overview</h3>
     * The <code>ui5-link</code> is a hyperlink component that is used to navigate to other
     * apps and web pages, or to trigger actions.
     * It is a clickable text element, visualized in such a way that it stands out
     * from the standard text.
     * On hover, it changes its style to an underlined text to provide additional feedback to the user.
     *
     *
     * <h3>Usage</h3>
     *
     * You can set the <code>ui5-link</code> to be enabled or disabled.
     * <br><br>
     * To create a visual hierarchy in large lists of links, you can set the less important links as
     * <code>Subtle</code> or the more important ones as <code>Emphasized</code>,
     * by using the <code>design</code> property.
     * <br><br>
     * If the <code>href</code> property is set, the link behaves as the basic HTML
     * anchor tag (<code><a></code>) and opens the specified URL in the given target frame (<code>target</code> property).
     * To specify where the linked content is opened, you can use the <code>target</code> property.
     *
     * <h3>Responsive behavior</h3>
     *
     * If there is not enough space, the text of the <code>ui5-link</code> becomes truncated.
     * If the <code>wrap</code> property is set to <code>true</code>, the text is displayed
     * on several lines instead of being truncated.
     *
     * <h3>ES6 Module Import</h3>
     *
     * <code>import "@ui5/webcomponents/dist/Link";</code>
     *
     * @constructor
     * @author SAP SE
     * @alias sap.ui.webcomponents.main.Link
     * @extends sap.ui.webcomponents.base.UI5Element
     * @tagname ui5-link
     * @public
     */

    var Link =
    /*#__PURE__*/
    function (_UI5Element) {
      _inherits(Link, _UI5Element);

      function Link() {
        var _this;

        _classCallCheck(this, Link);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Link).call(this));
        _this._dummyAnchor = document.createElement("a");
        _this.i18nBundle = getI18nBundle("@ui5/webcomponents");
        return _this;
      }

      _createClass(Link, [{
        key: "onBeforeRendering",
        value: function onBeforeRendering() {
          var needsNoReferrer = this.target === "_blank" && this.href && this._isCrossOrigin();

          this._rel = needsNoReferrer ? "noreferrer" : undefined;
        }
      }, {
        key: "_isCrossOrigin",
        value: function _isCrossOrigin() {
          var loc = window.location;
          this._dummyAnchor.href = this.href;
          return !(this._dummyAnchor.hostname === loc.hostname && this._dummyAnchor.port === loc.port && this._dummyAnchor.protocol === loc.protocol);
        }
      }, {
        key: "_onclick",
        value: function _onclick(event) {
          event.isMarked = "link";
        }
      }, {
        key: "_onfocusin",
        value: function _onfocusin(event) {
          event.isMarked = "link";
        }
      }, {
        key: "_onkeydown",
        value: function _onkeydown(event) {
          event.isMarked = "link";
        }
      }, {
        key: "_onkeyup",
        value: function _onkeyup(event) {
          event.isMarked = "link";
        }
      }, {
        key: "tabIndex",
        get: function get() {
          return this.disabled || !this.textContent.length ? "-1" : "0";
        }
      }, {
        key: "ariaDisabled",
        get: function get() {
          return this.disabled ? "true" : undefined;
        }
      }, {
        key: "hasLinkType",
        get: function get() {
          return this.design !== LinkDesign.Default;
        }
      }, {
        key: "linkTypeText",
        get: function get() {
          return this.i18nBundle.getText(Link.typeTextMappings()[this.design]);
        }
      }, {
        key: "parsedRef",
        get: function get() {
          return this.href && this.href.length > 0 ? this.href : undefined;
        }
      }], [{
        key: "typeTextMappings",
        value: function typeTextMappings() {
          return {
            "Subtle": LINK_SUBTLE,
            "Emphasized": LINK_EMPHASIZED
          };
        }
      }, {
        key: "onDefine",
        value: function () {
          var _onDefine = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return fetchI18nBundle("@ui5/webcomponents");

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onDefine() {
            return _onDefine.apply(this, arguments);
          }

          return onDefine;
        }()
      }, {
        key: "metadata",
        get: function get() {
          return metadata$5;
        }
      }, {
        key: "render",
        get: function get() {
          return litRender;
        }
      }, {
        key: "template",
        get: function get() {
          return block0$4;
        }
      }, {
        key: "styles",
        get: function get() {
          return linkCss;
        }
      }]);

      return Link;
    }(UI5Element);

    Link.define();

    /**
     * Device and Feature Detection API: Provides information about the used browser / device and cross platform support for certain events
     * like media queries, orientation change or resizing.
     *
     * This API is independent from any other part of the UI5 framework. This allows it to be loaded beforehand, if it is needed, to create the UI5 bootstrap
     * dynamically depending on the capabilities of the browser or device.
     *
     * @namespace
     * @name Device
     */
    var Device$1 = {}; //* ******* OS Detection ********

    /**
     * Contains information about the used browser.
     * @name Device.browser
     */

    /**
     * Enumeration containing the names of known browsers.
     * @name Device.browser.BROWSER
     *
     * The name of the browser.
     * @name Device.browser.name
     * @type String
     */

    /**
     * The version of the browser as <code>string</code>. Might be empty if no version can be determined.
     * @name Device.browser.versionStr
     * @type String
     */

    /**
     * The version of the browser as <code>float</code>. Might be <code>-1</code> if no version can be determined.
     * @name Device.browser.version
     * @type float
     */

    /**
     * If this flag is set to <code>true</code>, the mobile variant of the browser is used or
     * a tablet or phone device is detected. This information might not be available for all browsers.
     * @name Device.browser.mobile
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
     * @name Device.browser.internet_explorer
     * @type boolean
     * @deprecated since 1.20, use {@link Device.browser.msie} instead.
     */

    /**
     * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
     * @name Device.browser.msie
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Microsoft Edge browser is used.
     * @name Device.browser.edge
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Mozilla Firefox browser is used.
     * @name Device.browser.firefox
     */

    /**
     * If this flag is set to <code>true</code>, the Google Chrome browser is used.
     * @name Device.browser.chrome
     * @type boolean
     *
     * If this flag is set to <code>true</code>, the Apple Safari browser is used.
     *
     * <b>Note:</b>
     * This flag is also <code>true</code> when the standalone (fullscreen) mode or webview is used on iOS devices.
     * Please also note the flags {@link Device.browser.fullscreen} and {@link Device.browser.webview}.
     *
     * @name Device.browser.safari
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, a browser featuring a Webkit engine is used.
     *
     * <b>Note:</b>
     * This flag is also <code>true</code> when the used browser was based on the Webkit engine, but
     * uses another rendering engine in the meantime. For example the Chrome browser started from version 28 and above
     * uses the Blink rendering engine.
     *
     * @name Device.browser.webkit
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Safari browser runs in standalone fullscreen mode on iOS.
     *
     * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
     * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
     * the availability of {@link Device.browser.version}.
     *
     * @name Device.browser.fullscreen
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Safari browser runs in webview mode on iOS.
     *
     * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
     * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
     * the availability of {@link Device.browser.version}.
     *
     * @name Device.browser.webview
     * @type boolean
     */

    /**
     * If this flag is set to <code>true</code>, the Phantom JS browser is used.
     * @name Device.browser.phantomJS
     * @type boolean
     */

    /**
     * The version of the used Webkit engine, if available.
     * @name Device.browser.webkitVersion
     * @type String
     */

    /**
     * If this flag is set to <code>true</code>, a browser featuring a Mozilla engine is used.
     * @name Device.browser.mozilla
     * @type boolean
     */

    /**
     * Internet Explorer browser name.
     * @name Device.browser.BROWSER.INTERNET_EXPLORER
     */

    /**
     * Edge browser name.
     * @name Device.browser.BROWSER.EDGE
     */

    /**
     * Firefox browser name.
     * @name Device.browser.BROWSER.FIREFOX
     */

    /**
     * Chrome browser name.
     * @name Device.browser.BROWSER.CHROME
     */

    /**
     * Safari browser name.
     * @name Device.browser.BROWSER.SAFARI
     */

    /**
     * Android stock browser name.
     * @name Device.browser.BROWSER.ANDROID
     */


    var BROWSER = {
      "INTERNET_EXPLORER": "ie",
      "EDGE": "ed",
      "FIREFOX": "ff",
      "CHROME": "cr",
      "SAFARI": "sf",
      "ANDROID": "an"
    };
    /*!
    * Taken from jQuery JavaScript Library v1.7.1
    * http://jquery.com/
    *
    * Copyright 2011, John Resig
    * Dual licensed under the MIT or GPL Version 2 licenses.
    * http://jquery.org/license
    *
    * Includes Sizzle.js
    * http://sizzlejs.com/
    * Copyright 2011, The Dojo Foundation
    * Released under the MIT, BSD, and GPL Licenses.
    *
    * Date: Mon Nov 21 21:11:03 2011 -0500
    */

    var _calcBrowser = function _calcBrowser() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var rwebkit = /(webkit)[ /]([\w.]+)/;
      var rmsie = /(msie) ([\w.]+)/;
      var rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
      var redge = /(edge)[ /]([\w.]+)/;
      var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/; // WinPhone IE11 and MS Edge userAgents contain "WebKit" and "Mozilla" and therefore must be checked first

      var browserMatch = redge.exec(sUserAgent) || rmsie11.exec(sUserAgent) || rwebkit.exec(sUserAgent) || rmsie.exec(sUserAgent) || sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent) || [];
      var oRes = {
        browser: browserMatch[1] || "",
        version: browserMatch[2] || "0"
      };
      oRes[oRes.browser] = true;
      return oRes;
    };

    var _getBrowser = function _getBrowser() {
      var oBrowser = _calcBrowser();

      var sUserAgent = navigator.userAgent;
      var oNavigator = window.navigator; // jQuery checks for user agent strings. We differentiate between browsers

      var oExpMobile;
      var oResult;
      var fVersion; // Mozilla

      if (oBrowser.mozilla) {
        oExpMobile = /Mobile/;

        if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
          fVersion = parseFloat(RegExp.$1);
          oResult = {
            name: BROWSER.FIREFOX,
            versionStr: "".concat(fVersion),
            version: fVersion,
            mozilla: true,
            mobile: oExpMobile.test(sUserAgent)
          };
        } else {
          // unknown mozilla browser
          oResult = {
            mobile: oExpMobile.test(sUserAgent),
            mozilla: true,
            version: -1
          };
        }
      } else if (oBrowser.webkit) {
        // webkit version is needed for calculation if the mobile android device is a tablet (calculation of other mobile devices work without)
        var regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[/]([\d.]+)/);
        var webkitVersion;

        if (regExpWebkitVersion) {
          webkitVersion = regExpWebkitVersion[1];
        }

        oExpMobile = /Mobile/;
        var aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
        var aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
        var aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

        if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
          var sName, sVersion, bMobile;

          if (aChromeMatch) {
            sName = BROWSER.CHROME;
            bMobile = oExpMobile.test(sUserAgent);
            sVersion = parseFloat(aChromeMatch[2]);
          } else if (aFirefoxMatch) {
            sName = BROWSER.FIREFOX;
            bMobile = true;
            sVersion = parseFloat(aFirefoxMatch[1]);
          } else if (aAndroidMatch) {
            sName = BROWSER.ANDROID;
            bMobile = oExpMobile.test(sUserAgent);
            sVersion = parseFloat(aAndroidMatch[1]);
          }

          oResult = {
            name: sName,
            mobile: bMobile,
            versionStr: "".concat(sVersion),
            version: sVersion,
            webkit: true,
            webkitVersion: webkitVersion
          };
        } else {
          // Safari might have an issue with sUserAgent.match(...); thus changing
          var oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
          var bStandalone = oNavigator.standalone;

          if (oExp.test(sUserAgent)) {
            var aParts = oExp.exec(sUserAgent);
            fVersion = parseFloat(aParts[2]);
            oResult = {
              name: BROWSER.SAFARI,
              versionStr: "".concat(fVersion),
              fullscreen: false,
              webview: false,
              version: fVersion,
              mobile: oExpMobile.test(sUserAgent),
              webkit: true,
              webkitVersion: webkitVersion,
              phantomJS: aParts[1] === "PhantomJS"
            };
          } else if (/iPhone|iPad|iPod/.test(sUserAgent) && !/CriOS/.test(sUserAgent) && !/FxiOS/.test(sUserAgent) && (bStandalone === true || bStandalone === false)) {
            // WebView or Standalone mode on iOS
            oResult = {
              name: BROWSER.SAFARI,
              version: -1,
              fullscreen: bStandalone,
              webview: !bStandalone,
              mobile: oExpMobile.test(sUserAgent),
              webkit: true,
              webkitVersion: webkitVersion
            };
          } else {
            // other webkit based browser
            oResult = {
              mobile: oExpMobile.test(sUserAgent),
              webkit: true,
              webkitVersion: webkitVersion,
              version: -1
            };
          }
        }
      } else if (oBrowser.msie || oBrowser.trident) {
        fVersion = parseFloat(oBrowser.version);
        oResult = {
          name: BROWSER.INTERNET_EXPLORER,
          versionStr: "".concat(fVersion),
          version: fVersion,
          msie: true,
          mobile: false
        };
      } else if (oBrowser.edge) {
        fVersion = parseFloat(oBrowser.version);
        oResult = {
          name: BROWSER.EDGE,
          versionStr: "".concat(fVersion),
          version: fVersion,
          edge: true
        };
      } else {
        oResult = {
          name: "",
          versionStr: "",
          version: -1,
          mobile: false
        };
      }

      return oResult;
    };

    var _setBrowser = function _setBrowser() {
      Device$1.browser = _getBrowser();
      Device$1.browser.BROWSER = BROWSER;

      if (Device$1.browser.name) {
        Object.keys(BROWSER).forEach(function (b) {
          if (BROWSER[b] === Device$1.browser.name) {
            Device$1.browser[b.toLowerCase()] = true;
          }
        });
      }
    };

    var isIE = function isIE() {
      if (!Device$1.browser) {
        _setBrowser();
      }

      return !!Device$1.browser.msie;
    };

    var animationMode;

    var getAnimationMode$1 = function getAnimationMode$1() {
      if (animationMode === undefined) {
        animationMode = getAnimationMode();
      }

      return animationMode;
    };
     // eslint-disable-line

    var formatSettings;

    var getFirstDayOfWeek = function getFirstDayOfWeek() {
      if (formatSettings === undefined) {
        formatSettings = getFormatSettings();
      }

      return formatSettings.firstDayOfWeek;
    };
     // eslint-disable-line

    // OpenUI5 integration
    window.RenderScheduler = RenderScheduler;
    window.isIE = isIE; // attached to the window object for testing purposes
    window["sap-ui-webcomponents-bundle"] = {
      configuration: {
        getAnimationMode: getAnimationMode$1,
        getTheme: getTheme$1,
        setTheme: setTheme,
        setNoConflict: setNoConflict,
        getRTL: getRTL$1,
        getFirstDayOfWeek: getFirstDayOfWeek
      },
      getIconNames: getRegisteredNames,
      getLocaleData: getLocaleData
    };

    // ES5 bundle targets IE11 only
    var configuration = {
      getAnimationMode: getAnimationMode$1,
      getTheme: getTheme$1,
      setTheme: setTheme,
      setNoConflict: setNoConflict,
      getRTL: getRTL$1,
      getFirstDayOfWeek: getFirstDayOfWeek
    };

    exports.configuration = configuration;
    exports.getIconNames = getRegisteredNames;

}(this['sap-ui-webcomponents-bundle'] = this['sap-ui-webcomponents-bundle'] || {}));
//# sourceMappingURL=button.card.label.link.es5.js.map
