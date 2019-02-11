(function () {
	if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength, padString) {
			targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
			padString = String(typeof padString !== 'undefined' ? padString : ' ');
			if (this.length >= targetLength) {
				return String(this);
			} else {
				targetLength = targetLength - this.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
				}
				return padString.slice(0, targetLength) + String(this);
			}
		};
	}

	if (!Object.entries) {
		Object.entries = function( obj ){
			var ownProps = Object.keys( obj ),
				i = ownProps.length,
				resArray = new Array(i); // preallocate the Array
			while (i--)
				resArray[i] = [ownProps[i], obj[ownProps[i]]];

			return resArray;
		};
	}





	if (!window.WeakSet) {
		var counter = Date.now() % 1e9;

		function WeakSet(data) {
			this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
			data && data.forEach && data.forEach(this.add, this);
		};


		var proto = WeakSet.prototype;

		proto['add'] = function (val) {
			var name = this.name;
			if (!val[name]) Object.defineProperty(val, name, {value: true, writable: true});
			return this;
		};
		proto['delete'] = function (val) {
			if (!val[this.name]) return false;
			val[this.name] = undefined;
			return true;
		};
		proto['has'] = function (val) {
			return !!val[this.name];
		};

		window.WeakSet = WeakSet;
	}



// https://raw.githubusercontent.com/webcomponents/webcomponents-platform/master/webcomponents-platform.js
	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	(function() {

		'use strict';

		// defaultPrevented is broken in IE.
		// https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
		var workingDefaultPrevented = (function() {
			var e = document.createEvent('Event');
			e.initEvent('foo', true, true);
			e.preventDefault();
			return e.defaultPrevented;
		})();

		if (!workingDefaultPrevented) {
			var origPreventDefault = Event.prototype.preventDefault;
			Event.prototype.preventDefault = function() {
				if (!this.cancelable) {
					return;
				}

				origPreventDefault.call(this);

				Object.defineProperty(this, 'defaultPrevented', {
					get: function() {
						return true;
					},
					configurable: true
				});
			};
		}

		var isIE = /Trident/.test(navigator.userAgent);

		// Event constructor shim
		if (!window.Event || isIE && (typeof window.Event !== 'function')) {
			var origEvent = window.Event;
			window.Event = function(inType, params) {
				params = params || {};
				var e = document.createEvent('Event');
				e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
				return e;
			};
			if (origEvent) {
				for (var i in origEvent) {
					window.Event[i] = origEvent[i];
				}
				window.Event.prototype = origEvent.prototype;
			}
		}

		// CustomEvent constructor shim
		if (!window.CustomEvent || isIE && (typeof window.CustomEvent !== 'function')) {
			window.CustomEvent = function(inType, params) {
				params = params || {};
				var e = document.createEvent('CustomEvent');
				e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
				return e;
			};
			window.CustomEvent.prototype = window.Event.prototype;
		}

		if (!window.MouseEvent || isIE && (typeof window.MouseEvent !== 'function')) {
			var origMouseEvent = window.MouseEvent;
			window.MouseEvent = function(inType, params) {
				params = params || {};
				var e = document.createEvent('MouseEvent');
				e.initMouseEvent(inType,
					Boolean(params.bubbles), Boolean(params.cancelable),
					params.view || window, params.detail,
					params.screenX, params.screenY, params.clientX, params.clientY,
					params.ctrlKey, params.altKey, params.shiftKey, params.metaKey,
					params.button, params.relatedTarget);
				return e;
			};
			if (origMouseEvent) {
				for (var i in origMouseEvent) {
					window.MouseEvent[i] = origMouseEvent[i];
				}
			}
			window.MouseEvent.prototype = origMouseEvent.prototype;
		}

		// ES6 stuff
		if (!Array.from) {
			Array.from = function (object) {
				return [].slice.call(object);
			};
		}

		if (!Object.assign) {
			var assign = function(target, source) {
				var n$ = Object.getOwnPropertyNames(source);
				for (var i=0, p; i < n$.length; i++) {
					p = n$[i];
					target[p] = source[p];
				}
			}

			Object.assign = function(target, sources) {
				var args = [].slice.call(arguments, 1);
				for (var i=0, s; i < args.length; i++) {
					s = args[i];
					if (s) {
						assign(target, s);
					}
				}
				return target;
			}
		}

	})();

//fetch
	window.fetch||(window.fetch=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest;for(var o in s.open(n.method||"get",e,!0),n.headers)s.setRequestHeader(o,n.headers[o]);function u(){var e,n=[],t=[],r={};return s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(s,o,u){n.push(o=o.toLowerCase()),t.push([o,u]),r[o]=(e=r[o])?e+","+u:u}),{ok:2==(s.status/100|0),status:s.status,statusText:s.statusText,url:s.responseURL,clone:u,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},headers:{keys:function(){return n},entries:function(){return t},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}s.withCredentials="include"==n.credentials,s.onload=function(){t(u())},s.onerror=r,s.send(n.body||null)})});

