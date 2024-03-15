sap.ui.define(["sap/base/strings/_camelize"], function (camelize) {
	var oConfig;
	var oWriteableConfig = Object.create(null);
	var rAlias = /^(sapUiXx|sapUi|sap)((?:[A-Z0-9][a-z]*)+)$/; //for getter
	var mFrozenProperties = Object.create(null);
	var bFrozen = false;
	var Configuration;

	function createConfig() {
		oConfig = Object.create(null);
		globalThis["sap-ui-config"] ??= {};
		var mOriginalGlobalParams = {};
		var oGlobalConfig = globalThis["sap-ui-config"];
		if (typeof oGlobalConfig === "object")  {
			for (var sKey in oGlobalConfig) {
				var sNormalizedKey = camelize("sapUi-" + sKey);
				var vFrozenValue = mFrozenProperties[sNormalizedKey];
				if (!sNormalizedKey) {
					ui5loader._.logger.error("Invalid configuration option '" + sKey + "' in global['sap-ui-config']!");
				} else if (Object.hasOwn(oConfig, sNormalizedKey)) {
					ui5loader._.logger.error("Configuration option '" + sKey + "' was already set by '" + mOriginalGlobalParams[sNormalizedKey] + "' and will be ignored!");
				} else if (Object.hasOwn(mFrozenProperties, sNormalizedKey) && oGlobalConfig[sKey] !== vFrozenValue) {
					oConfig[sNormalizedKey] = vFrozenValue;
					ui5loader._.logger.error("Configuration option '" + sNormalizedKey + "' was frozen and cannot be changed to " + oGlobalConfig[sKey] + "!");
				} else {
					oConfig[sNormalizedKey] = oGlobalConfig[sKey];
					mOriginalGlobalParams[sNormalizedKey] = sKey;
				}
			}
		}
		mOriginalGlobalParams = undefined;
	}
	function freeze() {
		if (!bFrozen) {
			createConfig();
			Configuration._.invalidate();
			bFrozen = true;
		}
	}

	function get(sKey, bFreeze) {
		if (Object.hasOwn(mFrozenProperties,sKey)) {
			return mFrozenProperties[sKey];
		}
		var vValue = oWriteableConfig[sKey] || oConfig[sKey];
		if (!Object.hasOwn(oConfig, sKey) && !Object.hasOwn(oWriteableConfig, sKey)) {
			var vMatch = sKey.match(rAlias);
			var sLowerCaseAlias = vMatch ? vMatch[1] + vMatch[2][0] + vMatch[2].slice(1).toLowerCase() : undefined;
			if (sLowerCaseAlias) {
				vValue = oWriteableConfig[sLowerCaseAlias] || oConfig[sLowerCaseAlias];
			}
		}
		if (bFreeze) {
			mFrozenProperties[sKey] = vValue;
		}
		return vValue;
	}

	function set(sKey, vValue) {
		if (Object.hasOwn(mFrozenProperties, sKey) || bFrozen) {
			ui5loader._.logger.error("Configuration option '" + sKey + "' was frozen and cannot be changed to " + vValue + "!");
		} else {
			oWriteableConfig[sKey] = vValue;
		}
	}

	function setConfiguration(Config) {
		Configuration = Config;
	}

	var GlobalConfigurationProvider = {
		get: get,
		set: set,
		freeze: freeze,
		setConfiguration: setConfiguration,
		/**
		 * @deprecated As of Version 1.120
		 */
		_: {
			configLoaded() {
				return !!globalThis["sap-ui-config"].__loaded;
			}
		}
	};

	createConfig();

	return GlobalConfigurationProvider;
});