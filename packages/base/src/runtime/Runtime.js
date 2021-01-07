class Runtime {
	constructor(versionInfo, index) {
		["version", "major", "minor", "patch", "suffix", "isNext", "buildTime"].forEach(prop => {
			this[prop] = versionInfo[prop];
		});
		this.index = index;
		this.customAlias = undefined;
		this.compareResultCache = new WeakMap();
	}

	get alias() {
		return this.customAlias ? this.customAlias : `Unspecified runtime ${this.index}`;
	}

	get descriptor() {
		return `${this.version} - ${this.alias}`;
	}

	compareTo(otherVer) {
		if (this.compareResultCache.has(otherVer)) {
			return this.compareResultCache.get(otherVer);
		}

		// If any of the two is a next version, bigger buildTime wins
		if (this.isNext || otherVer.isNext) {
			return this.buildTime - otherVer.buildTime;
		}

		// If major versions differ, bigger one wins
		const majorDiff = this.major - otherVer.major;
		if (majorDiff) {
			return majorDiff;
		}

		// If minor versions differ, bigger one wins
		const minorDiff = this.minor - otherVer.minor;
		if (minorDiff) {
			return minorDiff;
		}

		// If patch versions differ, bigger one wins
		const patchDiff = this.patch - otherVer.patch;
		if (patchDiff) {
			return patchDiff;
		}

		// Bigger suffix wins, f.e. rc10 > rc9
		// Important: suffix is alphanumeric, must use natural compare
		const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
		const result = collator.compare(this.suffix, otherVer.suffix);

		this.compareResultCache.set(otherVer, result);
		return result;
	}
}

export default Runtime;
