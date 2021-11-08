const fnToHex = (iChar, iLength) => {
	let sHex = iChar.toString(16);
	if (iLength) {
		sHex = sHex.padStart(iLength, "0");
	}
	return sHex;
};

const rHtml = /[\x00-\x2b\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g, // eslint-disable-line no-control-regex
	rHtmlReplace = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/, // eslint-disable-line no-control-regex
	mHtmlLookup = {
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"\"": "&quot;",
	};

const fnHtml = sChar => {
	let sEncoded = mHtmlLookup[sChar];
	if (!sEncoded) {
		if (rHtmlReplace.test(sChar)) {
			sEncoded = "&#xfffd;";
		} else {
			sEncoded = `&#x${fnToHex(sChar.charCodeAt(0))};`;
		}
		mHtmlLookup[sChar] = sEncoded;
	}
	return sEncoded;
};

const fnEncodeXML = sString => {
	return sString.replace(rHtml, fnHtml);
};

export default fnEncodeXML;
