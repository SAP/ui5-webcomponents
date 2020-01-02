const contentDensityChangeCallbacks = [];

const attachContentDensityChange = callback => {
	if (contentDensityChangeCallbacks.indexOf(callback) === -1) {
		contentDensityChangeCallbacks.push(callback);
	}
};

const _applyContentDensity = contentDensity => {
	_executeContentDensityChangeCallbacks(contentDensity);
};

const _executeContentDensityChangeCallbacks = contentDensity => {
	contentDensityChangeCallbacks.forEach(callback => callback(contentDensity));
};

export {
	attachContentDensityChange,
	_applyContentDensity,
};
