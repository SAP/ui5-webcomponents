/*
 The MIT License (MIT)

Copyright (c) 2016 Christian Murphy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const parser = require('postcss-selector-parser');
const name = "postcss-combine-duplicated-selectors";

/**
 * Ensure that attributes with different quotes match.
 * @param {Object} selector - postcss selector node
 */
function normalizeAttributes(selector) {
	selector.walkAttributes((node) => {
		if (node.value) {
			// remove quotes
			node.value = node.value.replace(/'|\\'|"|\\"/g, '');
		}
	});
}

/**
 * Sort class and id groups alphabetically
 * @param {Object} selector - postcss selector node
 */
function sortGroups(selector) {
	selector.each((subSelector) => {
		subSelector.nodes.sort((a, b) => {
			// different types cannot be sorted
			if (a.type !== b.type) {
				return 0;
			}

			// sort alphabetically
			return a.value < b.value ? -1 : 1;
		});
	});

	selector.sort((a, b) => (a.nodes.join('') < b.nodes.join('') ? -1 : 1));
}

/**
 * Remove duplicated properties
 * @param {Object} selector - postcss selector node
 * @param {Boolean} exact
 */
function removeDupProperties(selector, exact) {
	if (!exact) { // Remove duplicated properties, regardless of value
		const retainedProps = new Set();

		for (let actIndex = selector.nodes.length - 1; actIndex >= 1; actIndex--) {
			const prop = selector.nodes[actIndex].prop;
			if (prop !== undefined) {
				if (!retainedProps.has(prop)) {
					retainedProps.add(prop); // Mark the prop as retained, all other occurrences must be removed
				} else {
					selector.nodes[actIndex].remove(); // This occurrence of the prop must be removed
				}
			}
		}
	} else {
		// Remove duplicated properties from bottom to top ()
		for (let actIndex = selector.nodes.length - 1; actIndex >= 1; actIndex--) {
			for (let befIndex = actIndex - 1; befIndex >= 0; befIndex--) {
				if (
					selector.nodes[actIndex].prop === selector.nodes[befIndex].prop &&
					selector.nodes[actIndex].value === selector.nodes[befIndex].value
				) {
					selector.nodes[befIndex].remove();
					actIndex--;
				}
			}
		}
	}
}

const uniformStyle = parser((selector) => {
	normalizeAttributes(selector);
	sortGroups(selector);
});

const defaultOptions = {
	removeDuplicatedProperties: false,
};

module.exports = (options) => {
	options = Object.assign({}, defaultOptions, options);
	return {
		postcssPlugin: name,
		prepare() {
			// Create a map to store maps
			const mapTable = new Map();
			// root map to store root selectors
			mapTable.set('root', new Map());

			return {
				Rule: (rule) => {
					let map;
					// Check selector parent for any at rule
					if (rule.parent.type === 'atrule') {
						// Use name and query params as the key
						const query =
							rule.parent.name.toLowerCase() +
							rule.parent.params.replace(/\s+/g, '');

						// See if this query key is already in the map table
						map = mapTable.has(query) ? // If it is use it
							mapTable.get(query) : // if not set it and get it
							mapTable.set(query, new Map()).get(query);
					} else {
						// Otherwise we are dealing with a selector in the root
						map = mapTable.get('root');
					}

					// create a uniform selector
					const selector = uniformStyle.processSync(rule.selector, {
						lossless: false,
					});

					if (map.has(selector)) {
						// store original rule as destination
						const destination = map.get(selector);

						// check if node has already been processed
						if (destination === rule) return;

						// move declarations to original rule
						while (rule.nodes.length > 0) {
							destination.append(rule.nodes[0]);
						}
						// remove duplicated rule
						rule.remove();

						if (
							options.removeDuplicatedProperties ||
							options.removeDuplicatedValues
						) {
							removeDupProperties(
								destination,
								options.removeDuplicatedValues,
							);
						}
					} else {
						if (
							options.removeDuplicatedProperties ||
							options.removeDuplicatedValues
						) {
							removeDupProperties(rule, options.removeDuplicatedValues);
						}
						// add new selector to symbol table
						map.set(selector, rule);
					}
				},
			};
		},
	};
};

module.exports.postcss = true;
