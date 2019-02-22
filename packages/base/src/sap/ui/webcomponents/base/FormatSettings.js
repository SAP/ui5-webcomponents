/* eslint-disable */
function check(bCondition, sMessage) {
	if ( !bCondition ) {
		throw new Error(sMessage);
	}
}

class FormatSettings {
	constructor(oConfiguration) {
		this.oConfiguration = oConfiguration;
		this.mSettings = {};
		this.sLegacyDateFormat = undefined;
		this.sLegacyTimeFormat = undefined;
		this.sLegacyNumberFormatSymbolSet = undefined;
	}

	/**
	 * Returns the locale to be used for formatting.
	 *
	 * If no such locale has been defined, this method falls back to the language,
	 * see {@link sap.ui.core.Configuration#getLanguage Configuration.getLanguage()}.
	 *
	 * If any user preferences for date, time or number formatting have been set,
	 * and if no format locale has been specified, then a special private use subtag
	 * is added to the locale, indicating to the framework that these user preferences
	 * should be applied.
	 *
	 * @return {sap.ui.core.Locale} the format locale
	 * @public
	 */
	getFormatLocale() {
		function fallback(that) {
			var oLocale = that.oConfiguration.language;
			// if any user settings have been defined, add the private use subtag "sapufmt"
			if (!jQuery.isEmptyObject(that.mSettings)) {
				// TODO move to Locale/LocaleData
				var l = oLocale.toString();
				if (l.indexOf("-x-") < 0) {
					l = l + "-x-sapufmt";
				} else if (l.indexOf("-sapufmt") <= l.indexOf("-x-")) {
					l = l + "-sapufmt";
				}
				oLocale = new Locale(l);
			}
			return oLocale;
		}
		return this.oConfiguration.formatLocale || fallback(this);
	}

	_set(sKey, oValue) {
		var oOldValue = this.mSettings[sKey];
		if (oValue != null) {
			this.mSettings[sKey] = oValue;
		} else {
			delete this.mSettings[sKey];
		}
		// report a change only if old and new value differ (null/undefined are treated as the same value)
		if ((oOldValue != null || oValue != null) && !deepEqual(oOldValue, oValue)) {
			var mChanges = this.oConfiguration._collect();
			mChanges[sKey] = oValue;
			this.oConfiguration._endCollect();
		}
	}

	/**
	 * Retrieves the custom units.
	 * These custom units are set by {@link sap.ui.core.Configuration#setCustomUnits} and {@link sap.ui.core.Configuration#addCustomUnits}
	 * @return {object} custom units object
	 * @see sap.ui.core.Configuration#setCustomUnits
	 * @see sap.ui.core.Configuration#addCustomUnits
	 */
	getCustomUnits() {
		return this.mSettings["units"] ? this.mSettings["units"]["short"] : undefined;
	}

	/**
	 * Sets custom units which can be used to do Unit Formatting.
	 *
	 * The custom unit object consists of:
	 * * a custom unit key which can then be referenced to use this unit.
	 * * <code>displayName</code> which represents the name of the unit.
	 * * <code>unitPattern-count-&lt;pluralName&gt;</code> which represents the plural category of the locale for the given value.
	 * The plural category is defined within the locale, e.g. in the 'en' locale:
	 * <code>unitPattern-count-one</code> for <code>1</code>,
	 * <code>unitPattern-count-zero</code> for <code>0</code>,
	 * <code>unitPattern-count-other</code> for all the res
	 * To retrieve all plural categories defined for a locale use <code>sap.ui.core.LocaleData.prototype.getPluralCategories</code>.
	 *
	 * A Sample custom unit definition could look like this:
	 * <code>
	 * {
	 *  "BAG": {
	 *      "displayName": "Bag",
	 *		"unitPattern-count-one": "{0} bag",
	 *		"unitPattern-count-other": "{0} bags"
	 *  }
	 * }
	 * </code>
	 * In the above snippet:
	 * * <code>"BAG"</code> represent the unit key which is used to reference it.
	 * * <code>"unitPattern-count-one"</code> represent the unit pattern for the form "one", e.g. the number <code>1</code> in the 'en' locale.
	 * * <code>"unitPattern-count-other"</code> represent the unit pattern for all other numbers which do not
	 *   match the plural forms of the previous patterns.
	 * * In the patterns <code>{0}</code> is replaced by the number
	 *
	 * E.g. In locale 'en' value <code>1</code> would result in <code>1 Bag</code>, while <code>2</code> would result in <code>2 Bags</code>
	 * @param mUnits {object} custom unit object which replaces the current custom unit definition. Call with <code>null</code> to delete custom units.
	 * @return {sap.ui.core.Configuration.FormatSettings}
	 */
	setCustomUnits(mUnits) {
		// add custom units, or remove the existing ones if none are given
		var mUnitsshort = null;
		if (mUnits) {
			mUnitsshort = {
				"short": mUnits
			};
		}
		this._set("units", mUnitsshort);
		return this;
	}

