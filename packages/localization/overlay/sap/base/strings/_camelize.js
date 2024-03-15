sap.ui.define([], function () {
	var rCamelCase = /[-\.]([a-z0-9])/ig;
	var fnCamelize = function (sString) {
		var sNormalizedString = sString.replace( rCamelCase, function( sMatch, sChar ) {
			return sChar.toUpperCase();
		});
		if (/^[a-z][A-Za-z0-9]*$/.test(sNormalizedString)) {
			return sNormalizedString;
		}
		return undefined;
	};

	return fnCamelize;
});