//template
	/**
	 * @license
* Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	* This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		* The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		* The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		* Code distributed by Google as part of the polymer project is also
	* subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/

// minimal template polyfill
	(function() {
		'use strict';

		var needsTemplate = (typeof HTMLTemplateElement === 'undefined');
		var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
		var needsDocFrag = false;

		// NOTE: Replace DocumentFragment to work around IE11 bug that
		// causes children of a document fragment modified while
		// there is a mutation observer to not have a parentNode, or
		// have a broken parentNode (!?!)
		if (/Trident/.test(navigator.userAgent)) {
			(function() {

				needsDocFrag = true;

				var origCloneNode = Node.prototype.cloneNode;
				Node.prototype.cloneNode = function cloneNode(deep) {
					var newDom = origCloneNode.call(this, deep);
					if (this instanceof DocumentFragment) {
						newDom.__proto__ = DocumentFragment.prototype;
					}
					return newDom;
				};

				// IE's DocumentFragment querySelector code doesn't work when
				// called on an element instance
				DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
				DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;

				Object.defineProperties(DocumentFragment.prototype, {
					'nodeType': {
						get: function () {
							return Node.DOCUMENT_FRAGMENT_NODE;
						},
						configurable: true
					},

					'localName': {
						get: function () {
							return undefined;
						},
						configurable: true
					},

					'nodeName': {
						get: function () {
							return '#document-fragment';
						},
						configurable: true
					}
				});

				var origInsertBefore = Node.prototype.insertBefore;
				function insertBefore(newNode, refNode) {
					if (newNode instanceof DocumentFragment) {
						var child;
						while ((child = newNode.firstChild)) {
							origInsertBefore.call(this, child, refNode);
						}
					} else {
						origInsertBefore.call(this, newNode, refNode);
					}
					return newNode;
				}
				Node.prototype.insertBefore = insertBefore;

				var origAppendChild = Node.prototype.appendChild;
				Node.prototype.appendChild = function appendChild(child) {
					if (child instanceof DocumentFragment) {
						insertBefore.call(this, child, null);
					} else {
						origAppendChild.call(this, child);
					}
					return child;
				};

				var origRemoveChild = Node.prototype.removeChild;
				var origReplaceChild = Node.prototype.replaceChild;
				Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
					if (newChild instanceof DocumentFragment) {
						insertBefore.call(this, newChild, oldChild);
						origRemoveChild.call(this, oldChild);
					} else {
						origReplaceChild.call(this, newChild, oldChild);
					}
					return oldChild;
				};

				Document.prototype.createDocumentFragment = function createDocumentFragment() {
					var frag = this.createElement('df');
					frag.__proto__ = DocumentFragment.prototype;
					return frag;
				};

				var origImportNode = Document.prototype.importNode;
				Document.prototype.importNode = function importNode(impNode, deep) {
					deep = deep || false;
					var newNode = origImportNode.call(this, impNode, deep);
					if (impNode instanceof DocumentFragment) {
						newNode.__proto__ = DocumentFragment.prototype;
					}
					return newNode;
				};
			})();
		}

		// NOTE: we rely on this cloneNode not causing element upgrade.
		// This means this polyfill must load before the CE polyfill and
		// this would need to be re-worked if a browser supports native CE
		// but not <template>.
		var capturedCloneNode = Node.prototype.cloneNode;
		var capturedCreateElement = Document.prototype.createElement;
		var capturedImportNode = Document.prototype.importNode;
		var capturedRemoveChild = Node.prototype.removeChild;
		var capturedAppendChild = Node.prototype.appendChild;
		var capturedReplaceChild = Node.prototype.replaceChild;
		var capturedParseFromString = DOMParser.prototype.parseFromString;
		var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
			/**
			 * @this {!HTMLElement}
			 * @return {string}
			 */
			get: function() {
				return this.innerHTML;
			},
			/**
			 * @this {!HTMLElement}
			 * @param {string}
			 */
			set: function(text) {
				this.innerHTML = text;
			}
		};
		var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
			/**
			 * @this {!Node}
			 * @return {!NodeList}
			 */
			get: function() {
				return this.childNodes;
			}
		};

		var elementQuerySelectorAll = Element.prototype.querySelectorAll;
		var docQuerySelectorAll = Document.prototype.querySelectorAll;
		var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;

		var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

		function QSA(node, selector) {
			// IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
			if (!node.childNodes.length) {
				return [];
			}
			switch (node.nodeType) {
				case Node.DOCUMENT_NODE:
					return docQuerySelectorAll.call(node, selector);
				case Node.DOCUMENT_FRAGMENT_NODE:
					return fragQuerySelectorAll.call(node, selector);
				default:
					return elementQuerySelectorAll.call(node, selector);
			}
		}

		// returns true if nested templates cannot be cloned (they cannot be on
		// some impl's like Safari 8 and Edge)
		// OR if cloning a document fragment does not result in a document fragment
		var needsCloning = (function() {
			if (!needsTemplate) {
				var t = document.createElement('template');
				var t2 = document.createElement('template');
				t2.content.appendChild(document.createElement('div'));
				t.content.appendChild(t2);
				var clone = t.cloneNode(true);
				return (clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0
					|| brokenDocFragment);
			}
		})();

		var TEMPLATE_TAG = 'template';
		var PolyfilledHTMLTemplateElement = function() {};

		if (needsTemplate) {

			var contentDoc = document.implementation.createHTMLDocument('template');
			var canDecorate = true;

			var templateStyle = document.createElement('style');
			templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';

			var head = document.head;
			head.insertBefore(templateStyle, head.firstElementChild);

			/**
			 Provides a minimal shim for the <template> element.
			 */
			PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);


			// if elements do not have `innerHTML` on instances, then
			// templates can be patched by swizzling their prototypes.
			var canProtoPatch =
				!(document.createElement('div').hasOwnProperty('innerHTML'));

			/**
			 The `decorate` method moves element children to the template's `content`.
			 NOTE: there is no support for dynamically adding elements to templates.
			 */
			PolyfilledHTMLTemplateElement.decorate = function(template) {
				// if the template is decorated or not in HTML namespace, return fast
				if (template.content ||
					template.namespaceURI !== document.documentElement.namespaceURI) {
					return;
				}
				template.content = contentDoc.createDocumentFragment();
				var child;
				while ((child = template.firstChild)) {
					capturedAppendChild.call(template.content, child);
				}
				// NOTE: prefer prototype patching for performance and
				// because on some browsers (IE11), re-defining `innerHTML`
				// can result in intermittent errors.
				if (canProtoPatch) {
					template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
				} else {
					template.cloneNode = function(deep) {
						return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
					};
					// add innerHTML to template, if possible
					// Note: this throws on Safari 7
					if (canDecorate) {
						try {
							defineInnerHTML(template);
							defineOuterHTML(template);
						} catch (err) {
							canDecorate = false;
						}
					}
				}
				// bootstrap recursively
				PolyfilledHTMLTemplateElement.bootstrap(template.content);
			};

			// Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js
			var topLevelWrappingMap = {
				'option': ['select'],
				'thead': ['table'],
				'col': ['colgroup', 'table'],
				'tr': ['tbody', 'table'],
				'th': ['tr', 'tbody', 'table'],
				'td': ['tr', 'tbody', 'table']
			};

			var getTagName = function(text) {
				// Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
				return ( /<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
			};

			var defineInnerHTML = function defineInnerHTML(obj) {
				Object.defineProperty(obj, 'innerHTML', {
					get: function() {
						return getInnerHTML(this);
					},
					set: function(text) {
						// For IE11, wrap the text in the correct (table) context
						var wrap = topLevelWrappingMap[getTagName(text)];
						if (wrap) {
							for (var i = 0; i < wrap.length; i++) {
								text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
							}
						}
						contentDoc.body.innerHTML = text;
						PolyfilledHTMLTemplateElement.bootstrap(contentDoc);
						while (this.content.firstChild) {
							capturedRemoveChild.call(this.content, this.content.firstChild);
						}
						var body = contentDoc.body;
						// If we had wrapped, get back to the original node
						if (wrap) {
							for (var j = 0; j < wrap.length; j++) {
								body = body.lastChild;
							}
						}
						while (body.firstChild) {
							capturedAppendChild.call(this.content, body.firstChild);
						}
					},
					configurable: true
				});
			};

			var defineOuterHTML = function defineOuterHTML(obj) {
				Object.defineProperty(obj, 'outerHTML', {
					get: function() {
						return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
					},
					set: function(innerHTML) {
						if (this.parentNode) {
							contentDoc.body.innerHTML = innerHTML;
							var docFrag = this.ownerDocument.createDocumentFragment();
							while (contentDoc.body.firstChild) {
								capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
							}
							capturedReplaceChild.call(this.parentNode, docFrag, this);
						} else {
							throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
						}
					},
					configurable: true
				});
			};

			defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
			defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);

			/**
			 The `bootstrap` method is called automatically and "fixes" all
			 <template> elements in the document referenced by the `doc` argument.
			 */
			PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
				var templates = QSA(doc, TEMPLATE_TAG);
				for (var i=0, l=templates.length, t; (i<l) && (t=templates[i]); i++) {
					PolyfilledHTMLTemplateElement.decorate(t);
				}
			};

			// auto-bootstrapping for main document
			document.addEventListener('DOMContentLoaded', function() {
				PolyfilledHTMLTemplateElement.bootstrap(document);
			});

			// Patch document.createElement to ensure newly created templates have content
			Document.prototype.createElement = function createElement() {
				var el = capturedCreateElement.apply(this, arguments);
				if (el.localName === 'template') {
					PolyfilledHTMLTemplateElement.decorate(el);
				}
				return el;
			};

			DOMParser.prototype.parseFromString = function() {
				var el = capturedParseFromString.apply(this, arguments);
				PolyfilledHTMLTemplateElement.bootstrap(el);
				return el;
			};

			Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
				get: function() {
					return getInnerHTML(this);
				},
				set: function(text) {
					capturedHTMLElementInnerHTML.set.call(this, text);
					PolyfilledHTMLTemplateElement.bootstrap(this);
				},
				configurable: true,
				enumerable: true
			});

			// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
			var escapeAttrRegExp = /[&\u00A0"]/g;
			var escapeDataRegExp = /[&\u00A0<>]/g;

			var escapeReplace = function(c) {
				switch (c) {
					case '&':
						return '&amp;';
					case '<':
						return '&lt;';
					case '>':
						return '&gt;';
					case '"':
						return '&quot;';
					case '\u00A0':
						return '&nbsp;';
				}
			};

			var escapeAttr = function(s) {
				return s.replace(escapeAttrRegExp, escapeReplace);
			};

			var escapeData = function(s) {
				return s.replace(escapeDataRegExp, escapeReplace);
			};

			var makeSet = function(arr) {
				var set = {};
				for (var i = 0; i < arr.length; i++) {
					set[arr[i]] = true;
				}
				return set;
			};

			// http://www.whatwg.org/specs/web-apps/current-work/#void-elements
			var voidElements = makeSet([
				'area',
				'base',
				'br',
				'col',
				'command',
				'embed',
				'hr',
				'img',
				'input',
				'keygen',
				'link',
				'meta',
				'param',
				'source',
				'track',
				'wbr'
			]);

			var plaintextParents = makeSet([
				'style',
				'script',
				'xmp',
				'iframe',
				'noembed',
				'noframes',
				'plaintext',
				'noscript'
			]);

			/**
			 * @param {Node} node
			 * @param {Node} parentNode
			 * @param {Function=} callback
			 */
			var getOuterHTML = function(node, parentNode, callback) {
				switch (node.nodeType) {
					case Node.ELEMENT_NODE: {
						var tagName = node.localName;
						var s = '<' + tagName;
						var attrs = node.attributes;
						for (var i = 0, attr; (attr = attrs[i]); i++) {
							s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
						}
						s += '>';
						if (voidElements[tagName]) {
							return s;
						}
						return s + getInnerHTML(node, callback) + '</' + tagName + '>';
					}
					case Node.TEXT_NODE: {
						var data = /** @type {Text} */ (node).data;
						if (parentNode && plaintextParents[parentNode.localName]) {
							return data;
						}
						return escapeData(data);
					}
					case Node.COMMENT_NODE: {
						return '<!--' + /** @type {Comment} */ (node).data + '-->';
					}
					default: {
						window.console.error(node);
						throw new Error('not implemented');
					}
				}
			};

			/**
			 * @param {Node} node
			 * @param {Function=} callback
			 */
			var getInnerHTML = function(node, callback) {
				if (node.localName === 'template') {
					node =  /** @type {HTMLTemplateElement} */ (node).content;
				}
				var s = '';
				var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);
				for (var i=0, l=c$.length, child; (i<l) && (child=c$[i]); i++) {
					s += getOuterHTML(child, node, callback);
				}
				return s;
			};

		}

		// make cloning/importing work!
		if (needsTemplate || needsCloning) {

			PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
				var clone = capturedCloneNode.call(template, false);
				// NOTE: decorate doesn't auto-fix children because they are already
				// decorated so they need special clone fixup.
				if (this.decorate) {
					this.decorate(clone);
				}
				if (deep) {
					// NOTE: use native clone node to make sure CE's wrapped
					// cloneNode does not cause elements to upgrade.
					capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true));
					// now ensure nested templates are cloned correctly.
					fixClonedDom(clone.content, template.content);
				}
				return clone;
			};

			// Given a source and cloned subtree, find <template>'s in the cloned
			// subtree and replace them with cloned <template>'s from source.
			// We must do this because only the source templates have proper .content.
			var fixClonedDom = function fixClonedDom(clone, source) {
				// do nothing if cloned node is not an element
				if (!source.querySelectorAll) return;
				// these two lists should be coincident
				var s$ = QSA(source, TEMPLATE_TAG);
				if (s$.length === 0) {
					return;
				}
				var t$ = QSA(clone, TEMPLATE_TAG);
				for (var i=0, l=t$.length, t, s; i<l; i++) {
					s = s$[i];
					t = t$[i];
					if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
						PolyfilledHTMLTemplateElement.decorate(s);
					}
					capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
				}
			};

			// make sure scripts inside of a cloned template are executable
			var fixClonedScripts = function fixClonedScripts(fragment) {
				var scripts = QSA(fragment, scriptSelector);
				for (var ns, s, i = 0; i < scripts.length; i++) {
					s = scripts[i];
					ns = capturedCreateElement.call(document, 'script');
					ns.textContent = s.textContent;
					var attrs = s.attributes;
					for (var ai = 0, a; ai < attrs.length; ai++) {
						a = attrs[ai];
						ns.setAttribute(a.name, a.value);
					}
					capturedReplaceChild.call(s.parentNode, ns, s);
				}
			};

			// override all cloning to fix the cloned subtree to contain properly
			// cloned templates.
			var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
				var dom;
				// workaround for Edge bug cloning documentFragments
				// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/
				if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
					if (!deep) {
						return this.ownerDocument.createDocumentFragment();
					} else {
						dom = importNode.call(this.ownerDocument, this, true);
					}
				} else if (this.nodeType === Node.ELEMENT_NODE &&
					this.localName === TEMPLATE_TAG &&
					this.namespaceURI == document.documentElement.namespaceURI) {
					dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
				} else {
					dom = capturedCloneNode.call(this, deep);
				}
				// template.content is cloned iff `deep`.
				if (deep) {
					fixClonedDom(dom, this);
				}
				return dom;
			};

			// NOTE: we are cloning instead of importing <template>'s.
			// However, the ownerDocument of the cloned template will be correct!
			// This is because the native import node creates the right document owned
			// subtree and `fixClonedDom` inserts cloned templates into this subtree,
			// thus updating the owner doc.
			var importNode = Document.prototype.importNode = function importNode(element, deep) {
				deep = deep || false;
				if (element.localName === TEMPLATE_TAG) {
					return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
				} else {
					var dom = capturedImportNode.call(this, element, deep);
					if (deep) {
						fixClonedDom(dom, element);
						fixClonedScripts(dom);
					}
					return dom;
				}
			};
		}

		if (needsTemplate) {
			window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
		}

	})();