	/**
	 * Adds custom units.
	 * Similar to {@link sap.ui.core.Configuration#setCustomUnits} but instead of setting the custom units, it will add additional ones.
	 * @param mUnits {object} custom unit object which replaces the current custom unit definition. Call with <code>null</code> to delete custom units.
	 * @return {sap.ui.core.Configuration.FormatSettings}
	 * @see sap.ui.core.Configuration#setCustomUnits
	 */
	addCustomUnits(mUnits) {
		// add custom units, or remove the existing ones if none are given
		var mExistingUnits = this.getCustomUnits();
		if (mExistingUnits) {
			mUnits = jQuery.extend({}, mExistingUnits, mUnits);
		}
		this.setCustomUnits(mUnits);
		return this;
	}

	/**
	 * Sets custom unit mappings.
	 * Unit mappings contain key value pairs (both strings)
	 * * {string} key: a new entry which maps to an existing unit key
	 * * {string} value: an existing unit key
	 *
	 * Example:
	 * <code>
	 * {
	 *  "my": "my-custom-unit",
	 *  "cm": "length-centimeter"
	 * }
	 * </code>
	 * Note: It is possible to create multiple entries per unit key.
	 * @param mUnitMappings {object} unit mappings
	 * @return {sap.ui.core.Configuration.FormatSettings}. Call with <code>null</code> to delete unit mappings.
	 */
	setUnitMappings(mUnitMappings) {
		this._set("unitMappings", mUnitMappings);
		return this;
	}

	/**
	 * Adds unit mappings.
	 * Similar to {@link sap.ui.core.Configuration#setUnitMappings} but instead of setting the unit mappings, it will add additional ones.
	 * @param mUnitMappings {object} unit mappings
	 * @return {sap.ui.core.Configuration.FormatSettings}
	 * @see sap.ui.core.Configuration#setUnitMappings
	 */
	addUnitMappings(mUnitMappings) {
		// add custom units, or remove the existing ones if none are given
		var mExistingUnits = this.getUnitMappings();
		if (mExistingUnits) {
			mUnitMappings = jQuery.extend({}, mExistingUnits, mUnitMappings);
		}
		this.setUnitMappings(mUnitMappings);
		return this;
	}

	/**
	 * Retrieves the unit mappings.
	 * These unit mappings are set by {@link sap.ui.core.Configuration#setUnitMappings} and {@link sap.ui.core.Configuration#addUnitMappings}
	 * @returns {object} unit mapping object
	 * @see sap.ui.core.Configuration#setUnitMappings
	 * @see sap.ui.core.Configuration#addUnitMappings
	 */
	getUnitMappings() {
		return this.mSettings["unitMappings"];
	}

	/**
	 * Returns the currently set date pattern or undefined if no pattern has been defined.
	 * @public
	 */
	getDatePattern(sStyle) {
		assert(sStyle == "short" || sStyle == "medium" || sStyle == "long" || sStyle == "full", "sStyle must be short, medium, long or full");
		return this.mSettings["dateFormats-" + sStyle];
	}

