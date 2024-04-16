type OpenUI5Patcher = {
	prototype: {
		_mAttributes: { [key: string]: string },
		openEnd: () => OpenUI5Patcher,
	}
};

const patchPatcher = (Patcher: OpenUI5Patcher) => {
	const origOpenEnd = Patcher.prototype.openEnd;
	Patcher.prototype.openEnd = function openEnd() {
		delete this._mAttributes.popover; // The "popover" attribute will be managed externally, don't let Patcher remove it
		return origOpenEnd.apply(this);
	};
};

export default patchPatcher;
export type { OpenUI5Patcher };
