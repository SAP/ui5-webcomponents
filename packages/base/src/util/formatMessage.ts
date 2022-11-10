const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

const formatMessage = (text: string, values: Array<number | string>) => {
	values = values || [];

	return text.replace(messageFormatRegEX, ($0, $1, $2, $3: string | number, offset: number) => {
		if ($1) {
			return '\''; /* eslint-disable-line */
		}

		if ($2) {
			return $2.replace(/''/g, '\''); /* eslint-disable-line */
		}

		if ($3) {
			const ind = typeof $3 === "string" ? parseInt($3) : $3;
			return String(values[ind]);
		}

		throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
	});
};

export default formatMessage;
