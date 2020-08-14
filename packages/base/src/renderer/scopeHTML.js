const cache = new Map();

const scopeHTML = (strings, tags, suffix) => {
	if (suffix && tags && tags.length) {
		strings = strings.map(string => {
			if (cache.has(string)) {
				return cache.get(string);
			}

			/*
			const allTags = [...string.matchAll(/<(ui5-.*?)[> ]/g)].map(x => x[1]);
			allTags.forEach(t => {
				if (!tags.includes(t)) {
					console.log(t, " in ", string);
				}
			});
			*/

			let result = string;
			tags.forEach(tag => {
				// console.log("replacing", string, tag);
				result = result.replace(new RegExp(`(</?)(${tag})(/?[> \t\n])`, "g"), `$1$2-${suffix}$3`);
			});
			cache.set(string, result);
			return result;
		});
	}

	return strings;
};

export default scopeHTML;
