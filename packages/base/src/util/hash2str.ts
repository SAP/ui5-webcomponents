export default function hash2str(hash: Record<string, boolean>): string {
	let str = "";
	// eslint-disable-next-line no-restricted-syntax
	for (const prop in hash) {
		if (hash[prop]) {
			if (str) {
				str += " ";
			}
			str += prop;
		}
	}
	return str;
}
