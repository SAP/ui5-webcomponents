/*!
* ${copyright}
*/
sap.ui.define([
	"sap/base/config/MemoryConfigurationProvider",
	"sap/base/config/_Configuration",
	"ui5loader-autoconfig"
], (
	MemoryConfigurationProvider,
	_Configuration,
	/*autoconfig*/
) => {
	"use strict";

	/**
	 * Returns a writable base configuration instance
	 * @returns {module:sap/base/config} The writable base configuration
	 * @private
	 * @ui5-restricted sap.ui.core, sap.fl
	 */
	_Configuration.getWritableInstance = () => {
		const oProvider = new MemoryConfigurationProvider();

		return {
			set(sName, vValue) {
				const rValidKey = /^[a-z][A-Za-z0-9]*$/;
				if (rValidKey.test(sName)) {
					oProvider.set(sName, vValue);
					_Configuration._.invalidate();
				} else {
					throw new TypeError(
						"Invalid configuration key '" + sName + "'!"
					);
				}
			},
			get(mOptions) {
				mOptions.provider = oProvider;
				return _Configuration.get(mOptions);
			},
			Type: _Configuration.Type
		};
	};

	return _Configuration;
});