	/**
	 * Defines the preferred format pattern for the given date format style.
	 *
	 * Calling this method with a null or undefined pattern removes a previously set pattern.
	 *
	 * If a pattern is defined, it will be preferred over patterns derived from the current locale.
	 *
	 * See class {@link sap.ui.core.format.DateFormat} for details about the pattern syntax.
	 *
	 * After changing the date pattern, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sStyle must be one of short, medium, long or full.
	 * @param {string} sPattern the format pattern to be used in LDML syntax.
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setDatePattern(sStyle, sPattern) {
		check(sStyle == "short" || sStyle == "medium" || sStyle == "long" || sStyle == "full", "sStyle must be short, medium, long or full");
		this._set("dateFormats-" + sStyle, sPattern);
		return this;
	}

	/**
	 * Returns the currently set time pattern or undefined if no pattern has been defined.
	 * @public
	 */
	getTimePattern(sStyle) {
		assert(sStyle == "short" || sStyle == "medium" || sStyle == "long" || sStyle == "full", "sStyle must be short, medium, long or full");
		return this.mSettings["timeFormats-" + sStyle];
	}

	/**
	 * Defines the preferred format pattern for the given time format style.
	 *
	 * Calling this method with a null or undefined pattern removes a previously set pattern.
	 *
	 * If a pattern is defined, it will be preferred over patterns derived from the current locale.
	 *
	 * See class {@link sap.ui.core.format.DateFormat} for details about the pattern syntax.
	 *
	 * After changing the time pattern, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sStyle must be one of short, medium, long or full.
	 * @param {string} sPattern the format pattern to be used in LDML syntax.
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setTimePattern(sStyle, sPattern) {
		check(sStyle == "short" || sStyle == "medium" || sStyle == "long" || sStyle == "full", "sStyle must be short, medium, long or full");
		this._set("timeFormats-" + sStyle, sPattern);
		return this;
	}

	/**
	 * Returns the currently set number symbol of the given type or undefined if no symbol has been defined.
	 * @public
	 */
	getNumberSymbol(sType) {
		assert(sType == "decimal" || sType == "group" || sType == "plusSign" || sType == "minusSign", "sType must be decimal, group, plusSign or minusSign");
		return this.mSettings["symbols-latn-" + sType];
	}

	/**
	 * Defines the string to be used for the given number symbol.
	 *
	 * Calling this method with a null or undefined symbol removes a previously set symbol string.
	 * Note that an empty string is explicitly allowed.
	 *
	 * If a symbol is defined, it will be preferred over symbols derived from the current locale.
	 *
	 * See class {@link sap.ui.core.format.NumberFormat} for details about the symbols.
	 *
	 * After changing the number symbol, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sStyle must be one of decimal, group, plusSign, minusSign.
	 * @param {string} sSymbol will be used to represent the given symbol type
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setNumberSymbol(sType, sSymbol) {
		check(sType == "decimal" || sType == "group" || sType == "plusSign" || sType == "minusSign", "sType must be decimal, group, plusSign or minusSign");
		this._set("symbols-latn-" + sType, sSymbol);
		return this;
	}

	/**
	 * Retrieves the custom currencies.
	 * E.g.
	 * <code>
	 * {
	 *  "KWD": {"digits": 3},
	 *  "TND" : {"digits": 3}
	 * }
	 * </code>
	 * @public
	 * @returns {object} the mapping between custom currencies and its digits
	 */
	getCustomCurrencies() {
		return this.mSettings["currency"];
	}

	/**
	 * Sets custom currencies and replaces existing entries.
	 * E.g.
	 * <code>
	 * {
	 *  "KWD": {"digits": 3},
	 *  "TND" : {"digits": 3}
	 * }
	 * </code>
	 * Note: To unset the custom currencies: call with <code>undefined</code>
	 * @public
	 * @param {object} mCurrencies currency map which is set
	 * @returns {sap.ui.core.Configuration.FormatSettings}
	 */
	setCustomCurrencies(mCurrencies) {
		check(typeof mCurrencies === "object" || mCurrencies == null, "mCurrencyDigits must be an object");
		Object.keys(mCurrencies || {}).forEach(function (sCurrencyDigit) {
			check(typeof sCurrencyDigit === "string");
			check(typeof mCurrencies[sCurrencyDigit] === "object");
		});
		this._set("currency", mCurrencies);
		return this;
	}

