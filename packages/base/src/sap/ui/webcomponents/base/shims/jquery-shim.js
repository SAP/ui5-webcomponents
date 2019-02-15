/* eslint-disable */
import { inject as injectJQuery } from "@ui5/webcomponents-core/dist/sap/ui/thirdparty/jquery";
import isPlainObject from "@ui5/webcomponents-core/dist/sap/base/util/isPlainObject";

var jQuery = {
	extend: function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && typeof target !== "function" ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( isPlainObject( copy ) ||
							( copyIsArray = Array.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray( src ) ? src : [];

						} else {
							clone = src && isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = extend( deep, clone, copy );

						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},
	isEmptyObject: function(obj) {
		return Object.keys(obj).length === 0;
	},
	ajaxSettings: {
		converters: {
			"text json": (data) => JSON.parse( data + "" )
		}
	},
	trim: function (str) {
		return str.trim();
	}
};

window.jQuery = window.jQuery || jQuery;
injectJQuery(jQuery);

export default jQuery;

/* eslint-enable */
