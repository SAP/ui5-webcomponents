const findClosingParenthesisPos = (str, openingParenthesisPos) => {
	let opened = 0;
	for (let pos = openingParenthesisPos; pos < str.length; pos++) {
		const char = str.charAt(pos);
		if (char === "(") {
			opened++;
		} else if (char === ")") {
			opened--;
		}
		if (opened === 0) {
			return pos;
		}
	}
};

const replaceHost = (str, hostStartPos, tag) => {
	const charAfterHostPos = hostStartPos + ":host".length;
	const charAfterHost = str.charAt(charAfterHostPos);

	const upToHost = str.substring(0, hostStartPos) + tag;
	if (charAfterHost === "(") {
		const closingParenthesisPos = findClosingParenthesisPos(str, charAfterHostPos);
		return upToHost + str.substring(charAfterHostPos + 1, closingParenthesisPos) + str.substring(closingParenthesisPos + 1);
	}

	return upToHost + str.substring(charAfterHostPos);
};

const replaceAllHostOccurrences = (str, tag) => {
	let hostStartPos = str.indexOf(":host");
	while (hostStartPos !== -1) {
		str = replaceHost(str, hostStartPos, tag);
		hostStartPos = str.indexOf(":host");
	}
	return str;
};

export default replaceAllHostOccurrences;