	/**
	 * Adds custom currencies to the existing entries.
	 * E.g.
	 * <code>
	 * {
	 *  "KWD": {"digits": 3},
	 *  "TND" : {"digits": 3}
	 * }
	 * </code>
	 *
	 * @public
	 * @param {object} mCurrencies adds to the currency map
	 * @returns {sap.ui.core.Configuration.FormatSettings}
	 * @see sap.ui.core.Configuration.FormatSettings#setCustomCurrencies
	 */
	addCustomCurrencies(mCurrencies) {
		// add custom units, or remove the existing ones if none are given
		var mExistingCurrencies = this.getCustomCurrencies();
		if (mExistingCurrencies) {
			mCurrencies = jQuery.extend({}, mExistingCurrencies, mCurrencies);
		}
		this.setCustomCurrencies(mCurrencies);
		return this;
	}

	/**
	 * Defines the day used as the first day of the week.
	 *
	 * The day is set as an integer value between 0 (Sunday) and 6 (Saturday).
	 * Calling this method with a null or undefined symbol removes a previously set value.
	 *
	 * If a value is defined, it will be preferred over values derived from the current locale.
	 *
	 * Usually in the US the week starts on Sunday while in most European countries on Monday.
	 * There are special cases where you want to have the first day of week set independent of the
	 * user locale.
	 *
	 * After changing the first day of week, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {int} iValue must be an integer value between 0 and 6
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setFirstDayOfWeek(iValue) {
		check(typeof iValue == "number" && iValue >= 0 && iValue <= 6, "iValue must be an integer value between 0 and 6");
		this._set("weekData-firstDay", iValue);
		return this;
	}

	_setDayPeriods(sWidth, aTexts) {
		assert(sWidth == "narrow" || sWidth == "abbreviated" || sWidth == "wide", "sWidth must be narrow, abbreviated or wide");
		this._set("dayPeriods-format-" + sWidth, aTexts);
		return this;
	}

	/**
	 * Returns the currently set legacy ABAP date format (its id) or undefined if none has been set.
	 *
	 * @public
	 */
	getLegacyDateFormat() {
		return this.sLegacyDateFormat || undefined;
	}

	/**
	 * Allows to specify one of the legacy ABAP date formats.
	 *
	 * This method modifies the date patterns for 'short' and 'medium' style with the corresponding ABAP
	 * format. When called with a null or undefined format id, any previously applied format will be removed.
	 *
	 * After changing the legacy date format, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sFormatId id of the ABAP data format (one of '1','2','3','4','5','6','7','8','9','A','B','C')
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setLegacyDateFormat(sFormatId) {
		sFormatId = sFormatId ? String(sFormatId).toUpperCase() : "";
		check(!sFormatId || M_ABAP_DATE_FORMAT_PATTERN.hasOwnProperty(sFormatId), "sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");
		var mChanges = this.oConfiguration._collect();
		this.sLegacyDateFormat = mChanges.legacyDateFormat = sFormatId;
		this.setDatePattern("short", M_ABAP_DATE_FORMAT_PATTERN[sFormatId].pattern);
		this.setDatePattern("medium", M_ABAP_DATE_FORMAT_PATTERN[sFormatId].pattern);
		this.oConfiguration._endCollect();
		return this;
	}

	/**
	 * Returns the currently set legacy ABAP time format (its id) or undefined if none has been set.
	 *
	 * @public
	 */
	getLegacyTimeFormat() {
		return this.sLegacyTimeFormat || undefined;
	}

