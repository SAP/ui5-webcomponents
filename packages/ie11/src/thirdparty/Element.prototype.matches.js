if (Element && !Element.prototype.matches) {
	var proto = Element.prototype;
	proto.matches = proto.matchesSelector ||
		proto.mozMatchesSelector || proto.msMatchesSelector ||
		proto.oMatchesSelector || proto.webkitMatchesSelector;
}