//matches
	if (Element && !Element.prototype.matches) {
		var proto = Element.prototype;
		proto.matches = proto.matchesSelector ||
			proto.mozMatchesSelector || proto.msMatchesSelector ||
			proto.oMatchesSelector || proto.webkitMatchesSelector;
	}

//closest
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

//symbol
	(function (global, factory) {

		"use strict";

		if (typeof module === "object" && typeof module.exports === "object") {
			// For the environment like NodeJS, CommonJS etc where module or
			// module.exports objects are available
			module.exports = factory(global);
		} else {
			// For browser context, where global object is window
			factory(global);
		}

		/* window is for browser environment and global is for NodeJS environment */
	})(typeof window !== "undefined" ? window : global, function (global) {

		"use strict";

		var defineProperty = Object.defineProperty;

		var defineProperties = Object.defineProperties;

		var symbolHiddenCounter = 0;

		var globalSymbolRegistry = [];

		var slice = Array.prototype.slice;

		var ES6 = typeof global.ES6 === "object" ? global.ES6 : (global.ES6 = {});

		var isArray = Array.isArray;

		var objectToString = Object.prototype.toString;

		var push = Array.prototype.push;

		var emptyFunction = function () {};

		var simpleFunction = function (arg) {
			return arg;
		};

		var isCallable = function (fn) {
			return typeof fn === 'function';
		};

		var isConstructor = function (fn) {
			return isCallable(fn);
		};

		var Iterator = function () {};

		var ArrayIterator = function ArrayIterator(array, flag) {
			this._array = array;
			this._flag = flag;
			this._nextIndex = 0;
		};

		var StringIterator = function StringIterator(string, flag) {
			this._string = string;
			this._flag = flag;
			this._nextIndex = 0;
		};

		var isES6Running = function() {
			return false; /* Now 'false' for testing purpose */
		};

		var isObject = function (value) {
			return value !== null && (typeof value === "object" || typeof value === "function");
		};

		var es6FunctionPrototypeHasInstanceSymbol = function (instance) {
			if (typeof this !== "function")
				return false;
			return instance instanceof this;
		};

		var es6InstanceOfOperator = function (object, constructor) {
			if (!isObject(constructor))
				throw new TypeError("Right-hand side of 'instanceof' is not an object");

			var hasInstanceSymbolProp = constructor[Symbol.hasInstance];
			if (typeof hasInstanceSymbolProp === "undefined") {
				return object instanceof constructor;
			} else if(typeof hasInstanceSymbolProp !== "function") {
				throw new TypeError(typeof hasInstanceSymbolProp + " is not a function");
			} else {
				return hasInstanceSymbolProp.call(constructor, object);
			}
		};

		// Generates name for a symbol instance and this name will be used as
		// property key for property symbols internally.
		var generateSymbolName = function (id) {
			return "@@_____" + id + "_____";
		};

		// Generates id for next Symbol instance
		var getNextSymbolId = function () {
			return symbolHiddenCounter++;
		};

		var setupSymbolInternals = function (symbol, desc) {
			defineProperties(symbol, {
				_description: {
					value: desc
				},
				_isSymbol: {
					value: true
				},
				_id: {
					value: getNextSymbolId()
				}
			});
			return symbol;
		};

		var checkSymbolInternals = function (symbol) {
			return symbol._isSymbol === true && typeof symbol._id === "number" && typeof symbol._description === "string";
		};

		var isSymbol = function (symbol) {
			return symbol instanceof Symbol && checkSymbolInternals(symbol);
		};

		var symbolFor = function (key) {
			key = String(key);
			var registryLength = globalSymbolRegistry.length,
				record,
				i = 0;

			for(; i<registryLength; ++i) {
				record = globalSymbolRegistry[i];
				if (record.key === key)
					return record.symbol;
			}

			record = {
				key: key,
				symbol: Symbol(key)
			};
			globalSymbolRegistry.push(record);
			return record.symbol;
		};

		var symbolKeyFor = function (symbol) {
			if (!ES6.isSymbol(symbol))
				throw new TypeError(String(symbol) + " is not a symbol");
			var registryLength = globalSymbolRegistry.length,
				record,
				i = 0;

			for(; i<registryLength; ++i) {
				record = globalSymbolRegistry[i];
				if (record.symbol === symbol)
					return record.key;
			}
		};

		/* It affects array1 and appends array2 at the end of array1 */
		var appendArray = function (array1, array2) {
			// Returns immediately if these are not array or not array-like objects
			if (!(typeof array1.length === "number" && array1.length >= 0 && typeof array2.length === "number" && array2.length >= 0))
				return;
			var length1 = Math.floor(array1.length),
				length2 = Math.floor(array2.length),
				i = 0;

			array1.length = length1 + length2;
			for (; i<length2; ++i)
				if (array2.hasOwnProperty(i))
					array1[length1 + i] = array2[i];
		};

		var es6ObjectPrototypeToString = function toString() {
			if (this === undefined || this === null)
				return objectToString.call(this);
			// Add support for @@toStringTag symbol
			if (typeof this[Symbol.toStringTag] === "string")
				return "[object " + this[Symbol.toStringTag] + "]";
			else
				return objectToString.call(this);
		};

		var es6ArrayPrototypeConcat = function concat() {
			if (this === undefined || this === null)
				throw new TypeError("Array.prototype.concat called on null or undefined");

			// Boxing 'this' value to wrapper object
			var self = Object(this),
				targets = slice.call(arguments),
				outputs = []; // Later it may affected by Symbol

			targets.unshift(self);

			targets.forEach(function (target) {
				// If target is primitive then just push
				if (!isObject(target))
					outputs.push(target);
				// Here Symbol.isConcatSpreadable support is added
				else if (typeof target[Symbol.isConcatSpreadable] !== "undefined") {
					if (target[Symbol.isConcatSpreadable]) {
						appendArray(outputs, target);
					} else {
						outputs.push(target);
					}
				} else if (isArray(target)) {
					appendArray(outputs, target);
				} else {
					outputs.push(target);
				}
			});
			return outputs;
		};

		var es6ForOfLoop = function (iterable, callback, thisArg) {
			callback = typeof callback !== "function" ? emptyFunction : callback;
			if (typeof iterable[Symbol.iterator] !== "function")
				throw new TypeError("Iterable[Symbol.iterator] is not a function");
			var iterator = iterable[Symbol.iterator](),
				iterationResult;
			if (typeof iterator.next !== "function")
				throw new TypeError(".iterator.next is not a function");
			while (true) {
				iterationResult = iterator.next();
				if (!isObject(iterationResult))
					throw new TypeError("Iterator result " + iterationResult + " is not an object");
				if (iterationResult.done)
					break;
				callback.call(thisArg, iterationResult.value);
			}
		};

		// Provides simple inheritance functionality
		var simpleInheritance = function (child, parent) {
			if (typeof child !== "function" || typeof parent !== "function")
				throw new TypeError("Child and Parent must be function type");

			child.prototype = Object.create(parent.prototype);
			child.prototype.constructor = child;
		};

		// Behaves as Symbol function in ES6, take description and returns an unique object,
		// but in ES6 this function returns 'symbol' primitive typed value.
		// Its type is 'object' not 'symbol'.
		// There is no wrapping in this case i.e. Object(sym) = sym.
		var Symbol = function Symbol(desc) {
			desc = typeof desc === "undefined" ? "" : String(desc);

			if(this instanceof Symbol)
				throw new TypeError("Symbol is not a constructor");

			return setupSymbolInternals(Object.create(Symbol.prototype), desc);
		};

		defineProperties(Symbol, {

			"for": {
				value: symbolFor,
				writable: true,
				configurable: true
			},

			"keyFor": {
				value: symbolKeyFor,
				writable: true,
				configurable: true
			},

			"hasInstance": {
				value: Symbol("Symbol.hasInstance")
			},

			"isConcatSpreadable": {
				value: Symbol("Symbol.isConcatSpreadable")
			},

			"iterator": {
				value: Symbol("Symbol.iterator")
			},

			"toStringTag": {
				value: Symbol("Symbol.toStringTag")
			}
		});

		// In ES6, this function returns like 'Symbol(<desc>)', but in this case
		// this function returns the symbol's internal name to work properly.
		Symbol.prototype.toString = function () {
			return generateSymbolName(this._id);
		};

		// Returns itself but in ES6 It returns 'symbol' typed value.
		Symbol.prototype.valueOf = function () {
			return this;
		};

		// Make Iterator like iterable
		defineProperty(Iterator.prototype, Symbol.iterator.toString(), {
			value: function () {return this;},
			writable: true,
			configurable: true
		});

		simpleInheritance(ArrayIterator, Iterator);

		simpleInheritance(StringIterator, Iterator);

		defineProperty(ArrayIterator.prototype, Symbol.toStringTag.toString(), {
			value: "Array Iterator",
			configurable: true
		});

		defineProperty(StringIterator.prototype, Symbol.toStringTag.toString(), {
			value: "String Iterator",
			configurable: true
		});

		// This iterator works on any Array or TypedArray or array-like objects
		ArrayIterator.prototype.next = function next() {
			if (!(this instanceof ArrayIterator))
				throw new TypeError("Method Array Iterator.prototype.next called on incompatible receiver " + String(this));

			var self = this,
				nextValue;

			if (self._nextIndex === -1) {
				return {
					done: true,
					value: undefined
				};
			}

			if (!(typeof self._array.length === "number" && self._array.length >= 0)) {
				self._nextIndex = -1;
				return {
					done: true,
					value: undefined
				};
			}

			// _flag = 1 for [index, value]
			// _flag = 2 for [value]
			// _flag = 3 for [index]
			if (self._nextIndex < Math.floor(self._array.length)) {
				if (self._flag === 1)
					nextValue = [self._nextIndex, self._array[self._nextIndex]];
				else if (self._flag === 2)
					nextValue = self._array[self._nextIndex];
				else if (self._flag === 3)
					nextValue = self._nextIndex;
				self._nextIndex++;
				return {
					done: false,
					value: nextValue
				};
			} else {
				self._nextIndex = -1;
				return {
					done: true,
					value: undefined
				};
			}
		};

		StringIterator.prototype.next = function next() {
			if (!(this instanceof StringIterator))
				throw new TypeError("Method String Iterator.prototype.next called on incompatible receiver " + String(this));

			var self = this,
				stringObject = new String(this._string),
				nextValue;

			if (self._nextIndex === -1) {
				return {
					done: true,
					value: undefined
				};
			}

			if (self._nextIndex < stringObject.length) {
				nextValue = stringObject[self._nextIndex];
				self._nextIndex++;
				return {
					done: false,
					value: nextValue
				};
			} else {
				self._nextIndex = -1;
				return {
					done: true,
					value: undefined
				};
			}
		};

		var es6ArrayPrototypeIteratorSymbol = function values() {
			if (this === undefined || this === null)
				throw new TypeError("Cannot convert undefined or null to object");

			var self = Object(this);
			return new ArrayIterator(self, 2);
		};

		var es6StringPrototypeIteratorSymbol = function values() {
			if (this === undefined || this === null)
				throw new TypeError("String.prototype[Symbol.iterator] called on null or undefined");
			return new StringIterator(String(this), 0);
		};

		var es6ArrayPrototypeEntries = function entries() {
			if (this === undefined || this === null)
				throw new TypeError("Cannot convert undefined or null to object");

			var self = Object(this);
			return new ArrayIterator(self, 1);
		};

		var es6ArrayPrototypeKeys = function keys() {
			if (this === undefined || this === null)
				throw new TypeError("Cannot convert undefined or null to object");
			var self = Object(this);
			return new ArrayIterator(self, 3);
		};

		var SpreadOperatorImpl = function (target, thisArg) {
			this._target = target;
			this._values = [];
			this._thisArg = thisArg;
		};
		// All the arguments must be iterable
		SpreadOperatorImpl.prototype.spread = function () {
			var self = this;
			slice.call(arguments).forEach(function (iterable) {
				ES6.forOf(iterable, function (value) {
					self._values.push(value);
				});
			});
			return self;
		};

		SpreadOperatorImpl.prototype.add = function () {
			var self = this;
			slice.call(arguments).forEach(function (value) {
				self._values.push(value);
			});
			return self;
		};

		SpreadOperatorImpl.prototype.call = function (thisArg) {
			if (typeof this._target !== "function")
				throw new TypeError("Target is not a function");
			thisArg = arguments.length <= 0 ? this._thisArg : thisArg;
			return this._target.apply(thisArg, this._values);
		};

		SpreadOperatorImpl.prototype.new = function () {
			if (typeof this._target !== "function")
				throw new TypeError("Target is not a constructor");

			var temp,
				returnValue;
			temp = Object.create(this._target.prototype);
			returnValue = this._target.apply(temp, this._values);
			return isObject(returnValue) ? returnValue : temp;
		};

		// Affects the target array
		SpreadOperatorImpl.prototype.array = function () {
			if (!isArray(this._target))
				throw new TypeError("Target is not a array");
			push.apply(this._target, this._values);
			return this._target;
		};

		// Target must be Array or function
		var es6SpreadOperator = function spreadOperator(target, thisArg) {
			if (!(typeof target === "function" || isArray(target)))
				throw new TypeError("Spread operator only supports on array and function objects at this moment");
			return new SpreadOperatorImpl(target, thisArg);
		};

		var es6ArrayFrom = function from(arrayLike, mapFn, thisArg) {
			var constructor,
				i = 0,
				length,
				outputs;
			// Use the generic constructor
			constructor = !isConstructor(this) ? Array : this;
			if (arrayLike === undefined || arrayLike === null)
				throw new TypeError("Cannot convert undefined or null to object");

			arrayLike = Object(arrayLike);
			if (mapFn === undefined)
				mapFn = simpleFunction;
			else if (!isCallable(mapFn))
				throw new TypeError(mapFn + " is not a function");

			if (typeof arrayLike[Symbol.iterator] === "undefined") {
				if (!(typeof arrayLike.length === "number" && arrayLike.length >= 0)) {
					outputs = new constructor(0);
					outputs.length = 0;
					return outputs;
				}
				length = Math.floor(arrayLike.length);
				outputs = new constructor(length);
				outputs.length = length;
				for(; i < length; ++i)
					outputs[i] = mapFn.call(thisArg, arrayLike[i]);
			} else {
				outputs = new constructor();
				outputs.length = 0;
				ES6.forOf(arrayLike, function (value) {
					outputs.length++;
					outputs[outputs.length - 1] = mapFn.call(thisArg, value);
				});
			}
			return outputs;
		};

		// Export ES6 APIs and add all the patches to support Symbol in ES5
		// If the running environment already supports ES6 then no patches will be applied,
		if (isES6Running())
			return ES6;
		else {

			// Some ES6 APIs can't be implemented in pure ES5, so this 'ES6' object provides
			// some equivalent functionality of these features.
			defineProperties(ES6, {

				// Checks if a JS value is a symbol
				// It can be used as equivalent api in ES6: typeof symbol === 'symbol'
				isSymbol: {
					value: isSymbol,
					writable: true,
					configurable: true
				},

				// Native ES5 'instanceof' operator does not support @@hasInstance symbol,
				// this method provides same functionality of ES6 'instanceof' operator.
				instanceOf: {
					value: es6InstanceOfOperator,
					writable: true,
					configurable: true
				},

				// This method behaves exactly same as ES6 for...of loop.
				forOf: {
					value: es6ForOfLoop,
					writable: true,
					configurable: true
				},

				// This method gives same functionality of the spread operator of ES6
				// It works on only functions and arrays.
				// Limitation: You can't create array like this [...iterable, , , , 33] by this method,
				// to achieve this you have to do like this [...iterable, undefined, undefined, undefined, 33]
				spreadOperator: {
					value: es6SpreadOperator,
					writable: true,
					configurable: true
				}
			});

			defineProperty(global, "Symbol", {
				value: Symbol,
				writable: true,
				configurable: true
			});

			defineProperty(Function.prototype, Symbol.hasInstance.toString(), {
				value: es6FunctionPrototypeHasInstanceSymbol
			});

			defineProperty(Array.prototype, "concat", {
				value: es6ArrayPrototypeConcat,
				writable: true,
				configurable: true
			});

			defineProperty(Object.prototype, "toString", {
				value: es6ObjectPrototypeToString,
				writable: true,
				configurable: true
			});

			defineProperty(Array.prototype, Symbol.iterator.toString(), {
				value: es6ArrayPrototypeIteratorSymbol,
				writable: true,
				configurable: true
			});

			defineProperty(Array, "from", {
				value: es6ArrayFrom,
				writable: true,
				configurable: true
			});

			defineProperty(Array.prototype, "entries", {
				value: es6ArrayPrototypeEntries,
				writable: true,
				configurable: true
			});

			defineProperty(Array.prototype, "keys", {
				value: es6ArrayPrototypeKeys,
				writable: true,
				configurable: true
			});

			defineProperty(String.prototype, Symbol.iterator.toString(), {
				value: es6StringPrototypeIteratorSymbol,
				writable: true,
				configurable: true
			});
		}

		return ES6;
	});


	Number.isInteger = Number.isInteger || function(value) {
		return typeof value === 'number' &&
			isFinite(value) &&
			Math.floor(value) === value;
	};

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	if (!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, 'includes', {
			value: function(searchElement, fromIndex) {

				if (this == null) {
					throw new TypeError('"this" is null or not defined');
				}

				// 1. Let O be ? ToObject(this value).
				var o = Object(this);

				// 2. Let len be ? ToLength(? Get(O, "length")).
				var len = o.length >>> 0;

				// 3. If len is 0, return false.
				if (len === 0) {
					return false;
				}

				// 4. Let n be ? ToInteger(fromIndex).
				//    (If fromIndex is undefined, this step produces the value 0.)
				var n = fromIndex | 0;

				// 5. If n ≥ 0, then
				//  a. Let k be n.
				// 6. Else n < 0,
				//  a. Let k be len + n.
				//  b. If k < 0, let k be 0.
				var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

				function sameValueZero(x, y) {
					return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
				}

				// 7. Repeat, while k < len
				while (k < len) {
					// a. Let elementK be the result of ? Get(O, ! ToString(k)).
					// b. If SameValueZero(searchElement, elementK) is true, return true.
					if (sameValueZero(o[k], searchElement)) {
						return true;
					}
					// c. Increase k by 1.
					k++;
				}

				// 8. Return false
				return false;
			}
		});
	}

	if (!Array.prototype.fill) {
		Object.defineProperty(Array.prototype, 'fill', {
			value: function(value) {

				// Steps 1-2.
				if (this == null) {
					throw new TypeError('this is null or not defined');
				}

				var O = Object(this);

				// Steps 3-5.
				var len = O.length >>> 0;

				// Steps 6-7.
				var start = arguments[1];
				var relativeStart = start >> 0;

				// Step 8.
				var k = relativeStart < 0 ?
					Math.max(len + relativeStart, 0) :
					Math.min(relativeStart, len);

				// Steps 9-10.
				var end = arguments[2];
				var relativeEnd = end === undefined ?
					len : end >> 0;

				// Step 11.
				var final = relativeEnd < 0 ?
					Math.max(len + relativeEnd, 0) :
					Math.min(relativeEnd, len);

				// Step 12.
				while (k < final) {
					O[k] = value;
					k++;
				}

				// Step 13.
				return O;
			}
		});
	}
})();