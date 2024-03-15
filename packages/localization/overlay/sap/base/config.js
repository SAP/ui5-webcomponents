sap.ui.define(["sap/base/config/_Configuration"], function(_Configuration) {

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
				get(options) {
					return _Configuration.get(options);
				},
			}
		},
		Type: _Configuration.Type
	}
});
