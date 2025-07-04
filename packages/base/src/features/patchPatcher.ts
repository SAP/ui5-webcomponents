type OpenUI5Patcher = {
	prototype: {
		_mAttributes: { [key: string]: string },
		openEnd: () => OpenUI5Patcher,
	}
};

const patchPatcher = (Patcher: OpenUI5Patcher) => {
	const origOpenEnd = Patcher.prototype.openEnd;
	if (!origOpenEnd) {
		return; // To prevent errors for very old versions of OpenUI5
	}

	Patcher.prototype.openEnd = function openEnd() {
		if (this._mAttributes.popover) {
			delete this._mAttributes.popover; // The "popover" attribute will be managed externally, don't let Patcher remove it
		}
		return origOpenEnd.apply(this);
	};
};

export default patchPatcher;
export type { OpenUI5Patcher };
