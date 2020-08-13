// https://raw.githubusercontent.com/webcomponents/webcomponents-platform/master/webcomponents-platform.js

// Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

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
