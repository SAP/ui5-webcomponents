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