	/**
	 * Allows to specify one of the legacy ABAP time formats.
	 *
	 * This method sets the time patterns for 'short' and 'medium' style to the corresponding ABAP
	 * formats and sets the day period texts to "AM"/"PM" or "am"/"pm" respectively. When called
	 * with a null or undefined format id, any previously applied format will be removed.
	 *
	 * After changing the legacy time format, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sFormatId id of the ABAP time format (one of '0','1','2','3','4')
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setLegacyTimeFormat(sFormatId) {
		check(!sFormatId || M_ABAP_TIME_FORMAT_PATTERN.hasOwnProperty(sFormatId), "sFormatId must be one of ['0','1','2','3','4'] or empty");
		var mChanges = this.oConfiguration._collect();
		this.sLegacyTimeFormat = mChanges.legacyTimeFormat = sFormatId = sFormatId || "";
		this.setTimePattern("short", M_ABAP_TIME_FORMAT_PATTERN[sFormatId]["short"]);
		this.setTimePattern("medium", M_ABAP_TIME_FORMAT_PATTERN[sFormatId]["medium"]);
		this._setDayPeriods("abbreviated", M_ABAP_TIME_FORMAT_PATTERN[sFormatId].dayPeriods);
		this.oConfiguration._endCollect();
		return this;
	}

	/**
	 * Returns the currently set legacy ABAP number format (its id) or undefined if none has been set.
	 *
	 * @public
	 */
	getLegacyNumberFormat() {
		return this.sLegacyNumberFormat || undefined;
	}

	/**
	 * Allows to specify one of the legacy ABAP number format.
	 *
	 * This method will modify the 'group' and 'decimal' symbols. When called with a null
	 * or undefined format id, any previously applied format will be removed.
	 *
	 * After changing the legacy number format, the framework tries to update localization
	 * specific parts of the UI. See the documentation of {@link sap.ui.core.Configuration#setLanguage}
	 * for details and restrictions.
	 *
	 * @param {string} sFormatId id of the ABAP number format set (one of ' ','X','Y')
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setLegacyNumberFormat(sFormatId) {
		sFormatId = sFormatId ? sFormatId.toUpperCase() : "";
		check(!sFormatId || M_ABAP_NUMBER_FORMAT_SYMBOLS.hasOwnProperty(sFormatId), "sFormatId must be one of [' ','X','Y'] or empty");
		var mChanges = this.oConfiguration._collect();
		this.sLegacyNumberFormat = mChanges.legacyNumberFormat = sFormatId;
		this.setNumberSymbol("group", M_ABAP_NUMBER_FORMAT_SYMBOLS[sFormatId].groupingSeparator);
		this.setNumberSymbol("decimal", M_ABAP_NUMBER_FORMAT_SYMBOLS[sFormatId].decimalSeparator);
		this.oConfiguration._endCollect();
		return this;
	}

	/**
	 * Allows to specify the customizing data for Islamic calendar support
	 *
	 * @param {object[]} aMappings contains the customizing data for the support of Islamic calendar.
	 * @param {string} aMappings[].dateFormat The date format
	 * @param {string} aMappings[].islamicMonthStart The Islamic date
	 * @param {string} aMappings[].gregDate The corresponding Gregorian date
	 * @return {sap.ui.core.Configuration.FormatSettings} Returns <code>this</code> to allow method chaining
	 * @public
	 */
	setLegacyDateCalendarCustomizing(aMappings) {
		check(Array.isArray(aMappings), "aMappings must be an Array");

		var mChanges = this.oConfiguration._collect();
		this.aLegacyDateCalendarCustomizing = mChanges.legacyDateCalendarCustomizing = aMappings;
		this.oConfiguration._endCollect();
		return this;
	}

	/**
	 * Returns the currently set customizing data for Islamic calendar support
	 *
	 * @return {object[]} Returns an array contains the customizing data. Each element in the array has properties: dateFormat, islamicMonthStart, gregDate. For details, please see {@link #setLegacyDateCalendarCustomizing}
	 * @public
	 */
	getLegacyDateCalendarCustomizing() {
		return this.aLegacyDateCalendarCustomizing;
	}

	/*
	 * Returns a live object with the current settings
	 * TODO this method is part of the facade to be accessible from LocaleData, but it shouldn't be
	 * @private
	 */
	getCustomLocaleData() {
		return this.mSettings;
	}
}

export default FormatSettings;
