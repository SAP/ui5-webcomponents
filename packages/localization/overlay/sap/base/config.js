sap.ui.define([], function() {

	// called from sapui5, but not supported by us
	const legacyFormats = [
		"sapUiLegacyTimeFormat",
		"sapUiABAPTimeFormat",
		"sapUiLegacyDateFormat",
		"sapUiABAPDateFormat",
		"sapUiLegacyNumberFormat",
		"sapUiABAPNumberFormat"
	];

	return {
		getWritableInstance() {
			return {
				get({ name }) {
					if (legacyFormats.includes(name)) {
						return undefined;
					}
					throw new Error("Localization :: missing configuration requested.");
				},
			}
		},
		Type: { }
	}
});
