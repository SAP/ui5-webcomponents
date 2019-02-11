// Matches
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
}

// Closest (depends on matches)
if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;

		/* This optimization is not shadow DOM friendly */
		//if (!document.documentElement.contains(el)) return null;

		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

export default {};